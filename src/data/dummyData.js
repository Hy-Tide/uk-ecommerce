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
