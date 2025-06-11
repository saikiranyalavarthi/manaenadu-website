import React from "react";
import NewsCard from "./NewsCard";

const NewsGrid = ({ posts }) => {
  return (
    <div className="flex flex-wrap -mx-2">
      {posts.map((post) => (
        <div
          key={post.id}
          className="px-2 mb-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
        >
          <NewsCard post={post} />
        </div>
      ))}
    </div>
  );
};

export default NewsGrid;
