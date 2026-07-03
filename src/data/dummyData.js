export const categories = [
  { id: 1, name: 'Spices & Masala', slug: 'spices', count: '840 products', icon: '🌶️', image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=150&q=80', active: true },
  { id: 2, name: 'Rice & Grains', slug: 'rice', count: '210 products', icon: '🌾', image: '/images/cat-rice.png' },
  { id: 3, name: 'Dal & Pulses', slug: 'dal', count: '180 products', icon: '🍲', image: '/images/cat-dal.png' },
  { id: 4, name: 'Flour & Atta', slug: 'flour', count: '95 products', icon: '🥖', image: '/images/cat-flour.png' },
  { id: 5, name: 'Pickles & Achar', slug: 'pickles', count: '145 products', icon: '🥭', image: '/images/cat-pickles.png' },
  { id: 6, name: 'Sweets & Mithai', slug: 'sweets', count: '230 products', icon: '🍬', image: '/images/cat-sweets.png' },
  { id: 7, name: 'Snacks & Namkeen', slug: 'snacks', count: '320 products', icon: '🥨', image: '/images/cat-snacks.png' },
  { id: 8, name: 'Drinks & Chai', slug: 'drinks', count: '120 products', icon: '☕', image: '/images/cat-drinks.png' },
  { id: 9, name: 'Personal Care', slug: 'personal-care', count: '165 products', icon: '🧴', image: '/images/cat-personal.png' },
];

export const products = [
  {
    id: 1,
    brand: 'MDH',
    name: 'Garam Masala Powder',
    slug: 'mdh-garam-masala',
    weight: '500g',
    price: 3.49,
    oldPrice: 4.29,
    discountAmount: '20% off',
    badge: { text: '-20%', type: 'discount' },
    rating: 5,
    reviews: 284,
    image: '/images/prod-garam-masala.png',
    category: 'spices'
  },
  {
    id: 2,
    brand: 'TILDA',
    name: 'Pure Basmati Rice',
    slug: 'tilda-pure-basmati',
    weight: '2kg',
    price: 5.99,
    oldPrice: 6.79,
    discountAmount: '12% off',
    badge: { text: 'New', type: 'new' },
    rating: 4.5,
    reviews: 512,
    image: '/images/prod-basmati-rice.png',
    category: 'rice'
  },
  {
    id: 3,
    brand: "HALDIRAM'S",
    name: 'Gulab Jamun Tin',
    slug: 'haldirams-gulab-jamun',
    weight: '1kg',
    price: 4.29,
    oldPrice: 5.99,
    discountAmount: '28% off',
    badge: { text: 'Hot', type: 'hot' },
    rating: 5,
    reviews: 198,
    image: '/images/prod-gulab-jamun.png',
    category: 'sweets'
  },
  {
    id: 4,
    brand: 'AASHIRVAAD',
    name: 'Whole Wheat Atta',
    slug: 'aashirvaad-whole-wheat',
    weight: '5kg',
    price: 8.49,
    oldPrice: 9.99,
    discountAmount: '15% off',
    badge: null,
    rating: 5,
    reviews: 743,
    image: '/images/prod-wheat-atta.png',
    category: 'flour'
  },
  {
    id: 5,
    brand: "HALDIRAM'S",
    name: 'Aloo Bhujia Sev',
    slug: 'haldirams-aloo-bhujia',
    weight: '400g',
    price: 2.79,
    oldPrice: 3.29,
    discountAmount: '15% off',
    badge: { text: '-15%', type: 'discount' },
    rating: 4.5,
    reviews: 327,
    image: '/images/prod-aloo-bhujia.png',
    category: 'snacks'
  }
];

export const brands = [
  { id: 1, name: 'Nestle', image: 'https://via.placeholder.com/150x80?text=Nestle' },
  { id: 2, name: 'Coca-Cola', image: 'https://via.placeholder.com/150x80?text=Coca-Cola' },
  { id: 3, name: 'Kelloggs', image: 'https://via.placeholder.com/150x80?text=Kelloggs' },
  { id: 4, name: 'Heinz', image: 'https://via.placeholder.com/150x80?text=Heinz' },
  { id: 5, name: 'Cadbury', image: 'https://via.placeholder.com/150x80?text=Cadbury' },
  { id: 6, name: 'Unilever', image: 'https://via.placeholder.com/150x80?text=Unilever' },
];

export const newArrivals = [
  {
    id: 101,
    brand: 'MDH',
    name: 'Chana Masala Mix',
    slug: 'mdh-chana-masala',
    weight: '100g',
    price: 1.99,
    oldPrice: null,
    discountAmount: null,
    badge: { text: 'New', type: 'new' },
    rating: 4,
    reviews: 42,
    image: '/images/chana-masala-mix.jpg',
    category: 'spices'
  },
  {
    id: 102,
    brand: "HALDIRAM'S",
    name: 'Rasgulla in Syrup',
    slug: 'haldirams-rasgulla',
    weight: '1kg',
    price: 3.79,
    oldPrice: 4.49,
    discountAmount: '16% off',
    badge: { text: 'New', type: 'new' },
    rating: 5,
    reviews: 87,
    image: '/images/Rasagulla-syrup.jpg',
    category: 'sweets'
  },
  {
    id: 103,
    brand: 'DABUR',
    name: 'Chyawanprash',
    slug: 'dabur-chyawanprash',
    weight: '500g',
    price: 5.49,
    oldPrice: 6.99,
    discountAmount: '21% off',
    badge: { text: 'New', type: 'new' },
    rating: 4.5,
    reviews: 219,
    image: '/images/chyawan.jpg',
    category: 'health'
  },
  {
    id: 104,
    brand: 'PATANJALI',
    name: 'Pure Cow Ghee',
    slug: 'patanjali-cow-ghee',
    weight: '1L',
    price: 9.99,
    oldPrice: 11.99,
    discountAmount: '17% off',
    badge: { text: 'New', type: 'new' },
    rating: 4,
    reviews: 155,
    image: '/images/pure-cow-ghee.jpg',
    category: 'pantry'
  }
];

export const recipes = [
  {
    id: 1,
    category: 'NORTH INDIAN',
    title: 'Butter Chicken',
    desc: 'Rich and creamy murgh makhani with aromatic spices and fresh tomato gravy',
    time: '45 mins',
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 2,
    category: 'HYDERABADI',
    title: 'Chicken Biryani',
    desc: 'Aromatic saffron basmati rice layered with spiced chicken and caramelised onions',
    time: '90 mins',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 3,
    category: 'BEVERAGES',
    title: 'Classic Masala Chai',
    desc: 'Warming spiced tea with ginger, cardamom, cinnamon and fresh milk',
    time: '10 mins',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 4,
    category: 'VEGETARIAN',
    title: 'Dal Makhani',
    desc: 'Slow-cooked creamy black lentils with butter, tomato and aromatic spices',
    time: '60 mins',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=600&auto=format&fit=crop'
  }
];

export const testimonials = [
  {
    id: 1,
    name: 'Sarah Jenkins',
    role: 'Customer',
    content: 'UK Groceries has the freshest produce I have ever bought online. Delivery is always on time!',
    avatar: 'https://i.pravatar.cc/150?img=1'
  },
  {
    id: 2,
    name: 'Mark Thompson',
    role: 'Customer',
    content: 'Great prices and an amazing selection of organic foods. Highly recommended.',
    avatar: 'https://i.pravatar.cc/150?img=11'
  },
  {
    id: 3,
    name: 'Emily Davis',
    role: 'Customer',
    content: 'The user interface is so easy to use, and I love the quick reorder feature!',
    avatar: 'https://i.pravatar.cc/150?img=5'
  }
];

export const shopDropdownData = [
  {
    id: 1,
    name: 'Atta & Flour',
    slug: 'atta-flour',
    product: {
      id: 101,
      name: 'Aashirvaad Whole Wheat Atta 10kg',
      image: '/images/prod-wheat-atta.png',
      price: 15.99
    }
  },
  {
    id: 2,
    name: 'Rice & Grains',
    slug: 'rice-grains',
    product: {
      id: 102,
      name: 'India Gate Basmati Rice 5kg',
      image: '/images/prod-basmati-rice.png',
      price: 18.50
    }
  },
  {
    id: 3,
    name: 'Spices & Masalas',
    slug: 'spices-masalas',
    product: {
      id: 103,
      name: 'MDH Garam Masala 100g',
      image: '/images/prod-garam-masala.png',
      price: 3.49
    }
  }
];

import aashirvaad from '../assets/images/Ashirvaad.jpg';
import multigrain from '../assets/images/Aashirvaad-Multigrain.jpg';
import indiaGate from '../assets/images/IndiaGateChakki.jpg';
import pillsbury from '../assets/images/PillsBuryChakki.jpg';
import nagaBesan from '../assets/images/NagaBEsan.jpg';
import heeraGram from '../assets/images/HeeraGramFlour.jpg';
import shankarMaida from '../assets/images/ShankarMaida.jpg';
import riceFlour from '../assets/images/RiceFlour.jpg';
import cornFlour from '../assets/images/CornFlour.jpg';
import ragiFlour from '../assets/images/RagiFlour.jpg';

export const shopProducts = [
  {
    id: 201,
    brand: 'AASHIRVAAD',
    name: 'Aashirvaad Whole Wheat Atta 10kg',
    slug: 'aashirvaad-whole-wheat-10kg',
    weight: '10kg',
    price: 12.00,
    oldPrice: 13.50,
    discountAmount: 'Save £1.5',
    badge: { text: '-11%', type: 'discount' },
    rating: 5,
    reviews: 843,
    image: aashirvaad,
    category: 'flour'
  },
  {
    id: 202,
    brand: 'AASHIRVAAD',
    name: 'Aashirvaad Multigrain Atta 5kg',
    slug: 'aashirvaad-multigrain-5kg',
    weight: '5kg',
    price: 8.49,
    oldPrice: 9.99,
    discountAmount: 'Save £1.50',
    badge: { text: 'New', type: 'new' },
    rating: 4.5,
    reviews: 412,
    image: multigrain,
    category: 'flour'
  },
  {
    id: 203,
    brand: 'INDIA GATE',
    name: 'India Gate Chakki Atta 5kg',
    slug: 'india-gate-chakki-5kg',
    weight: '5kg',
    price: 7.99,
    oldPrice: 8.49,
    discountAmount: 'Save 50p',
    badge: null,
    rating: 4,
    reviews: 215,
    image: indiaGate,
    category: 'flour'
  },
  {
    id: 204,
    brand: 'PILLSBURY',
    name: 'Pillsbury Chakki Atta 10kg',
    slug: 'pillsbury-chakki-10kg',
    weight: '10kg',
    price: 13.49,
    oldPrice: 14.49,
    discountAmount: 'Save £1',
    badge: { text: 'Hot', type: 'hot' },
    rating: 4.5,
    reviews: 620,
    image: pillsbury,
    category: 'flour'
  },
  {
    id: 205,
    brand: 'NAGA',
    name: 'Naga Besan Flour',
    slug: 'naga-besan',
    weight: '1kg',
    price: 2.49,
    oldPrice: 2.99,
    discountAmount: 'Save 50p',
    badge: { text: '-15%', type: 'discount' },
    rating: 4.5,
    reviews: 132,
    image: nagaBesan,
    category: 'flour'
  },
  {
    id: 206,
    brand: 'HEERA',
    name: 'Heera Gram Flour',
    slug: 'heera-gram-flour',
    weight: '2kg',
    price: 3.89,
    oldPrice: null,
    discountAmount: null,
    badge: null,
    rating: 4,
    reviews: 89,
    image: heeraGram,
    category: 'flour'
  },
  {
    id: 207,
    brand: 'SHANKAR',
    name: 'Shankar Maida',
    slug: 'shankar-maida',
    weight: '1.5kg',
    price: 1.99,
    oldPrice: 2.49,
    discountAmount: 'Save 50p',
    badge: { text: 'Offer', type: 'discount' },
    rating: 4,
    reviews: 145,
    image: shankarMaida,
    category: 'flour'
  },
  {
    id: 208,
    brand: 'PATANJALI',
    name: 'Rice Flour',
    slug: 'patanjali-rice-flour',
    weight: '1kg',
    price: 2.29,
    oldPrice: 2.69,
    discountAmount: 'Save 40p',
    badge: { text: '-10%', type: 'discount' },
    rating: 4.5,
    reviews: 210,
    image: riceFlour,
    category: 'flour'
  },
  {
    id: 209,
    brand: 'HEERA',
    name: 'Corn Flour',
    slug: 'heera-corn-flour',
    weight: '500g',
    price: 1.79,
    oldPrice: 2.00,
    discountAmount: 'Save 21p',
    badge: { text: 'Sale', type: 'discount' },
    rating: 4,
    reviews: 75,
    image: cornFlour,
    category: 'flour'
  },
  {
    id: 210,
    brand: 'ORGANIC TATTVA',
    name: 'Ragi Flour',
    slug: 'organic-tattva-ragi-flour',
    weight: '1kg',
    price: 3.59,
    oldPrice: 4.00,
    discountAmount: 'Save 41p',
    badge: { text: 'New', type: 'new' },
    rating: 5,
    reviews: 180,
    image: ragiFlour,
    category: 'flour'
  }
];

export const shopFilters = {
  brands: [
    { name: 'Aashirvaad', count: 12 },
    { name: 'India Gate', count: 5 },
    { name: 'Pillsbury', count: 8 },
    { name: 'Naga', count: 4 },
    { name: 'Everest', count: 9 },
    { name: 'Patanjali', count: 6 },
    { name: 'Fortune', count: 7 }
  ],
  weights: [
    { name: '10kg', count: 14 },
    { name: '5kg', count: 21 },
    { name: '1kg', count: 45 },
    { name: '500g', count: 30 }
  ],
  categories: [
    'Atta Flour', 'All Purpose', 'Gram Flour', 'Rice Flour', 'Millet', 'Corn Flour'
  ]
};

export const subCategories = [
  'Aashirvaad', 'Naga', 'Everest', 'Pillsbury', 'Patanjali', 'Fortune', 'Sujata', 'Heera', 'East End'
];

export const detailedProduct = {
  id: 'pd-1',
  brand: 'AASHIRVAAD',
  name: 'Aashirvaad Whole Wheat Atta 10kg',
  price: 14.99,
  oldPrice: 16.99,
  savings: 'You Save £2.00',
  discountBadge: '-15% OFF',
  rating: 4.8,
  reviewsCount: 115,
  soldCount: '70+ sold in last 24 hrs',
  description: 'Bringing pure goodness and nutrition to your family. Aashirvaad Whole Wheat Atta is carefully crafted using a 4-step advantage process to retain its natural dietary fiber. Sourced from the finest wheat fields.',
  stockCount: 14,
  highlights: [
    '100% Whole Wheat', '0% Maida', 'Rich in Fiber', 'No Added Preservatives', 'Soft Rotis', 'Vacuum Packed'
  ],
  features: [
    'Uses 100% pure whole wheat without any maida mix to ensure healthy meals for your family.',
    'Carefully milled using a traditional chakki process to retain dietary fiber and natural nutrients.',
    'Absorbs more water resulting in softer, fluffier rotis that stay fresh longer.',
    'Rich in essential nutrients, promoting better digestion and overall well-being.',
    'Sourced from the finest quality golden amber wheat grains from premium farms.'
  ]
};

export const frequentlyBought = [
  { id: 'fb-1', name: 'Aashirvaad Whole Wheat Atta 10kg', price: 14.99, image: aashirvaad },
  { id: 'fb-2', name: 'Amul Cow Ghee 500ml', price: 6.99, image: aashirvaad },
  { id: 'fb-3', name: 'Toor Dal 1kg', price: 2.30, image: aashirvaad }
];

export const productReviewsData = {
  summary: {
    average: 4.8,
    total: 115,
    distribution: { 5: 85, 4: 15, 3: 10, 2: 2, 1: 3 }
  },
  reviews: [
    {
      id: 1,
      name: 'Priya S.',
      date: 'Verified purchase • 1 month ago',
      rating: 5,
      content: 'Very soft rotis and tastes great! Arrived quickly and in perfect condition. Will definitely buy again from this store.',
      avatar: 'https://i.pravatar.cc/150?img=5'
    },
    {
      id: 2,
      name: 'Rahul K.',
      date: 'Verified purchase • 2 weeks ago',
      rating: 5,
      content: 'Perfect quality. Have been using Aashirvaad for years and it never disappoints. Good price point too.',
      avatar: 'https://i.pravatar.cc/150?img=11'
    }
  ]
};

export const productFAQs = [
  {
    question: 'How long does shipping take to the UK mainland?',
    answer: 'Standard shipping generally takes 2-3 business days. Next day delivery options are available at checkout for orders placed before 2 PM.'
  },
  {
    question: 'Is this product vacuum packed to stay fresh during shipping?',
    answer: 'Yes! All our premium flours are securely vacuum packed to preserve freshness and ensure zero moisture enters during transit.'
  },
  {
    question: 'Do you offer bulk discounts for restaurants or caterers?',
    answer: 'Yes, we offer special rates for bulk orders. Please contact our wholesale team via the contact form for more details and pricing sheets.'
  }
];
