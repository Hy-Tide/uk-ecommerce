import React, { useState, useEffect } from 'react';

const BlogReadingProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  const updateScroll = () => {
    const currentScrollY = window.scrollY;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    if (scrollHeight) {
      setScrollProgress(Number((currentScrollY / scrollHeight).toFixed(4)) * 100);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', updateScroll);
    return () => window.removeEventListener('scroll', updateScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1.5 z-50 bg-transparent">
      <div 
        className="h-full bg-gradient-to-r from-[#2E8B57] to-[#FF8A00] transition-all duration-150 ease-out shadow-[0_0_10px_rgba(46,139,87,0.5)]"
        style={{ width: `${scrollProgress}%` }}
      ></div>
    </div>
  );
};

export default BlogReadingProgress;
