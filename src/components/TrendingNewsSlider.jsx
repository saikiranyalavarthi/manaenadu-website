import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import { Link } from "react-router-dom";

// HTML decode utility
const decodeHTML = (html) => {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

const TrendingNewsSlider = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await fetch(
          "https://manaenadu.com/wp-json/wp/v2/posts?_embed&orderby=date&order=desc&per_page=30"
        );
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error("Failed to load trending posts", err);
      }
    };
    fetchTrending();
  }, []);

  const getImage = (post) =>
    post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
    "https://via.placeholder.com/400x200?text=చిత్రం+లేదు";

  return (
    <div className="my-10 px-4">
      <h2 className="text-2xl font-bold mb-6 text-red-700 dark:text-red-400">
        ట్రెండింగ్ వార్తలు
      </h2>

      <Swiper
        spaceBetween={20}
        slidesPerView={1.2}
        breakpoints={{
          640: { slidesPerView: 2.2 },
          768: { slidesPerView: 3.2 },
          1024: { slidesPerView: 4.2 },
        }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        modules={[Autoplay]}
        loop
      >
        {posts.map((post) => (
          <SwiperSlide key={post.id}>
            <Link to={`/post/${post.id}`}>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 relative">
                {/* Trending Tag */}
                <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded shadow-md z-10">
                  TRENDING
                </div>

                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={getImage(post)}
                    alt={decodeHTML(post.title.rendered)}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>

                {/* Title */}
                <div className="p-4">
                  <h3 className="text-base font-semibold line-clamp-2 text-gray-800 dark:text-gray-100 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                    {decodeHTML(post.title.rendered)}
                  </h3>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TrendingNewsSlider;
