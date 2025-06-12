import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const TailwindGridExample = () => {
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
    <div className="p-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left Column */}
        <div className="space-y-4">
          {posts.slice(0, 3).map((post) => (
            <Link to={`/post/${post.id}`} key={post.id}>
              <div className="bg-gray-100 p-3 rounded shadow hover:shadow-md">
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
                  className="text-sm font-semibold line-clamp-2"
                  dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                />
              </div>
            </Link>
          ))}
        </div>

        {/* Middle Column */}
        <div className="space-y-4">
          {posts[3] && (
            <Link to={`/post/${posts[3].id}`}>
              <div className="bg-white p-4 rounded shadow-lg border">
                <span className="text-red-600 uppercase text-xs font-bold block mb-2">
                  {getCategory(posts[3])}
                </span>
                <div className="h-64 md:h-80 lg:h-96 mb-3 overflow-hidden rounded">
                  <img
                    src={
                      posts[3]._embedded?.["wp:featuredmedia"]?.[0]?.source_url
                    }
                    alt="highlighted"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2
                  className="text-xl font-bold mb-2"
                  dangerouslySetInnerHTML={{ __html: posts[3].title.rendered }}
                />
                <div
                  className="text-gray-600 line-clamp-3"
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
                <div className="bg-gray-50 p-3 rounded shadow hover:shadow-md">
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
                    className="text-sm font-semibold line-clamp-2"
                    dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          {posts.slice(8, 11).map((post) => (
            <Link to={`/post/${post.id}`} key={post.id}>
              <div className="bg-gray-100 p-3 rounded shadow hover:shadow-md">
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
                  className="text-sm font-semibold line-clamp-2"
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

export default TailwindGridExample;
