import React from "react";
import { Link } from "react-router-dom";
import { FaCalendarAlt, FaClock } from "react-icons/fa";

const NewsCard = ({ post }) => {
  // Format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("te-IN", options);
  };

  // Format time
  const formatTime = (dateString) => {
    const options = { hour: "2-digit", minute: "2-digit" };
    return new Date(dateString).toLocaleTimeString("te-IN", options);
  };

  // Resolve image URL
  const imageUrl =
    post.jetpack_featured_media_url ||
    post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
    "https://via.placeholder.com/400x200?text=చిత్రం+లేదు"; // fallback

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link to={`/post/${post.id}`}>
        <div className="relative h-48 overflow-hidden">
          <img
            src={imageUrl}
            alt={post.title.rendered}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />

          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
            <h3 className="text-white text-lg font-bold line-clamp-2">
              {post.title.rendered}
            </h3>
          </div>
        </div>
      </Link>

      <div className="p-4">
        <div className="flex items-center text-gray-500 text-sm mb-3">
          <div className="flex items-center mr-4">
            <FaCalendarAlt className="mr-1" />
            <span>{formatDate(post.date)}</span>
          </div>
          <div className="flex items-center">
            <FaClock className="mr-1" />
            <span>{formatTime(post.date)}</span>
          </div>
        </div>

        <div
          className="text-gray-700 line-clamp-3 mb-4"
          dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
        />

        <Link
          to={`/post/${post.id}`}
          className="inline-block text-red-600 font-medium hover:text-red-800 hover:underline transition-colors"
        >
          మరింత చదవండి
        </Link>
      </div>
    </div>
  );
};

export default NewsCard;
