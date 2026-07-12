export const blogCategories = [
  { id: 1, name: 'Recipes', count: 124, slug: 'recipes', color: 'bg-orange-100 text-orange-600', icon: '🍲' },
  { id: 2, name: 'Healthy Living', count: 85, slug: 'healthy-living', color: 'bg-emerald-100 text-emerald-600', icon: '🥗' },
  { id: 3, name: 'Grocery Guides', count: 42, slug: 'grocery-guides', color: 'bg-blue-100 text-blue-600', icon: '🛒' },
  { id: 4, name: 'Indian Festivals', count: 36, slug: 'festivals', color: 'bg-purple-100 text-purple-600', icon: '🪔' },
  { id: 5, name: 'Cooking Tips', count: 58, slug: 'cooking-tips', color: 'bg-amber-100 text-amber-600', icon: '👨‍🍳' },
  { id: 6, name: 'Product Spotlight', count: 27, slug: 'spotlight', color: 'bg-rose-100 text-rose-600', icon: '⭐' },
  { id: 7, name: 'Regional Cuisine', count: 91, slug: 'regional', color: 'bg-cyan-100 text-cyan-600', icon: '🗺️' },
  { id: 8, name: 'Meal Planning', count: 34, slug: 'meal-planning', color: 'bg-lime-100 text-lime-600', icon: '📅' },
];

export const blogAuthors = [
  {
    id: 'a1',
    name: 'Anjali Sharma',
    role: 'Head Chef & Culinary Expert',
    avatar: 'https://i.pravatar.cc/150?img=47',
    bio: 'Anjali is a passionate chef with over 15 years of experience in regional Indian cuisines. She specializes in authentic home-style cooking.',
    articles: 42,
    followers: '12K',
  },
  {
    id: 'a2',
    name: 'Vikram Patel',
    role: 'Nutritionist',
    avatar: 'https://i.pravatar.cc/150?img=11',
    bio: 'Vikram helps you navigate the health benefits of Indian spices and ingredients to build a balanced, nutritious diet.',
    articles: 28,
    followers: '8K',
  },
  {
    id: 'a3',
    name: 'Meera Deshmukh',
    role: 'Food Blogger',
    avatar: 'https://i.pravatar.cc/150?img=5',
    bio: 'Exploring modern twists on classic Indian street food and festival sweets. Meera loves quick, delicious 30-minute meals.',
    articles: 56,
    followers: '24K',
  }
];

export const blogArticles = [
  {
    id: 'p1',
    slug: 'essential-spices-for-every-indian-kitchen',
    title: '10 Essential Spices Every Indian Kitchen Needs',
    excerpt: 'Discover the foundational spices that bring authentic Indian flavors to life, from fragrant cardamom to earthy turmeric.',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=1000',
    category: 'Grocery Guides',
    authorId: 'a1',
    publishedDate: 'Oct 12, 2026',
    readTime: '6 min read',
    views: '12.4K',
    likes: 342,
    featured: true,
    trending: false
  },
  {
    id: 'p2',
    slug: 'perfect-butter-chicken-recipe',
    title: 'The Secret to Restaurant-Style Butter Chicken',
    excerpt: 'Learn the techniques and exact ingredient ratios to master this rich, creamy, and iconic North Indian curry at home.',
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&q=80&w=1000',
    category: 'Recipes',
    authorId: 'a3',
    publishedDate: 'Oct 15, 2026',
    readTime: '12 min read',
    views: '45.1K',
    likes: 1205,
    featured: false,
    trending: true
  },
  {
    id: 'p3',
    slug: 'health-benefits-of-turmeric',
    title: 'Golden Spice: The Science Behind Turmeric\'s Health Benefits',
    excerpt: 'Explore how curcumin acts as a powerful anti-inflammatory and antioxidant, and how to maximize its absorption.',
    image: 'https://images.unsplash.com/photo-1615486171448-4ffd3bb3f2f8?auto=format&fit=crop&q=80&w=1000',
    category: 'Healthy Living',
    authorId: 'a2',
    publishedDate: 'Oct 18, 2026',
    readTime: '5 min read',
    views: '8.2K',
    likes: 210,
    featured: false,
    trending: true
  },
  {
    id: 'p4',
    slug: 'diwali-sweet-prep-guide',
    title: 'Your Ultimate Diwali Sweets Prep Guide',
    excerpt: 'Get ready for the festival of lights with these foolproof recipes for Kaju Katli, Gulab Jamun, and crispy Jalebi.',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=1000',
    category: 'Indian Festivals',
    authorId: 'a1',
    publishedDate: 'Oct 20, 2026',
    readTime: '8 min read',
    views: '22.3K',
    likes: 890,
    featured: false,
    trending: true
  },
  {
    id: 'p5',
    slug: 'understanding-different-dals',
    title: 'A Beginner\'s Guide to Different Types of Dal',
    excerpt: 'Toor, Moong, Masoor, Urad—what is the difference and which lentils should you use for which dish?',
    image: 'https://images.unsplash.com/photo-1515543904379-3d757afe72e4?auto=format&fit=crop&q=80&w=1000',
    category: 'Cooking Tips',
    authorId: 'a1',
    publishedDate: 'Oct 22, 2026',
    readTime: '7 min read',
    views: '5.6K',
    likes: 145,
    featured: false,
    trending: false
  },
  {
    id: 'p6',
    slug: 'vegan-palak-paneer-alternative',
    title: 'Creamy Vegan Palak Tofu (Spinach Curry)',
    excerpt: 'A dairy-free twist on a classic favorite that maintains all the rich flavors and creamy textures of traditional Palak Paneer.',
    image: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&q=80&w=1000',
    category: 'Recipes',
    authorId: 'a3',
    publishedDate: 'Oct 25, 2026',
    readTime: '9 min read',
    views: '11.8K',
    likes: 432,
    featured: false,
    trending: false
  }
];

export const recipeIngredientsDummy = [
  { id: 'i1', name: 'Tilda Pure Basmati Rice 1kg', price: '£4.50', qty: '2 Cups', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=200' },
  { id: 'i2', name: 'Lakshmi Premium Ghee 500g', price: '£6.99', qty: '3 tbsp', image: 'https://images.unsplash.com/photo-1626082895617-2c6b484a0d9c?auto=format&fit=crop&q=80&w=200' },
  { id: 'i3', name: 'MDH Garam Masala 100g', price: '£1.75', qty: '1 tsp', image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=200' }
];

export const blogCommentsDummy = [
  { id: 1, user: 'Priya M.', avatar: 'https://i.pravatar.cc/150?img=32', date: '2 days ago', text: 'This recipe turned out perfectly! The secret tip about simmering the tomatoes longer really made a difference to the gravy.', likes: 12 },
  {
    id: 2, user: 'John D.', avatar: 'https://i.pravatar.cc/150?img=12', date: '5 days ago', text: 'Can I substitute cashew cream for the heavy cream in this recipe to make it vegan?', likes: 4, replies: [
      { id: 21, user: 'Anjali Sharma', avatar: 'https://i.pravatar.cc/150?img=47', isAuthor: true, date: '4 days ago', text: 'Hi John! Yes, cashew cream is an excellent substitute and will give you a very similar rich texture.', likes: 8 }
    ]
  }
];
