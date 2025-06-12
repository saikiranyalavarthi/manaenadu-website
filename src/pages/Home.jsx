import React from "react";
import { useQuery } from "@tanstack/react-query";
import NewsCard from "../components/NewsCard";
import NewsTicker from "../components/NewsTicker";
import ThreeSectionNewsSliders from "../components/ThreeSectionNewsSliders";
import TrendingNewsSlider from "../components/TrendingNewsSlider";
import EditorialGridSlider from "../components/EditorialGridSlider";
import Newspostgrid from "../components/Newspostgrid";
import HorizontalPostSlider from "../components/HorizontalPostSlider";

const fetchPosts = async () => {
  const res = await fetch(
    "https://manaenadu.com/wp-json/wp/v2/posts?_embed&orderby=date&order=desc&per_page=30"
  );
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
};

const Home = () => {
  const {
    data: posts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  return (
    <div className="p-4 max-w-screen-xl mx-auto">
      {/* Header */}
      <header className="bg-gray-800 text-white py-6 px-6 rounded-lg mb-8">
        <h1 className="text-2xl md:text-3xl font-bold">మన ఈనాడు</h1>
        <p className="text-gray-300 text-sm">న్యూస్ తో నిష్పక్షపాతంగా</p>
      </header>

      {/* News ticker */}
      <NewsTicker />
      <ThreeSectionNewsSliders />

      {/* Latest News Title */}
      <section className="my-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">తాజా వార్తలు</h2>
        <p className="text-gray-700">
          తెలంగాణ మరియు ఆంధ్రప్రదేశ్ లోని అన్ని ముఖ్యమైన వార్తలు ఇక్కడే
        </p>
      </section>

      {/* Loading */}
      {isLoading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="text-center py-10">
          <div className="text-red-600 text-xl mb-4">
            Error: {error.message}
          </div>
          <p className="text-gray-700">
            వార్తలను పొందడంలో సమస్య ఏర్పడింది. దయచేసి కొంచెం సేపటి తర్వాత మళ్లీ
            ప్రయత్నించండి.
          </p>
        </div>
      )}

      {/* News Cards */}
      {!isLoading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {posts.map((post) => (
            <NewsCard key={post.id} post={post} />
          ))}
        </div>
      )}

      {/* Sliders */}
      <TrendingNewsSlider />
      <EditorialGridSlider />
      <HorizontalPostSlider />
      <Newspostgrid />
    </div>
  );
};

export default Home;
