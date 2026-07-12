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
      <ContactHero />
      <ContactCards />
      <ContactFormSection />
      <QuickHelp />
      <StoreLocations />
      <BusinessHours />
      <ContactFAQ />
      <ContactWhyChooseUs />

      {/* Newsletter Section */}
      <div className="bg-white">
        <Newsletter />
      </div>
    </div>
  );
};

export default Contact;
