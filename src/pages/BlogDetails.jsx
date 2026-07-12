import React, { useEffect } from 'react';
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

import { blogArticles, blogAuthors, recipeIngredientsDummy, blogCommentsDummy } from '../data/blogData';

const BlogDetails = () => {
  const { slug } = useParams();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Find current article
  const articleIndex = blogArticles.findIndex(a => a.slug === slug);
  const article = blogArticles[articleIndex];

  if (!article) {
    // If not found, redirect to blog home or show 404. We'll fallback to blog home for safety.
    return <Navigate to="/blog" />;
  }

  const author = blogAuthors.find(a => a.id === article.authorId);
  const previousPost = articleIndex > 0 ? blogArticles[articleIndex - 1] : null;
  const nextPost = articleIndex < blogArticles.length - 1 ? blogArticles[articleIndex + 1] : null;
  
  const isRecipe = article.category === 'Recipes';

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
            <BlogRelatedPosts articles={blogArticles} />
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
