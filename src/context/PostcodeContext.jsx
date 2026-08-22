import React, { createContext, useContext, useState, useEffect } from 'react';

const PostcodeContext = createContext();

export const usePostcode = () => {
  return useContext(PostcodeContext);
};

export const PostcodeProvider = ({ children }) => {
  const [postcode, setPostcode] = useState('');
  const [postcodeData, setPostcodeData] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const savedPostcode = localStorage.getItem('validatedPostcode');
    const savedData = localStorage.getItem('validatedPostcodeData');
    if (savedPostcode && savedData) {
      setPostcode(savedPostcode);
      setPostcodeData(JSON.parse(savedData));
    } else {
      setIsPopupOpen(true);
    }
  }, []);

  const validatePostcode = async (inputPostcode) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const normalized = inputPostcode.trim().toUpperCase();
      // Remove all spaces for the API call URL
      const urlSafePostcode = normalized.replace(/\s+/g, '');
      
      const response = await fetch(`https://api.postcodes.io/postcodes/${urlSafePostcode}`);
      const data = await response.json();

      if (response.ok && data.status === 200) {
        setPostcode(data.result.postcode);
        setPostcodeData(data.result);
        localStorage.setItem('validatedPostcode', data.result.postcode);
        localStorage.setItem('validatedPostcodeData', JSON.stringify(data.result));
        setIsPopupOpen(false);
        setIsLoading(false);
        return true;
      } else {
        setError("Please enter a valid UK postcode.");
        setIsLoading(false);
        return false;
      }
    } catch (err) {
      console.error("Error validating postcode:", err);
      setError("Unable to verify postcode. Please check your connection and try again.");
      setIsLoading(false);
      return false;
    }
  };

  const changePostcode = () => {
    setIsPopupOpen(true);
  };

  const value = {
    postcode,
    postcodeData,
    isPopupOpen,
    isLoading,
    error,
    validatePostcode,
    changePostcode,
    setError
  };

  return (
    <PostcodeContext.Provider value={value}>
      {children}
    </PostcodeContext.Provider>
  );
};
