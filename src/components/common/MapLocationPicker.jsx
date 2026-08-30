import React, { useState, useEffect, useRef, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { FiX, FiSearch, FiMapPin, FiCrosshair } from 'react-icons/fi';
import { useToast } from '../../context/ToastContext';

// Fix Leaflet's default icon issue with bundlers
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';

const DefaultIcon = L.icon({
  iconUrl: icon,
  iconRetinaUrl: iconRetina,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// London default coordinates
const DEFAULT_CENTER = [51.505, -0.09];
const DEFAULT_ZOOM = 13;

function LocationMarker({ position, setPosition, setAddressData }) {
  const markerRef = useRef(null);
  
  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
      reverseGeocode(e.latlng.lat, e.latlng.lng);
    },
  });

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          const latlng = marker.getLatLng();
          setPosition(latlng);
          reverseGeocode(latlng.lat, latlng.lng);
        }
      },
    }),
    [setPosition]
  );

  const reverseGeocode = async (lat, lng) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`);
      const data = await response.json();
      
      if (data && data.address) {
        const addr = data.address;
        setAddressData({
          house_number: addr.house_number || addr.building || '',
          street_address: addr.road || addr.pedestrian || '',
          city: addr.city || addr.town || addr.village || addr.suburb || '',
          county: addr.county || addr.state_district || addr.state || addr.region || addr.borough || addr.municipality || '',
          postcode: addr.postcode || '',
          country: addr.country || 'United Kingdom',
          lat: lat,
          lng: lng
        });
      }
    } catch (error) {
      console.error("Error reverse geocoding:", error);
    }
  };

  return position === null ? null : (
    <Marker
      draggable={true}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
    ></Marker>
  );
}

// Map Updater Component to change view when searching
function MapUpdater({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, 15);
    }
  }, [center, map]);
  return null;
}

const MapLocationPicker = ({ onClose, onConfirm, initialLocation }) => {
  const { showToast } = useToast();
  const [position, setPosition] = useState(
    initialLocation?.coordinates ? { lat: initialLocation.coordinates[1], lng: initialLocation.coordinates[0] } : null
  );
  const [mapCenter, setMapCenter] = useState(position || DEFAULT_CENTER);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [addressData, setAddressData] = useState(null);

  useEffect(() => {
    if (!position) {
      locateUser();
    }
  }, []);

  const locateUser = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          const newPos = { lat: latitude, lng: longitude };
          setPosition(newPos);
          setMapCenter(newPos);
          showToast('Location found', 'success');
        },
        (err) => {
          console.warn("Geolocation error:", err.message);
          showToast(`Location error: ${err.message}. Defaulting to UK.`, 'warning');
        },
        { enableHighAccuracy: true, timeout: 30000, maximumAge: 0 }
      );
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery + ', UK')}&limit=1`);
      const data = await response.json();
      
      if (data && data.length > 0) {
        const result = data[0];
        const newPos = { lat: parseFloat(result.lat), lng: parseFloat(result.lon) };
        setPosition(newPos);
        setMapCenter(newPos);
      } else {
        showToast('Location not found', 'error');
      }
    } catch (error) {
      console.error("Search error:", error);
      showToast('Error searching location', 'error');
    } finally {
      setIsSearching(false);
    }
  };

  const handleConfirm = () => {
    if (!position) {
      showToast('Please select a location on the map', 'warning');
      return;
    }
    
    // Pass back coordinates and optional reverse-geocoded address data
    onConfirm({
      coordinates: [position.lng, position.lat], // GeoJSON uses [longitude, latitude]
      address: addressData
    });
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white w-full max-w-4xl h-[85vh] md:h-[80vh] rounded-2xl flex flex-col overflow-hidden shadow-2xl animate-fade-in-up">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-[#FAFBF9]">
          <h3 className="font-extrabold text-lg text-slate-800 flex items-center gap-2">
            <FiMapPin className="text-[#FF6B00]" /> Select Location
          </h3>
          <button type="button" onClick={onClose} className="p-2 bg-slate-200 hover:bg-slate-300 rounded-full transition-colors">
            <FiX className="text-slate-700" />
          </button>
        </div>

        {/* Search Bar & Current Location Button */}
        <div className="p-4 bg-white flex flex-col sm:flex-row gap-3 z-10 shadow-sm relative">
          <form onSubmit={handleSearch} className="flex-1 flex gap-2">
            <div className="relative flex-1">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search postcode or area (e.g. SW1A 1AA)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#0C3823] focus:ring-1 focus:ring-[#0C3823] transition-all text-sm font-semibold text-slate-700"
              />
            </div>
            <button 
              type="submit" 
              disabled={isSearching}
              className="px-4 py-2.5 bg-[#0C3823] hover:bg-[#082a1a] text-white text-sm font-bold rounded-xl transition-colors disabled:opacity-70 cursor-pointer"
            >
              {isSearching ? 'Searching...' : 'Search'}
            </button>
          </form>
          <button 
            onClick={locateUser}
            type="button"
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 text-sm font-bold rounded-xl transition-colors cursor-pointer"
          >
            <FiCrosshair /> Use Current Location
          </button>
        </div>

        {/* Map Container */}
        <div className="flex-1 relative bg-slate-100 z-0">
          <MapContainer center={mapCenter} zoom={DEFAULT_ZOOM} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker position={position} setPosition={setPosition} setAddressData={setAddressData} />
            <MapUpdater center={mapCenter} />
          </MapContainer>
          
          {/* Overlay Helper Text */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[1000] bg-white/95 backdrop-blur-md px-5 py-2.5 rounded-full shadow-lg border border-slate-200 pointer-events-none">
            <p className="text-xs font-bold text-slate-700 m-0">Drag the marker or tap the map to select exact location</p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-white flex justify-end gap-3 z-10">
          <button 
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors text-sm cursor-pointer"
          >
            Cancel
          </button>
          <button 
            type="button"
            onClick={handleConfirm}
            className="px-8 py-2.5 bg-[#FF6B00] hover:bg-[#e05e00] text-white font-bold rounded-xl transition-colors text-sm shadow-md cursor-pointer"
          >
            Confirm Location
          </button>
        </div>
      </div>
    </div>
  );
};

export default MapLocationPicker;
