import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import BlogDetailsHero from '../components/blog/BlogDetailsHero';
import BlogBreadcrumb from '../components/blog/BlogBreadcrumb';
import BlogContent from '../components/blog/BlogContent';
import BlogReadingProgress from '../components/blog/BlogReadingProgress';
import BlogSidebar from '../components/blog/BlogSidebar';
import RecipeWidget from '../components/blog/RecipeWidget';
import BlogAuthorSection from '../components/blog/BlogAuthorSection';
import BlogRelatedPosts from '../components/blog/BlogRelatedPosts';
import BlogComments from '../components/blog/BlogComments';
import BlogShareBar from '../components/blog/BlogShareBar';
import BlogNav from '../components/blog/BlogNav';
import BlogNewsletter from '../components/blog/BlogNewsletter';

import { blogAuthors, blogArticles, recipeIngredientsDummy, blogCommentsDummy } from '../data/blogData';
import { getData } from '../services/webservices';

const BlogDetails = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchBlogDetails();
  }, [slug]);

  const fetchBlogDetails = async () => {
    setLoading(true);
    try {
      const response = await getData(`website/blogs/${slug}`);
      if (response.success && response.data && response.data.blog) {
        const b = response.data.blog;
        const categoryName = (typeof b.categoryId === 'object' && b.categoryId?.name)
          || (typeof b.category === 'object' && b.category?.name)
          || (typeof b.categoryId === 'string' && b.categoryId)
          || (typeof b.category === 'string' && b.category)
          || "General";
        const mappedBlog = {
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
        setArticle(mappedBlog);
      }
    } catch (error) {
      console.error("Error fetching blog details:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!article) {
    // If not found, redirect to blog home or show 404. We'll fallback to blog home for safety.
    return <Navigate to="/blog" />;
  }

  const author = blogAuthors.find(a => a.id === article.authorId) || article.author;
  const previousPost = null;
  const nextPost = null;
  
  const isRecipe = article.tags && article.tags.includes('Recipes');

  return (
    <div className="bg-white min-h-screen relative pb-16 lg:pb-0">
      <BlogReadingProgress />
      <BlogShareBar />
      
      <BlogDetailsHero article={article} author={author} />
      <BlogBreadcrumb category={article.category} title={article.title} />

      <div className="container px-4 py-16">
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-16 max-w-7xl mx-auto lg:pl-20 relative">
          
          {/* Main Content Area */}
          <main className="w-full lg:flex-1 min-w-0">
            <BlogContent>
              {isRecipe && <RecipeWidget ingredients={recipeIngredientsDummy} />}
            </BlogContent>
            
            <BlogAuthorSection author={author} />
            <BlogNav previousPost={previousPost} nextPost={nextPost} />
            <BlogComments comments={blogCommentsDummy} />
            <BlogRelatedPosts articles={[]} />
          </main>

          {/* Sticky Sidebar */}
          <BlogSidebar author={author} />

        </div>
      </div>

      <BlogNewsletter />
    </div>
  );
};

export default BlogDetails;
