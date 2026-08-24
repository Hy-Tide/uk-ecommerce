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
    image: b.featuredImage || b.image || 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1200&q=80',
    category: categoryName,
    publishedDate: b.createdAt ? new Date(b.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : "Recently",
    excerpt: b.summary || b.excerpt || '',
    readTime: `${b.readingTime || 5} min read`,
    likes: b.likes || b.views || 0,
    views: b.views || 0,
    authorId: b.author?._id,
    authorName: b.author?.name || "Admin"
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
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchBlogs();
  }, []);

  const fetchBlogs = async (pageToFetch = 1, append = false) => {
    if (pageToFetch === 1) setLoading(true);
    else setIsLoadingMore(true);
    
    try {
      const limit = 6;
      const blogsPromise = getData(`website/blogs?page=${pageToFetch}&limit=${limit}`);
      const categoriesPromise = pageToFetch === 1 ? getData('website/categories') : Promise.resolve(null);
      
      const [blogsRes, categoriesRes] = await Promise.all([blogsPromise, categoriesPromise]);

      const rawBlogs = (blogsRes?.success && blogsRes?.data?.blogs) ? blogsRes.data.blogs : [];
      const mapped = rawBlogs.map((b, i) => mapApiBlogToUi(b, i));
      
      setBlogs(prev => append ? [...prev, ...mapped] : mapped);
      
      if (pageToFetch === 1 && categoriesRes?.success && categoriesRes?.data?.categories) {
        setCategories(extractRealBlogCategories(rawBlogs, categoriesRes.data.categories));
      }

      if (blogsRes?.data?.pagination) {
        setHasMore(blogsRes.data.pagination.page < blogsRes.data.pagination.totalPages);
      } else {
        setHasMore(rawBlogs.length === limit);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
      setIsLoadingMore(false);
    }
  };

  const featuredArticle = blogs.find(a => a.isFeatured) || blogs[0];
  const featuredAuthor = featuredArticle 
    ? blogAuthors.find(a => a.id === featuredArticle.authorId) || { 
        name: featuredArticle.authorName || 'Admin', 
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(featuredArticle.authorName || 'Admin')}&background=random`,
        role: 'Author'
      }
    : null;

  // Sort by views for trending, or fallback to first 3
  const trendingArticles = [...blogs].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 3);

  const handleLoadMore = () => {
    if (isLoadingMore) return;
    const nextPage = page + 1;
    setPage(nextPage);
    fetchBlogs(nextPage, true);
  };

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
      <BlogList 
        articles={blogs} 
        authors={blogAuthors} 
        onLoadMore={handleLoadMore}
        hasMore={hasMore}
        isLoadingMore={isLoadingMore}
      />
      <BlogNewsletter />
    </div>
  );
};

export default Blog;

