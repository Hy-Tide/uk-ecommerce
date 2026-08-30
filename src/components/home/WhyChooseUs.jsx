import React from 'react';

const WhyChooseUs = () => {
  const features = [
    {
      title: 'Authentic Indian\nSpices & Groceries',
      icon: (
        <svg className="w-20 h-20" viewBox="0 0 100 100" fill="none">
          <path d="M20 50C20 68 33 82 50 82C67 82 80 68 80 50H20Z" fill="#FF6B00" stroke="#0C3823" strokeWidth="4" />
          <ellipse cx="50" cy="50" rx="30" ry="8" fill="#FACC15" stroke="#0C3823" strokeWidth="3" />
          <path d="M50 18C50 18 35 32 45 42C55 52 50 50 50 50" stroke="#008851" strokeWidth="4" strokeLinecap="round" />
          <path d="M60 22C60 22 48 34 55 42" stroke="#10B981" strokeWidth="3" strokeLinecap="round" />
        </svg>
      )
    },
    {
      title: 'Next-Day UK Express\nDelivery',
      icon: (
        <svg className="w-20 h-20" viewBox="0 0 100 100" fill="none">
          <rect x="15" y="35" width="45" height="35" rx="4" fill="#0C3823" stroke="#0C3823" strokeWidth="3" />
          <path d="M60 45H75L85 55V70H60V45Z" fill="#FF6B00" stroke="#0C3823" strokeWidth="3" />
          <circle cx="32" cy="72" r="7" fill="#FACC15" stroke="#0C3823" strokeWidth="3" />
          <circle cx="70" cy="72" r="7" fill="#FACC15" stroke="#0C3823" strokeWidth="3" />
          <path d="M10 42H22M5 52H18M12 62H25" stroke="#FF6B00" strokeWidth="3" strokeLinecap="round" />
        </svg>
      )
    },
    {
      title: '50,000+ Happy UK\nFamilies',
      icon: (
        <svg className="w-20 h-20" viewBox="0 0 100 100" fill="none">
          <path d="M50 15L62 38L88 42L69 60L74 85L50 73L26 85L31 60L12 42L38 38L50 15Z" fill="#FF6B00" stroke="#0C3823" strokeWidth="4" strokeLinejoin="round" />
          <path d="M50 35C45 30 35 32 35 40C35 48 50 56 50 56C50 56 65 48 65 40C65 32 55 30 50 35Z" fill="#EF4444" stroke="#0C3823" strokeWidth="2" />
        </svg>
      )
    },
    {
      title: '100% Pure & Organic\nCertified',
      icon: (
        <svg className="w-20 h-20" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="32" fill="#10B981" stroke="#0C3823" strokeWidth="4" />
          <path d="M35 50L45 60L65 38" stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M50 12V6M50 94V88M12 50H6M94 50H88" stroke="#0C3823" strokeWidth="4" strokeLinecap="round" />
        </svg>
      )
    },
    {
      title: 'Secure Payment &\nEasy Returns',
      icon: (
        <svg className="w-20 h-20" viewBox="0 0 100 100" fill="none">
          <path d="M50 15L80 28V50C80 68 67 82 50 88C33 82 20 68 20 50V28L50 15Z" fill="#8B5CF6" stroke="#0C3823" strokeWidth="4" />
          <rect x="38" y="48" width="24" height="18" rx="3" fill="white" stroke="#0C3823" strokeWidth="3" />
          <path d="M43 48V42C43 38 46 35 50 35C54 35 57 38 57 42V48" stroke="white" strokeWidth="3" strokeLinecap="round" />
        </svg>
      )
    }
  ];

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container px-4 sm:px-6">
        
        {/* Title */}
        <div className="text-center mx-auto mb-16" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
            <span className="text-[#0C3823]">We Provide the </span>
            <span className="text-[#FF6B00]">Best</span>
            <br />
            <span className="text-[#FF6B00]">Quality</span>
            <span className="text-[#0C3823]"> in All of the UK</span>
          </h2>
        </div>

        {/* 5 Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {features.map((feature, index) => (
            <div 
              key={index} 
              data-aos="fade-up" 
              data-aos-delay={index * 100}
              className="bg-[#F3F4F6] rounded-3xl p-6 flex flex-col items-center text-center hover:shadow-md transition-transform hover:-translate-y-1"
            >
              <h4 className="font-bold text-[#0C3823] text-sm md:text-base leading-snug mb-8 min-h-[40px] flex items-center justify-center whitespace-pre-line">
                {feature.title}
              </h4>
              <div className="mt-auto w-24 h-24 flex items-center justify-center">
                {feature.icon}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
