import React, { useEffect } from 'react';
import BlogHero from '../components/blog/BlogHero';
import BlogFeatured from '../components/blog/BlogFeatured';
import BlogSearchFilter from '../components/blog/BlogSearchFilter';
import BlogCategories from '../components/blog/BlogCategories';
import BlogTrending from '../components/blog/BlogTrending';
import BlogList from '../components/blog/BlogList';
import BlogNewsletter from '../components/blog/BlogNewsletter';

import { blogCategories, blogArticles, blogAuthors } from '../data/blogData';

const Blog = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const featuredArticle = blogArticles.find(a => a.featured);
  const trendingArticles = blogArticles.filter(a => a.trending);

  return (
    <div className="bg-slate-50 min-h-screen">
      <BlogHero />
      <BlogSearchFilter />
      <BlogFeatured article={featuredArticle} author={blogAuthors.find(a => a.id === featuredArticle?.authorId)} />
      <BlogCategories categories={blogCategories} />
      <BlogTrending articles={trendingArticles} />
      <BlogList articles={blogArticles} authors={blogAuthors} />
      <BlogNewsletter />
    </div>
  );
};

export default Blog;
