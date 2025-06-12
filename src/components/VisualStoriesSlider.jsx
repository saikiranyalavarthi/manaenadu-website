import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import he from "he";

const getImageUrl = (post) =>
  post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/fallback.jpg";

const VisualStoriesSlider = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("https://manaenadu.com/wp-json/wp/v2/posts?_embed&per_page=10")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("Error fetching posts", err));
  }, []);

  return (
    <div className="w-full px-4 py-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Visual Stories</h2>
        <span className="text-sm text-red-600 cursor-pointer">
          View All &gt;
        </span>
      </div>

      <Swiper
        slidesPerView={1.2}
        spaceBetween={10}
        breakpoints={{
          640: { slidesPerView: 2.2 },
          768: { slidesPerView: 3.2 },
          1024: { slidesPerView: 4.2 },
        }}
        navigation
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination]}
      >
        {posts.map((post) => (
          <SwiperSlide key={post.id}>
            <Link to={`/post/${post.id}`}>
              <div className="rounded-xl overflow-hidden shadow-md bg-white hover:shadow-lg transition duration-300">
                <img
                  src={getImageUrl(post)}
                  alt="story"
                  className="w-full h-80 object-cover"
                />
                <div className="p-3">
                  <h3 className="text-sm font-semibold line-clamp-2 hover:underline text-black">
                    {he.decode(post.title.rendered)}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 capitalize">
                    {post._embedded?.["wp:term"]?.[0]?.[0]?.name || "News"}
                  </p>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default VisualStoriesSlider;
