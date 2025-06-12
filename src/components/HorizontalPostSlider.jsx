import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

const HorizontalPostSlider = () => {
  const [posts, setPosts] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    fetch(
      "https://manaenadu.com/wp-json/wp/v2/posts?_embed&orderby=date&order=desc&per_page=15"
    )
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("Failed to fetch trending posts", err));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollLeft += 250;
        // reset if end reached
        if (
          scrollRef.current.scrollLeft + scrollRef.current.offsetWidth >=
          scrollRef.current.scrollWidth
        ) {
          scrollRef.current.scrollLeft = 0;
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getImage = (post) =>
    post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/fallback.jpg";

  const truncate = (text, len) =>
    text.length > len ? text.substring(0, len) + "..." : text;

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-3 text-red-600 border-b-2 border-red-500 inline-block">
        📢 Latest Now
      </h2>
      <div
        ref={scrollRef}
        className="flex overflow-x-auto space-x-4 scrollbar-hide snap-x"
      >
        {posts.map((post) => (
          <Link
            key={post.id}
            to={`/post/${post.id}`}
            className="min-w-[250px] max-w-[250px] bg-white rounded shadow hover:shadow-md flex-shrink-0 snap-start"
          >
            <img
              src={getImage(post)}
              alt="post"
              className="h-36 w-full object-cover rounded-t"
            />
            <div className="p-2">
              <h3
                className="text-sm font-semibold"
                dangerouslySetInnerHTML={{
                  __html: truncate(post.title.rendered, 60),
                }}
              />
              <p className="text-xs text-gray-500 mt-1">
                {truncate(post.excerpt?.rendered.replace(/<[^>]+>/g, ""), 60)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HorizontalPostSlider;
