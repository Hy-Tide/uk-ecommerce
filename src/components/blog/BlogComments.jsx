import React, { useState } from 'react';
import { FiMessageSquare, FiHeart, FiCornerDownRight, FiMoreHorizontal } from 'react-icons/fi';

const BlogComments = ({ comments }) => {
  const [newComment, setNewComment] = useState('');

  if (!comments) return null;

  return (
    <section className="mt-16 pt-16 border-t border-slate-100">
      
      <div className="flex items-center gap-3 mb-10">
        <h2 className="text-3xl font-black text-slate-800">Comments</h2>
        <span className="bg-[#2E8B57] text-white text-sm font-bold px-3 py-1 rounded-full">{comments.length}</span>
      </div>

      {/* Comment Form */}
      <div className="bg-[#FAFAF8] p-6 md:p-8 rounded-[24px] border border-slate-100 mb-12">
        <h3 className="font-bold text-slate-800 text-lg mb-4">Leave a Reply</h3>
        <textarea 
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Share your thoughts on this recipe or guide..."
          rows="4"
          className="w-full bg-white border border-slate-200 rounded-xl px-5 py-4 outline-none focus:border-[#2E8B57] focus:ring-4 focus:ring-[#2E8B57]/10 transition-all resize-none mb-4"
        ></textarea>
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-500 font-medium hidden sm:block">Sign in to comment easily</p>
          <button className="bg-[#2E8B57] hover:bg-[#236b43] text-white font-bold px-8 py-3 rounded-xl transition-all shadow-md shadow-[#2E8B57]/20 flex items-center gap-2">
            <FiMessageSquare /> Post Comment
          </button>
        </div>
      </div>

      {/* Comment List */}
      <div className="space-y-8">
        {comments.map((comment) => (
          <div key={comment.id} className="group">
            <div className="flex gap-4">
              <img src={comment.avatar} alt={comment.user} className="w-12 h-12 rounded-full object-cover shadow-sm flex-shrink-0" />
              <div className="flex-grow">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-slate-800">{comment.user}</h4>
                    {comment.isAuthor && (
                      <span className="bg-[#FF8A00] text-white text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">Author</span>
                    )}
                  </div>
                  <span className="text-xs font-bold text-slate-400">{comment.date}</span>
                </div>
                
                <p className="text-slate-600 font-medium leading-relaxed mb-3">
                  {comment.text}
                </p>

                <div className="flex items-center gap-6 text-sm font-bold text-slate-500">
                  <button className="flex items-center gap-1.5 hover:text-rose-500 transition-colors"><FiHeart /> {comment.likes}</button>
                  <button className="flex items-center gap-1.5 hover:text-[#2E8B57] transition-colors"><FiCornerDownRight /> Reply</button>
                  <button className="flex items-center gap-1.5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity hover:text-slate-800"><FiMoreHorizontal /> Report</button>
                </div>
              </div>
            </div>

            {/* Replies */}
            {comment.replies && comment.replies.length > 0 && (
              <div className="ml-12 sm:ml-16 mt-6 space-y-6 border-l-2 border-slate-100 pl-4 sm:pl-6">
                {comment.replies.map((reply) => (
                  <div key={reply.id} className="flex gap-4">
                    <img src={reply.avatar} alt={reply.user} className="w-10 h-10 rounded-full object-cover shadow-sm flex-shrink-0" />
                    <div className="flex-grow">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-slate-800">{reply.user}</h4>
                          {reply.isAuthor && (
                            <span className="bg-[#FF8A00] text-white text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">Author</span>
                          )}
                        </div>
                        <span className="text-xs font-bold text-slate-400">{reply.date}</span>
                      </div>
                      <p className="text-slate-600 font-medium leading-relaxed mb-3">{reply.text}</p>
                      <div className="flex items-center gap-6 text-sm font-bold text-slate-500">
                        <button className="flex items-center gap-1.5 hover:text-rose-500 transition-colors"><FiHeart /> {reply.likes}</button>
                        <button className="flex items-center gap-1.5 hover:text-[#2E8B57] transition-colors"><FiCornerDownRight /> Reply</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        ))}
      </div>
      
      <div className="mt-10 text-center">
        <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-6 py-2.5 rounded-xl transition-colors text-sm">
          Load More Comments
        </button>
      </div>

    </section>
  );
};

export default BlogComments;
