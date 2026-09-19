import React from 'react';
import { blogService } from '../../services/blogService';

interface BlogViewProps {
  onBackToHome: () => void;
}

export const BlogView: React.FC<BlogViewProps> = ({ onBackToHome }) => {
  const posts = blogService.getPosts();

  return (
    <div className="w-full px-4 sm:px-6 md:px-10 lg:px-14 xl:px-20 2xl:px-24 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-white">LoveConnect Cyber Journal</h1>
          <p className="text-sm text-pink-200">Insights, science of attraction, and modern dating stories</p>
        </div>
        <button
          onClick={onBackToHome}
          className="text-xs font-bold text-pink-400 hover:text-pink-300 transition-colors cursor-pointer"
        >
          ← Back to Home
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <article
            key={post.id}
            className="bg-[#160a2f] border border-pink-500/20 rounded-3xl p-6 space-y-3 hover:border-pink-400/40 transition-colors"
          >
            <span className="text-xs font-bold text-pink-400 bg-pink-500/10 px-2.5 py-1 rounded-full inline-block">
              {post.category}
            </span>
            <h2 className="text-xl font-bold text-white leading-snug">{post.title}</h2>
            <p className="text-xs text-gray-300 leading-relaxed">{post.description}</p>
          </article>
        ))}
      </div>
    </div>
  );
};
