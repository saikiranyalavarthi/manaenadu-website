import React, { useState, useEffect } from "react";
import NewsCard from "../components/NewsCard";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://manaenadu.com/wp-json/wp/v2/posts?per_page=9"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }

        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <div className="text-red-600 text-xl mb-4">Error: {error}</div>
        <p className="text-gray-700">
          వార్తలను పొందడంలో సమస్య ఏర్పడింది. దయచేసి కొంచెం సేపటి తర్వాత మళ్లీ
          ప్రయత్నించండి.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <div className="bg-gray-800 text-white py-6 px-6 rounded-lg">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">తాజా వార్తలు</h1>
          <p className="text-gray-300">
            తెలంగాణ మరియు ఆంధ్రప్రదేశ్ లోని అన్ని ముఖ్యమైన వార్తలు ఇక్కడే
          </p>
        </div>
      </div>

      <div className="news-grid">
        {posts.map((post) => (
          <NewsCard key={post.id} post={post} />
        ))}
      </div>

      <div className="mt-10 text-center">
        <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full transition-colors duration-300">
          ఇంకా వార్తలు చూడండి
        </button>
      </div>
    </div>
  );
};

export default Home;
