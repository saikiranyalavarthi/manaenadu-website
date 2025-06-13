import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import he from "he"; // Import HTML entity decoder

// Category -> Tailwind color mapping
const getCategoryColor = (category) => {
  switch (category.toLowerCase()) {
    case "travel":
      return "bg-green-500";
    case "interview":
      return "bg-yellow-500";
    case "food":
      return "bg-pink-500";
    case "culture":
      return "bg-blue-600";
    default:
      return "bg-red-500";
  }
};

export default function ThreeSectionNewsSliders() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(
          "https://manaenadu.com/wp-json/wp/v2/posts?_embed&orderby=date&order=desc&per_page=10"
        );

        const mapped = res.data.map((post) => ({
          id: post.id,
          title: he.decode(post.title.rendered), // Decode HTML entities
          slug: post.slug,
          image:
            post._embedded?.["wp:featuredmedia"]?.[0]?.media_details?.sizes
              ?.medium_large?.source_url ||
            post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
            "https://via.placeholder.com/600x400",
          category: post._embedded?.["wp:term"]?.[0]?.[0]?.name || "News",
          date: new Date(post.date).toLocaleDateString("en-IN", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          author: post._embedded?.author?.[0]?.name || "Unknown",
        }));

        setPosts(mapped);
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };

    fetchPosts();
  }, []);

  if (posts.length < 4) return <div className="p-4">Loading...</div>;

  const featured = posts[0];
  const sidePosts = posts.slice(1, 4);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Featured Post */}
        <Link
          to={`/post/${featured.id}`}
          className="relative group col-span-2 overflow-hidden rounded-lg shadow-lg"
        >
          <img
            src={featured.image}
            alt={featured.title}
            className="w-full h-135 object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-transparent to-transparent p-4 text-white">
            <span
              className={`text-sm px-2 py-1 rounded font-semibold ${getCategoryColor(
                featured.category
              )}`}
            >
              {featured.category}
            </span>
            <h2 className="text-xl font-bold mt-2 line-clamp-2">
              {featured.title}
            </h2>
            <div className="text-sm mt-1">
              {featured.author} • {featured.date}
            </div>
          </div>
        </Link>

        {/* Right-side Smaller Posts */}
        <div className="grid grid-rows-3 gap-4">
          {sidePosts.map((post) => (
            <Link
              key={post.id}
              to={`/post/${post.id}`}
              className="relative group overflow-hidden rounded-lg shadow-md"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-45 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-transparent to-transparent p-2 ">
                <span
                  className={`text-xs px-2 py-0.5 rounded font-semibold uppercase ${getCategoryColor(
                    post.category
                  )}`}
                >
                  {post.category}
                </span>
                <h3 className="text-sm font-bold line-clamp-2 text-white">
                  {post.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
