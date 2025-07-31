import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('https://dummyjson.com/posts')
      .then((res) => {
        setPosts(res.data.posts);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const openModal = (post) => {
    setSelectedPost(post);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedPost(null);
    document.body.style.overflow = 'auto';
  };

  useEffect(() => {
    const escHandler = (e) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', escHandler);
    return () => window.removeEventListener('keydown', escHandler);
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return (
    <div className="max-w-screen-xl mx-auto px-4 py-10">
      <h2 className="text-4xl font-semibold text-center text-gray-800 dark:text-white mb-10 ">
        Posts list
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <div
            key={post.id}
            className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-zinc-800 shadow-sm hover:shadow-lg transition duration-300 p-6"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {post.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-3">
              {post.body}
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-1">
              👤 Author ID: {post.userId}
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500">
               Tags: {post.tags.join(', ')}
            </p>
        
          </div>
        ))}
      </div>

      {selectedPost && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg p-6 w-[90%] max-w-md relative animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-3 right-4 text-gray-400 hover:text-red-500 text-xl"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              {selectedPost.title}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              {selectedPost.body}
            </p>
            <p className="text-gray-600 dark:text-gray-400 mt-4 text-sm">
              🧑 Muallif ID: {selectedPost.userId}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
               Teglar: {selectedPost.tags.join(', ')}
            </p>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
               Reaksiyalar: {selectedPost.reactions}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Posts;
