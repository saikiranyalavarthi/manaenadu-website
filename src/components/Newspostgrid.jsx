import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Newspostgrid = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(
      "https://manaenadu.com/wp-json/wp/v2/posts?_embed&orderby=date&order=desc&per_page=30"
    )
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("Error:", err));
  }, []);

  const getImage = (post) =>
    post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/fallback.jpg";

  const truncate = (str, len) =>
    str.length > len ? str.substring(0, len) + "..." : str;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4 max-w-7xl mx-auto">
      {/* Column 1 */}
      <div className="space-y-4">
        {posts[0] && (
          <Link
            to={`/post/${posts[0].id}`}
            className="block shadow rounded overflow-hidden"
          >
            <img
              src={getImage(posts[0])}
              className="h-64 w-full object-cover"
            />
            <div
              className="p-4 font-bold text-lg text-gray-800"
              dangerouslySetInnerHTML={{ __html: posts[0].title.rendered }}
            />
          </Link>
        )}
        <div className="grid grid-cols-1 gap-4">
          {posts.slice(1, 3).map((post) => (
            <Link
              key={post.id}
              to={`/post/${post.id}`}
              className="flex shadow rounded overflow-hidden"
            >
              <img src={getImage(post)} className="w-32 h-24 object-cover" />
              <div
                className="p-2 text-sm font-medium"
                dangerouslySetInnerHTML={{
                  __html: truncate(post.title.rendered, 60),
                }}
              />
            </Link>
          ))}
        </div>
      </div>

      {/* Column 2 */}
      <div className="space-y-3">
        <h2 className="text-xl font-bold border-b-4 border-red-600 inline-block pb-1 text-red-700">
          తాజా వార్తలు
        </h2>
        <ul className="space-y-2">
          {posts.slice(3, 10).map((post) => (
            <li key={post.id} className="hover:underline text-gray-700">
              <Link
                to={`/post/${post.id}`}
                dangerouslySetInnerHTML={{
                  __html: truncate(post.title.rendered, 80),
                }}
              />
            </li>
          ))}
        </ul>
      </div>

      {/* Column 3 */}
      <div className="grid grid-cols-1 gap-4">
        {[...Array(3)].map((_, i) => (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3" key={i}>
            {posts.slice(10 + i * 3, 13 + i * 3).map((post) => (
              <Link
                key={post.id}
                to={`/post/${post.id}`}
                className="shadow rounded overflow-hidden"
              >
                <img
                  src={getImage(post)}
                  className="h-24 w-full object-cover"
                />
                <div className="p-2">
                  <h3
                    className="text-sm font-semibold"
                    dangerouslySetInnerHTML={{
                      __html: truncate(post.title.rendered, 40),
                    }}
                  />
                  <p className="text-xs text-gray-500">
                    {truncate(
                      post.excerpt?.rendered.replace(/<[^>]+>/g, ""),
                      50
                    )}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Newspostgrid;
