import React, { useEffect } from 'react';
import ContactHero from '../components/contact/ContactHero';
import ContactCards from '../components/contact/ContactCards';
import ContactFormSection from '../components/contact/ContactFormSection';
import QuickHelp from '../components/contact/QuickHelp';
import StoreLocations from '../components/contact/StoreLocations';
import BusinessHours from '../components/contact/BusinessHours';
import ContactFAQ from '../components/contact/ContactFAQ';
import ContactWhyChooseUs from '../components/contact/ContactWhyChooseUs';
import Newsletter from '../components/home/Newsletter';

const Contact = () => {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen">
      <div data-aos="fade-down"><ContactHero /></div>
      <div data-aos="fade-up" data-aos-delay="100"><ContactCards /></div>
      <div data-aos="fade-up" data-aos-delay="150"><ContactFormSection /></div>
      <div data-aos="fade-up"><QuickHelp /></div>
      <div data-aos="fade-up"><StoreLocations /></div>
      <div data-aos="fade-up"><BusinessHours /></div>
      <div data-aos="fade-up"><ContactFAQ /></div>
      <div data-aos="fade-up"><ContactWhyChooseUs /></div>

      {/* Newsletter Section */}
      <div className="bg-white" data-aos="fade-up">
        <Newsletter />
      </div>
    </div>
  );
};

export default Contact;
