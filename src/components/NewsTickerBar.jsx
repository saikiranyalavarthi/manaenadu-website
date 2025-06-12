import React, { useEffect, useState } from "react";
import { FaCalendarAlt, FaFire } from "react-icons/fa";
import { Link } from "react-router-dom";
import he from "he";

const NewsTickerBar = () => {
  const [latestPosts, setLatestPosts] = useState([]);
  const [currentPostIndex, setCurrentPostIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    fetch("https://manaenadu.com/wp-json/wp/v2/posts?_embed&per_page=10")
      .then((res) => res.json())
      .then((data) => {
        setLatestPosts(data);
      })
      .catch((err) => console.error("Error fetching latest posts", err));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPostIndex((prevIndex) =>
        latestPosts.length > 0 ? (prevIndex + 1) % latestPosts.length : 0
      );
    }, 4000);
    return () => clearInterval(interval);
  }, [latestPosts]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (date) =>
    date.toLocaleTimeString("en-US", { hour12: true });

  const formatDate = (date) =>
    date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  return (
    <div className="bg-red-700 text-white px-4 py-2 text-sm overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        {/* Trending Label */}
        <div className="flex items-center bg-red-900 px-2 py-1 rounded w-fit">
          <FaFire className="mr-1 text-orange-400" />
          <span className="font-bold text-sm sm:text-base">Trending News:</span>
        </div>

        {/* Ticker Title */}
        <div className="flex-1 text-center overflow-hidden">
          {latestPosts.length > 0 && (
            <Link
              to={`/post/${latestPosts[currentPostIndex].id}`}
              className="fade-animation font-semibold hover:underline hover:text-yellow-300 transition duration-300 block truncate text-sm sm:text-base"
            >
              {he.decode(latestPosts[currentPostIndex].title.rendered)}
            </Link>
          )}
        </div>

        {/* Date + Time */}
        <div className="flex items-center justify-end space-x-2 text-xs sm:text-sm">
          <FaCalendarAlt className="text-white" />
          <span className="hidden sm:inline">{formatDate(currentTime)}</span>
          <span className="bg-red-900 font-bold px-2 py-1 rounded">
            {formatTime(currentTime)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default NewsTickerBar;
