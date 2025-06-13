import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import he from "he"; // <-- import the library
import "./globals.css";

export default function NewsTicker() {
  const [newsItems, setNewsItems] = useState([]);

  useEffect(() => {
    const fetchHeadlines = async () => {
      try {
        const res = await axios.get(
          "https://manaenadu.com/wp-json/wp/v2/posts?per_page=10&_embed"
        );
        const items = res.data.map((post) => ({
          id: post.id,
          title: he.decode(post.title.rendered), // <-- decode title
          image:
            post._embedded?.["wp:featuredmedia"]?.[0]?.media_details?.sizes
              ?.thumbnail?.source_url || "https://via.placeholder.com/40",
        }));
        setNewsItems(items);
      } catch (error) {
        console.error("Error fetching headlines:", error);
      }
    };

    fetchHeadlines();
  }, []);

  return (
    <div className="w-full bg-gradient-to-r from-[#000066] to-[#990000] overflow-hidden m-2 border border-gray-200 rounded-md">
      <div className="marquee flex whitespace-nowrap items-center py-2 animate-marquee">
        {newsItems.map((item, idx) => (
          <Link
            key={idx}
            to={`/post/${item.id}`}
            className="flex items-center mx-6 shrink-0"
          >
            <img
              src={item.image}
              alt="thumbnail"
              className="w-8 h-8 rounded-full object-cover mr-2 border border-gray-300"
            />
            <span className="text-sm text-white hover:text-gray-300 hover:underline transition-colors">
              {item.title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
