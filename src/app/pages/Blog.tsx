import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';

type BlogPost = {
  id: string;
  title: string;
  summary: string;
  content: string;
  author: string;
  image?: string;
  createdAt?: string;
  date?: string;
};

const API_BASE = (import.meta.env?.VITE_API_URL as string | undefined) || 'http://localhost:5000';

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        setIsLoading(true);
        setLoadError('');
        const response = await fetch(`${API_BASE}/api/blogs`);
        if (!response.ok) {
          throw new Error('Failed to fetch blogs');
        }
        const data = await response.json();
        const normalized = (data as any[]).map((post) => ({
          id: post._id || post.id,
          title: post.title || '',
          summary: post.summary || '',
          content: post.content || '',
          author: post.author || 'Hotel Team',
          image: post.image || '',
          createdAt: post.createdAt,
          date: post.date,
        }));
        setPosts(normalized);
      } catch (error) {
        setLoadError(error instanceof Error ? error.message : 'Unable to load blogs');
      } finally {
        setIsLoading(false);
      }
    };

    loadBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-[#3f4a40] text-[#efece6] pt-10">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>Hotel Blog</h1>
        <p className="mb-10 text-[#c9c3b6]">Stories, tips, and news from On Earth Hotel</p>
        {isLoading && (
          <div className="rounded-2xl border border-[#5b6659] bg-[#2f3a32]/90 p-6 text-[#c9c3b6]">
            Loading blog posts...
          </div>
        )}
        {!isLoading && loadError && (
          <div className="rounded-2xl border border-red-400/40 bg-[#3a2f2f] p-6 text-red-200">
            {loadError}
          </div>
        )}
        {!isLoading && !loadError && posts.length === 0 && (
          <div className="rounded-2xl border border-[#5b6659] bg-[#2f3a32]/90 p-6 text-[#c9c3b6]">
            No blog posts available yet.
          </div>
        )}
        <div className="space-y-8">
          {posts.map((post) => (
            <div key={post.id} className="rounded-2xl border border-[#5b6659] bg-[#2f3a32]/90 p-8 shadow-lg">
              {post.image && (
                <img
                  src={`${API_BASE}${post.image}`}
                  alt={post.title}
                  className="w-full h-56 object-cover rounded-xl mb-4 border border-[#5b6659]"
                />
              )}
              <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
              <div className="text-xs text-[#b6b6b6] mb-3">
                By {post.author} | {new Date(post.createdAt || post.date || Date.now()).toLocaleDateString()}
              </div>
              <p className="mb-4 text-[#efece6]">{post.summary}</p>
              {post.content && (
                <details className="text-[#c9c3b6]">
                  <summary className="cursor-pointer text-amber-400 hover:underline">Read More</summary>
                  <p className="mt-3 whitespace-pre-wrap leading-relaxed">{post.content}</p>
                </details>
              )}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Blog;
