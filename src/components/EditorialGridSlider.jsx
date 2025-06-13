import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const EditorialGridSlider = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://manaenadu.com/wp-json/wp/v2/posts?_embed&orderby=date&order=desc&per_page=30"
      )
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  const getCategory = (post) => {
    return post._embedded?.["wp:term"]?.[0]?.[0]?.name || "Category";
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {posts.slice(0, 3).map((post) => (
            <Link to={`/post/${post.id}`} key={post.id}>
              <div className="bg-gray-100 p-3 rounded-lg shadow hover:shadow-md transition duration-200">
                <span className="text-red-600 uppercase text-xs font-bold block mb-2">
                  {getCategory(post)}
                </span>
                {post._embedded?.["wp:featuredmedia"]?.[0]?.source_url && (
                  <div className="aspect-video mb-2 overflow-hidden rounded">
                    <img
                      src={post._embedded["wp:featuredmedia"][0].source_url}
                      alt="featured"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <h2
                  className="text-sm md:text-base font-semibold line-clamp-2"
                  dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                />
              </div>
            </Link>
          ))}
        </div>

        {/* Middle Column */}
        <div className="space-y-6">
          {posts[3] && (
            <Link to={`/post/${posts[3].id}`}>
              <div className="bg-white p-4 rounded-lg shadow-lg border hover:shadow-xl transition duration-300">
                <span className="text-red-600 uppercase text-xs font-bold block mb-2">
                  {getCategory(posts[3])}
                </span>
                <div className="h-60 md:h-72 lg:h-96 mb-3 overflow-hidden rounded">
                  <img
                    src={
                      posts[3]._embedded?.["wp:featuredmedia"]?.[0]?.source_url
                    }
                    alt="highlighted"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2
                  className="text-lg md:text-xl font-bold mb-2"
                  dangerouslySetInnerHTML={{ __html: posts[3].title.rendered }}
                />
                <div
                  className="text-gray-600 text-sm line-clamp-3"
                  dangerouslySetInnerHTML={{
                    __html: posts[3].excerpt.rendered,
                  }}
                />
              </div>
            </Link>
          )}

          {/* Four Small Cards Below */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {posts.slice(4, 8).map((post) => (
              <Link to={`/post/${post.id}`} key={post.id}>
                <div className="bg-gray-50 p-3 rounded-lg shadow hover:shadow-md transition">
                  <span className="text-red-600 uppercase text-xs font-bold block mb-2">
                    {getCategory(post)}
                  </span>
                  {post._embedded?.["wp:featuredmedia"]?.[0]?.source_url && (
                    <div className="aspect-video mb-2 overflow-hidden rounded">
                      <img
                        src={post._embedded["wp:featuredmedia"][0].source_url}
                        alt="featured"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <h2
                    className="text-sm md:text-base font-semibold line-clamp-2"
                    dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {posts.slice(8, 11).map((post) => (
            <Link to={`/post/${post.id}`} key={post.id}>
              <div className="bg-gray-100 p-3 rounded-lg shadow hover:shadow-md transition">
                <span className="text-red-600 uppercase text-xs font-bold block mb-2">
                  {getCategory(post)}
                </span>
                {post._embedded?.["wp:featuredmedia"]?.[0]?.source_url && (
                  <div className="aspect-video mb-2 overflow-hidden rounded">
                    <img
                      src={post._embedded["wp:featuredmedia"][0].source_url}
                      alt="featured"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <h2
                  className="text-sm md:text-base font-semibold line-clamp-2"
                  dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditorialGridSlider;
