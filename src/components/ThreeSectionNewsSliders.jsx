import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ThreeSectionNewsSliders() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(
          "https://manaenadu.com/wp-json/wp/v2/posts?_embed&orderby=date&order=desc&per_page=20"
        );
        const mapped = res.data.map((post) => ({
          id: post.id,
          title: post.title.rendered,
          slug: post.slug,
          image:
            post._embedded?.["wp:featuredmedia"]?.[0]?.media_details?.sizes
              ?.medium?.source_url || "https://via.placeholder.com/150",
        }));
        setPosts(mapped);
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };
    fetchPosts();
  }, []);

  const todayUpdate = posts.slice(0, 5);
  const mainStory = posts.slice(5, 10);
  const todayPosts = posts.slice(10, 15);

  const renderSlider = (title, items, color) => (
    <div className="mb-6">
      <h2 className={`text-lg font-bold mb-3 text-${color}-600`}>{title}</h2>
      <div className="relative">
        <div className="flex gap-4 overflow-x-auto scrollbar-hide transition-all">
          {items.map((post) => (
            <Link
              to={`/post/${post.id}`}
              key={post.id}
              className="min-w-[220px] bg-white border rounded-md shadow hover:shadow-xl transition hover:scale-105 duration-300"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-36 object-cover rounded-t"
              />
              <p
                className={`p-2 text-sm text-gray-800 hover:text-${color}-600 hover:underline`}
              >
                {post.title}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-4 bg-gray-50">
      {renderSlider("Today Update", todayUpdate, "red")}
      {renderSlider("Main Story", mainStory, "blue")}
      {renderSlider("Today Posts", todayPosts, "green")}
    </div>
  );
}
