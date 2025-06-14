import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FaCalendarAlt, FaClock, FaArrowLeft } from "react-icons/fa";
import SocialIcons from "../components/SocialIcons";

// Decode HTML entities
const decodeHTML = (html) => {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const [postResponse, relatedResponse] = await Promise.all([
          fetch(`https://manaenadu.com/wp-json/wp/v2/posts/${id}?_embed`),
          fetch(
            `https://manaenadu.com/wp-json/wp/v2/posts?per_page=3&exclude=${id}&_embed`
          ),
        ]);

        if (!postResponse.ok) throw new Error("Failed to fetch post");
        if (!relatedResponse.ok)
          throw new Error("Failed to fetch related posts");

        const postData = await postResponse.json();
        const relatedData = await relatedResponse.json();

        setPost(postData);
        setRelatedPosts(relatedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const res = await fetch(
          `https://manaenadu.com/wp-json/wp/v2/posts?per_page=5&_embed`
        );
        const data = await res.json();
        setRecentPosts(data);
      } catch (error) {
        console.error("Failed to fetch recent posts", error);
      }
    };

    fetchRecentPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <div className="text-red-600 text-xl mb-4">Error: {error}</div>
        <p className="text-gray-700">
          వార్తను పొందడంలో సమస్య ఏర్పడింది. దయచేసి కొంచెం సేపటి తర్వాత మళ్లీ
          ప్రయత్నించండి.
        </p>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("te-IN", options);
  };

  const formatTime = (dateString) => {
    const options = { hour: "2-digit", minute: "2-digit" };
    return new Date(dateString).toLocaleTimeString("te-IN", options);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Post Area */}
      <div className="lg:col-span-2">
        <Link
          to="/"
          className="inline-flex items-center text-red-600 hover:text-red-800 mb-6"
        >
          <FaArrowLeft className="mr-2" /> వెనుకకు
        </Link>

        <article className="bg-white rounded-lg shadow-md p-6 mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
            {decodeHTML(post.title.rendered)}
          </h1>

          <div className="flex items-center text-gray-500 text-sm mb-6">
            <div className="flex items-center mr-4">
              <FaCalendarAlt className="mr-1" />
              <span>{formatDate(post.date)}</span>
            </div>
            <div className="flex items-center">
              <FaClock className="mr-1" />
              <span>{formatTime(post.date)}</span>
            </div>
          </div>

          {post._embedded?.["wp:featuredmedia"]?.[0]?.source_url && (
            <div className="mb-8">
              <img
                src={post._embedded["wp:featuredmedia"][0].source_url}
                alt={decodeHTML(post.title.rendered)}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          )}

          <div
            className="post-content text-gray-700"
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          />

          <SocialIcons
            postUrl={`https://manaenadu.com/post/${post.slug}`}
            title={post.title.rendered}
          />
        </article>

        {/* Related Posts */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-gray-300">
            సంబంధిత వార్తలు
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((relatedPost) => (
              <div
                key={relatedPost.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <Link to={`/post/${relatedPost.id}`}>
                  <div className="h-48 overflow-hidden">
                    {relatedPost._embedded?.["wp:featuredmedia"]?.[0]
                      ?.source_url ? (
                      <img
                        src={
                          relatedPost._embedded["wp:featuredmedia"][0]
                            .source_url
                        }
                        alt={decodeHTML(relatedPost.title.rendered)}
                        className="w-full h-48 object-cover"
                      />
                    ) : (
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-full flex items-center justify-center text-gray-500">
                        చిత్రం లేదు
                      </div>
                    )}
                  </div>
                </Link>
                <div className="p-4">
                  <Link to={`/post/${relatedPost.id}`}>
                    <h3 className="text-lg font-bold mb-2 line-clamp-2 hover:text-red-600 transition-colors">
                      {decodeHTML(relatedPost.title.rendered)}
                    </h3>
                  </Link>
                  <div className="flex items-center text-gray-500 text-sm">
                    <FaCalendarAlt className="mr-1" />
                    <span>{formatDate(relatedPost.date)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sidebar - Recent Posts */}
      <aside className="bg-gray-100 rounded-lg shadow-md p-4 max-h-[600px] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-black">
          తాజా వార్తలు
        </h2>
        <ul className="space-y-4">
          {recentPosts.slice(0, 10).map((recent) => (
            <li
              key={recent.id}
              className="flex items-start gap-3 bg-white p-3 rounded-md shadow-sm hover:bg-red-50 transition-colors"
            >
              {/* Thumbnail */}
              {recent.featured_media_url && (
                <img
                  src={recent.featured_media_url}
                  alt={decodeHTML(recent.title.rendered)}
                  className="w-16 h-16 object-cover rounded"
                />
              )}

              {/* Title & Date */}
              <div>
                <Link
                  to={`/post/${recent.id}`}
                  className="text-gray-800 hover:text-red-600 font-semibold text-sm line-clamp-2"
                >
                  {decodeHTML(recent.title.rendered)}
                </Link>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(recent.date).toLocaleDateString("te-IN", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
};

export default PostPage;
