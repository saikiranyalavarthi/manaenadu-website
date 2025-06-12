import React, { useState, useEffect } from "react";
import NewsCard from "../components/NewsCard";
import NewsTicker from "../components/NewsTicker";
import ThreeSectionNewsSliders from "../components/ThreeSectionNewsSliders";
import TrendingNewsSlider from "../components/TrendingNewsSlider";
import EditorialGridSlider from "../components/EditorialGridSlider";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://manaenadu.com/wp-json/wp/v2/posts?_embed&orderby=date&order=desc&per_page=30"
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
    <div className="p-4">
      {/* Top Banner/Header */}
      <div className="mb-8">
        <div className="bg-gray-800 text-white py-6 px-6 rounded-lg">
          <h1 className="text-2xl md:text-3xl font-bold">మన ఈనాడు</h1>
          <p className="text-gray-300 text-sm">న్యూస్ తో నిష్పక్షపాతంగా</p>
        </div>
      </div>

      <NewsTicker />

      {/* Three Column Slider Layout */}
      <ThreeSectionNewsSliders />

      {/* 🆕 Title after sliders */}
      <div className="mb-6 mt-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">తాజా వార్తలు</h1>
        <p className="text-gray-700">
          తెలంగాణ మరియు ఆంధ్రప్రదేశ్ లోని అన్ని ముఖ్యమైన వార్తలు ఇక్కడే
        </p>
      </div>

      {/* Main News Grid */}
      <div className="flex flex-wrap -mx-2">
        {posts.map((post) => (
          <div
            key={post.id}
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 mb-4"
          >
            <NewsCard post={post} />
          </div>
        ))}
      </div>

      <TrendingNewsSlider />
      <EditorialGridSlider />
    </div>
  );
};

export default Home;
