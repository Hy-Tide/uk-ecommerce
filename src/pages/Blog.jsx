import React, { useEffect, useState } from 'react';
import BlogHero from '../components/blog/BlogHero';
import BlogFeatured from '../components/blog/BlogFeatured';
import BlogSearchFilter from '../components/blog/BlogSearchFilter';
import BlogCategories from '../components/blog/BlogCategories';
import BlogTrending from '../components/blog/BlogTrending';
import BlogList from '../components/blog/BlogList';
import BlogNewsletter from '../components/blog/BlogNewsletter';

import { blogAuthors, blogArticles } from '../data/blogData';
import { getData } from '../services/webservices';

// Helper to map API blog to UI format
export const mapApiBlogToUi = (b, index = 0) => {
  const categoryName = (typeof b.categoryId === 'object' && b.categoryId?.name)
    || (typeof b.category === 'object' && b.category?.name)
    || (typeof b.categoryId === 'string' && b.categoryId)
    || (typeof b.category === 'string' && b.category)
    || "General";

  return {
    ...b,
    id: b._id,
    image: b.image || 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1200&q=80',
    category: categoryName,
    publishedDate: b.createdAt ? new Date(b.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : "Recently",
    excerpt: b.summary || b.excerpt || '',
    readTime: `${b.readingTime || 5} min read`,
    likes: b.likes || 0,
    authorId: b.author?._id
  };
};

// Helper to derive real categories from API blogs & backend category response
export const extractRealBlogCategories = (rawBlogs = [], apiCategories = []) => {
  const categoryMap = {};
  const palette = [
    { color: 'bg-emerald-100 text-emerald-600', icon: '🥗' },
    { color: 'bg-orange-100 text-orange-600', icon: '🍲' },
    { color: 'bg-blue-100 text-blue-600', icon: '🛒' },
    { color: 'bg-purple-100 text-purple-600', icon: '🪔' },
    { color: 'bg-amber-100 text-amber-600', icon: '👨‍🍳' },
    { color: 'bg-rose-100 text-rose-600', icon: '⭐' },
    { color: 'bg-cyan-100 text-cyan-600', icon: '🗺️' },
    { color: 'bg-lime-100 text-lime-600', icon: '📅' },
  ];

  rawBlogs.forEach((b) => {
    let catObj = null;
    if (b.categoryId && typeof b.categoryId === 'object') {
      catObj = b.categoryId;
    } else if (b.category && typeof b.category === 'object') {
      catObj = b.category;
    } else if (typeof b.category === 'string' && b.category.trim()) {
      catObj = { name: b.category.trim(), slug: b.category.trim().toLowerCase().replace(/\s+/g, '-') };
    } else if (typeof b.categoryId === 'string' && b.categoryId.trim()) {
      catObj = { name: b.categoryId.trim(), slug: b.categoryId.trim().toLowerCase().replace(/\s+/g, '-') };
    }

    if (catObj && catObj.name) {
      const key = catObj._id || catObj.name;
      if (!categoryMap[key]) {
        categoryMap[key] = {
          id: key,
          name: catObj.name,
          slug: catObj.slug || catObj.name.toLowerCase().replace(/\s+/g, '-'),
          count: 1,
        };
      } else {
        categoryMap[key].count += 1;
      }
    }
  });

  apiCategories.forEach((apiCat) => {
    const key = apiCat._id || apiCat.name;
    if (categoryMap[key]) {
      if (apiCat.image) categoryMap[key].image = apiCat.image;
      if (apiCat.icon) categoryMap[key].icon = apiCat.icon;
      if (apiCat.slug) categoryMap[key].slug = apiCat.slug;
    }
  });

  return Object.values(categoryMap).map((cat, idx) => {
    const style = palette[idx % palette.length];
    return {
      ...cat,
      color: style.color,
      icon: cat.icon || style.icon,
    };
  });
};

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const [blogsRes, categoriesRes] = await Promise.all([
        getData('website/blogs'),
        getData('website/categories')
      ]);

      const rawBlogs = (blogsRes.success && blogsRes.data && blogsRes.data.blogs) ? blogsRes.data.blogs : [];
      const apiCategories = (categoriesRes.success && categoriesRes.data && categoriesRes.data.categories) ? categoriesRes.data.categories : [];

      const mapped = rawBlogs.map((b, i) => mapApiBlogToUi(b, i));
      setBlogs(mapped);

      const realCategories = extractRealBlogCategories(rawBlogs, apiCategories);
      setCategories(realCategories);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const featuredArticle = blogs.find(a => a.isFeatured) || blogs[0];
  const featuredAuthor = featuredArticle ? blogAuthors.find(a => a.id === featuredArticle.authorId) || featuredArticle.author : null;

  // Sort by views for trending, or fallback to first 3
  const trendingArticles = [...blogs].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 3);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      <BlogHero />
      <BlogSearchFilter categories={categories} />
      {featuredArticle && <BlogFeatured article={featuredArticle} author={featuredAuthor} />}
      <BlogCategories categories={categories} />
      {trendingArticles.length > 0 && <BlogTrending articles={trendingArticles} />}
      <BlogList articles={blogs} authors={blogAuthors} />
      <BlogNewsletter />
    </div>
  );
};

export default Blog;

