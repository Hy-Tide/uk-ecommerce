import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiTrash2, 
  FiCheckCircle, 
  FiAlertCircle, 
  FiPlus, 
  FiMinus, 
  FiShield, 
  FiTruck, 
  FiLock, 
  FiArrowLeft,
  FiFileText,
  FiMessageCircle,
  FiZap,
  FiRefreshCw,
  FiPackage,
  FiMapPin,
  FiTag
} from 'react-icons/fi';
import { ROUTES } from '../utils/constants';

const cartItems = [
  {
    id: 1,
    brand: 'AASHIRVAAD',
    name: 'Whole Wheat Atta',
    weight: '10 kg',
    price: 12.99,
    qty: 1,
    stockStatus: 'In Stock',
    stockType: 'success',
    image: '/images/prod-wheat-atta.png'
  },
  {
    id: 2,
    brand: 'INDIA GATE',
    name: 'Basmati Rice',
    weight: '5 kg',
    price: 16.99,
    qty: 2,
    stockStatus: 'In Stock',
    stockType: 'success',
    image: '/images/prod-basmati-rice.png'
  },
  {
    id: 3,
    brand: 'TATA SAMPANN',
    name: 'Toor Dal',
    weight: '1 kg',
    price: 4.99,
    qty: 1,
    stockStatus: 'Only 4 Left',
    stockType: 'warning',
    image: '/images/prod-toor-dal.png'
  }
];

const relatedProducts = [
  { id: 1, brand: 'AMUL', name: 'Pure Ghee Can', weight: '500 ml', price: 7.99, image: '/images/prod-amul-ghee.png' },
  { id: 2, brand: 'MDH', name: 'Garam Masala', weight: '100 g Tin', price: 3.49, image: '/images/prod-garam-masala.png' },
  { id: 3, brand: "HALDIRAM'S", name: 'Aloo Bhujia', weight: '400 g', price: 6.49, image: '/images/prod-aloo-bhujia.png' },
  { id: 4, brand: 'TATA TEA', name: 'Masala Chai', weight: '250 g', price: 4.49, image: '/images/prod-chai.png' }
];

const Cart = () => {
  const [items, setItems] = useState(cartItems);

  const updateQty = (id, newQty) => {
    if (newQty < 1) return;
    setItems(items.map(item => item.id === id ? { ...item, qty: newQty } : item));
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className="bg-white pb-20">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100 py-3">
        <div className="container px-4 mx-auto flex items-center justify-between">
          <div className="text-sm text-gray-500 font-medium">
            <Link to="/" className="hover:text-[#2e7d32]">Home</Link>
            <span className="mx-2 text-gray-300">&gt;</span>
            <span className="text-gray-900 font-bold">Cart</span>
          </div>
        </div>
      </div>

      <div className="container px-4 mx-auto pt-8">
        
        {/* Title Area */}
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <h1 className="text-[28px] font-black text-gray-900 leading-none">Shopping Cart</h1>
            <div className="bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1 rounded-full flex items-center h-7">
              3 items
            </div>
          </div>
          <div className="flex items-center gap-2 text-[#2e7d32] font-bold text-sm bg-[#e8f5e9] px-4 py-2 rounded-lg">
            <FiShield className="text-lg" />
            Secure Checkout
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Cart Items */}
          <div className="lg:w-2/3 flex flex-col gap-6">
            
            <div>
              <h2 className="text-lg font-black text-gray-900 mb-4">Your Items</h2>
              
              <div className="border border-gray-100 rounded-xl overflow-hidden bg-white">
                {items.map((item, index) => (
                  <div key={item.id} className={`flex flex-col sm:flex-row gap-6 p-6 ${index !== items.length - 1 ? 'border-b border-gray-100' : ''}`}>
                    {/* Item Image */}
                    <div className="w-24 h-24 flex-shrink-0 bg-white flex items-center justify-center">
                      <img src={item.image} alt={item.name} className="max-w-full max-h-full object-contain" />
                    </div>
                    
                    {/* Item Details */}
                    <div className="flex-1 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div className="flex flex-col">
                        <span className="text-[#2e7d32] text-[10px] font-black uppercase tracking-wider mb-1">{item.brand}</span>
                        <h3 className="text-[16px] font-bold text-gray-900 leading-tight mb-2">{item.name}</h3>
                        <div className="flex items-center text-gray-500 text-xs font-medium mb-3 gap-1.5">
                          <FiPackage className="text-gray-400" /> {item.weight}
                        </div>
                        <div className="text-2xl font-black text-[#2e7d32] mb-3">
                          £{item.price.toFixed(2)}
                        </div>
                        
                        {/* Stock Badge */}
                        <div className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full w-fit ${
                          item.stockType === 'success' 
                            ? 'bg-[#dcfce7] text-[#166534]' 
                            : 'bg-[#fef3c7] text-[#92400e]'
                        }`}>
                          {item.stockType === 'success' ? <FiCheckCircle size={14} /> : <FiAlertCircle size={14} />}
                          {item.stockStatus}
                        </div>
                      </div>

                      {/* Right side controls */}
                      <div className="flex flex-col items-end justify-between min-h-full">
                        {/* Qty Selector */}
                        <div className="flex items-center border border-gray-200 rounded-lg h-10 w-32 bg-white overflow-hidden mb-4">
                          <button 
                            onClick={() => updateQty(item.id, item.qty - 1)}
                            className="w-10 h-full flex items-center justify-center text-gray-500 hover:text-black hover:bg-gray-50 transition-colors"
                          >
                            <FiMinus size={14} />
                          </button>
                          <input 
                            type="text" 
                            value={item.qty} 
                            readOnly 
                            className="flex-1 text-center text-sm font-bold text-gray-900 border-x border-gray-200 h-full outline-none" 
                          />
                          <button 
                            onClick={() => updateQty(item.id, item.qty + 1)}
                            className="w-10 h-full flex items-center justify-center text-gray-500 hover:text-black hover:bg-gray-50 transition-colors"
                          >
                            <FiPlus size={14} />
                          </button>
                        </div>

                        <div className="text-xs font-bold text-gray-500 mb-4 text-right">
                          Subtotal: <span className="text-gray-900 text-sm">£{(item.price * item.qty).toFixed(2)}</span>
                        </div>

                        <button 
                          onClick={() => removeItem(item.id)}
                          className="flex items-center gap-1.5 text-red-500 text-xs font-bold hover:text-red-600 transition-colors"
                        >
                          <FiTrash2 size={14} /> Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Coupons & Delivery Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              {/* Apply Coupon */}
              <div className="bg-[#f9fafb] p-6 rounded-xl border border-gray-100">
                <div className="flex items-center gap-2 text-gray-900 font-bold mb-4">
                  <FiTag className="text-[#f97316] text-lg" /> Apply Coupon
                </div>
                <div className="flex gap-2 mb-4">
                  <input 
                    type="text" 
                    placeholder="Enter coupon code..." 
                    className="flex-1 bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-medium outline-none focus:border-[#2e7d32]"
                  />
                  <button className="bg-gray-900 hover:bg-black text-white font-bold px-6 py-2.5 rounded-lg text-sm transition-colors">
                    Apply
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  <div className="bg-white border border-green-100 rounded-md px-3 py-1.5 text-xs font-bold flex items-center gap-2 shadow-sm">
                    <span className="text-gray-900">SAVE10</span>
                    <span className="text-[#2e7d32]">10% OFF</span>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-md px-3 py-1.5 text-xs font-bold flex items-center gap-2 shadow-sm">
                    <span className="text-gray-900">FIRST20</span>
                    <span className="text-[#2e7d32]">20% OFF</span>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-md px-3 py-1.5 text-xs font-bold flex items-center gap-2 shadow-sm">
                    <span className="text-gray-900">FREESHIP</span>
                    <span className="text-[#2e7d32]">Free Ship</span>
                  </div>
                </div>
              </div>

              {/* Estimate Delivery */}
              <div className="bg-[#f9fafb] p-6 rounded-xl border border-gray-100">
                <div className="flex items-center gap-2 text-gray-900 font-bold mb-4">
                  <FiMapPin className="text-[#2e7d32] text-lg" /> Estimate Delivery
                </div>
                <div className="flex gap-2 mb-4">
                  <input 
                    type="text" 
                    placeholder="Enter UK Postcode..." 
                    className="flex-1 bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-medium outline-none focus:border-[#2e7d32]"
                  />
                  <button className="bg-[#2e7d32] hover:bg-[#1b5e20] text-white font-bold px-6 py-2.5 rounded-lg text-sm transition-colors">
                    Check
                  </button>
                </div>
                <div className="flex flex-col gap-2.5 text-xs font-medium text-gray-600">
                  <div className="flex items-center gap-2">
                    <FiZap className="text-[#2e7d32] text-sm" /> Same-Day Delivery — order before 2pm
                  </div>
                  <div className="flex items-center gap-2">
                    <FiTruck className="text-gray-400 text-sm" /> Standard: 1-2 working days
                  </div>
                </div>
              </div>
            </div>

            {/* You May Also Like */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-black text-gray-900">You May Also Like</h3>
                <Link to="/" className="text-[#2e7d32] text-sm font-bold hover:underline flex items-center gap-1">
                  View All <span className="text-lg leading-none">›</span>
                </Link>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {relatedProducts.map(item => (
                  <div key={item.id} className="bg-white rounded-xl border border-gray-100 p-3 flex flex-col hover:shadow-md transition-all hover:border-[#379c6b]/30">
                    <div className="relative h-28 mb-3 bg-white flex items-center justify-center p-2">
                      <img src={item.image} alt={item.name} className="max-h-full max-w-full object-contain" />
                    </div>
                    <div className="text-[#2e7d32] text-[9px] font-black uppercase tracking-wider mb-1">
                      {item.brand}
                    </div>
                    <h4 className="text-[13px] font-bold text-gray-900 leading-tight mb-1 line-clamp-2 min-h-[36px]">
                      {item.name}
                    </h4>
                    <div className="text-[10px] text-gray-500 font-medium mb-3">
                      {item.weight}
                    </div>
                    <div className="text-[15px] font-black text-gray-900 mb-3 mt-auto">
                      £{item.price.toFixed(2)}
                    </div>
                    <button className="w-full bg-[#2e7d32] hover:bg-[#1b5e20] text-white font-bold text-xs py-2 rounded-md transition-colors flex items-center justify-center gap-1">
                      <FiPlus size={12} /> Add to Cart
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:w-1/3">
            <div className="sticky top-8">
              {/* Summary Box */}
              <div className="border border-gray-200 rounded-xl overflow-hidden bg-white mb-6">
                <div className="bg-[#111827] text-white p-5 flex items-center gap-2">
                  <FiFileText className="text-xl" />
                  <h3 className="text-lg font-bold">Order Summary</h3>
                </div>
                
                <div className="p-6">
                  <div className="flex flex-col gap-4 mb-6 text-sm font-medium">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal (4 items)</span>
                      <span className="text-gray-900 font-bold">£51.96</span>
                    </div>
                    <div className="flex justify-between text-[#2e7d32]">
                      <span>Discount (SAVE10)</span>
                      <span className="font-bold">- £5.20</span>
                    </div>
                    <div className="flex justify-between text-[#2e7d32]">
                      <span>Delivery Charge</span>
                      <span className="font-bold">FREE</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>VAT (20%)</span>
                      <span className="text-gray-900 font-bold">£9.35</span>
                    </div>
                  </div>

                  <div className="border-t border-gray-100 pt-4 mb-6">
                    <div className="flex justify-between items-end">
                      <span className="text-gray-900 font-bold text-lg">Grand Total</span>
                      <span className="text-[#2e7d32] font-black text-2xl">£56.11</span>
                    </div>
                  </div>

                  <div className="bg-[#dcfce7] border border-green-200 text-[#166534] text-xs font-bold p-3 rounded-lg flex items-start gap-2 mb-3">
                    <FiCheckCircle className="text-lg flex-shrink-0 mt-0.5" />
                    <span>Coupon <span className="text-black bg-white/50 px-1 rounded">SAVE10</span> applied — saving £5.20</span>
                  </div>
                  
                  <div className="bg-[#e8f5e9] text-[#2e7d32] text-xs font-bold p-3 rounded-lg flex items-center gap-2 mb-6 text-center justify-center">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                    You're saving £5.20 on this order
                  </div>

                  <div className="flex flex-col gap-3">
                    <button className="w-full bg-[#2e7d32] hover:bg-[#1b5e20] text-white font-black py-4 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-lg shadow-green-900/20">
                      <FiLock /> Proceed to Checkout
                    </button>
                    
                    <button className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-md">
                      <FiMessageCircle /> Order via WhatsApp
                    </button>
                    
                    <button className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-900 font-bold py-3.5 rounded-lg flex items-center justify-center gap-2 transition-colors mt-1">
                      <FiArrowLeft /> Continue Shopping
                    </button>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="flex items-center justify-center gap-1.5 text-xs font-medium text-gray-500 mb-8">
                <FiShield className="text-gray-400" /> 256-bit SSL Secure Checkout 
                <span className="text-gray-300 mx-1">|</span> 
                Visa • Mastercard • PayPal
              </div>

              {/* Delivery Info */}
              <div className="bg-[#f9fafb] p-6 rounded-xl border border-gray-100">
                <h4 className="text-gray-900 font-bold text-sm mb-4">Delivery Info</h4>
                <div className="flex flex-col gap-3.5 text-xs font-medium text-gray-600">
                  <div className="flex items-start gap-2.5">
                    <FiZap className="text-[#2e7d32] text-sm flex-shrink-0 mt-0.5" />
                    <span>Same-Day if ordered before 2pm</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <FiTruck className="text-gray-400 text-sm flex-shrink-0 mt-0.5" />
                    <span>Standard: 1-2 Working Days</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <FiRefreshCw className="text-gray-400 text-sm flex-shrink-0 mt-0.5" />
                    <span>Free Returns within 14 Days</span>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Cart;
