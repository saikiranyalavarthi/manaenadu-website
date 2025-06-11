import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FaCalendarAlt, FaClock, FaArrowLeft } from "react-icons/fa";

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);

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

  return (
    <div>
      <Link
        to="/"
        className="inline-flex items-center text-red-600 hover:text-red-800 mb-6"
      >
        <FaArrowLeft className="mr-2" /> వెనుకకు
      </Link>

      <article className="bg-white rounded-lg shadow-md p-6 mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
          {post.title.rendered}
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
              alt={post.title.rendered}
              className="w-250 h-140 object-cover rounded-t-lg"
            />
          </div>
        )}

        <div
          className="post-content text-gray-700"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />
      </article>

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
                        relatedPost._embedded["wp:featuredmedia"][0].source_url
                      }
                      alt={relatedPost.title.rendered}
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
                    {relatedPost.title.rendered}
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
  );
};

export default PostPage;
