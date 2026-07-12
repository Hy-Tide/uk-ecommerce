import React from 'react';

const BlogContent = ({ children }) => {
  return (
    <article className="prose prose-lg prose-slate max-w-none">
      
      <p className="text-xl leading-relaxed text-slate-600 font-medium mb-8">
        Indian cuisine is renowned globally for its complex flavor profiles, which are largely built upon a rich tapestry of spices. Whether you are a beginner looking to dip your toes into Indian cooking or an experienced chef, having the right spices in your pantry is non-negotiable.
      </p>

      <h2 className="text-3xl font-black text-slate-800 mt-12 mb-6">The Foundation of Flavor</h2>
      
      <p>
        The secret to authentic Indian food isn't just about throwing spices into a pan; it's about understanding how each spice behaves when subjected to heat, fat, and moisture. The process of blooming spices in hot oil or ghee—known as <em>tadka</em> or tempering—is what releases their essential oils and defines the dish.
      </p>

      {/* Pull Quote */}
      <div className="my-10 p-8 bg-[#FAFAF8] rounded-[24px] border-l-4 border-[#FF8A00]">
        <p className="text-2xl font-medium text-slate-800 italic m-0">
          "Spices are the vocabulary of Indian cooking. Without them, the kitchen is silent."
        </p>
      </div>

      <h3 className="text-2xl font-bold text-slate-800 mt-10 mb-4">Must-Have Whole Spices</h3>
      <ul className="space-y-4 mb-8 text-slate-600">
        <li><strong>Cumin Seeds (Jeera):</strong> Earthy and slightly bitter, forming the base of many curries and rice dishes.</li>
        <li><strong>Mustard Seeds (Rai):</strong> Essential for South Indian cooking, these pop in hot oil giving a nutty flavor.</li>
        <li><strong>Cardamom (Elaichi):</strong> Both green (sweet, floral) and black (smoky, bold) are used in curries and biryanis.</li>
        <li><strong>Cloves (Laung):</strong> Intense, warm, and sweet. Use sparingly.</li>
      </ul>

      {/* Full Width Image in content */}
      <figure className="my-12">
        <img 
          src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=1200" 
          alt="Various Indian Spices" 
          className="w-full rounded-[24px] shadow-md object-cover h-[400px]"
        />
        <figcaption className="text-center text-sm text-slate-400 mt-4 font-medium">
          Fresh whole spices ready to be ground into a homemade masala blend.
        </figcaption>
      </figure>

      <h3 className="text-2xl font-bold text-slate-800 mt-10 mb-4">Ground Powders You Can't Skip</h3>
      <p>
        While whole spices are crucial for tempering, ground spices build the body and color of the gravy.
      </p>
      <ol className="space-y-4 mb-8 text-slate-600">
        <li><strong>Turmeric Powder (Haldi):</strong> The golden spice. Provides color, a mild earthy flavor, and immense health benefits.</li>
        <li><strong>Kashmiri Red Chilli Powder:</strong> Loved for its vibrant red color without the extreme heat of regular chilli powder.</li>
        <li><strong>Coriander Powder (Dhania):</strong> Adds body and a citrusy, sweet note to gravies.</li>
        <li><strong>Garam Masala:</strong> A warming blend of spices usually added towards the end of cooking to preserve its aroma.</li>
      </ol>

      {/* Tip Box */}
      <div className="my-10 p-6 bg-emerald-50 rounded-[20px] border border-emerald-100 flex gap-4">
        <div className="text-3xl">💡</div>
        <div>
          <h4 className="font-bold text-[#2E8B57] text-lg mb-2">Pro Storage Tip</h4>
          <p className="text-slate-600 m-0 text-base">
            Always store your spices in airtight glass or stainless steel containers away from direct sunlight and heat. This prevents the essential oils from evaporating, keeping your spices pungent for up to 6 months.
          </p>
        </div>
      </div>

      <h2 className="text-3xl font-black text-slate-800 mt-12 mb-6">Conclusion</h2>
      <p>
        Building an Indian pantry takes time. Start with these essentials, and as you get comfortable, explore regional spices like Curry Leaves, Panch Phoron, or Kalpasi. Happy cooking!
      </p>

      {children}
    </article>
  );
};

export default BlogContent;
