import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NewsCard from "../components/NewsCard";

const CategoryPage = () => {
  const { categoryId } = useParams();
  const [posts, setPosts] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Map category IDs to Telugu names
  const categoryNames = {
    telangana: "తెలంగాణ",
    andhra: "ఆంధ్రప్రదేశ్",
    politics: "పాలిటిక్స్",
    cinema: "సినిమాలు",
    sports: "క్రీడలు",
    business: "బిజినెస్",
    crime: "క్రైమ్",
    education: "విద్య",
    latest: "తాజా వార్తలు",
  };

  useEffect(() => {
    const fetchCategoryPosts = async () => {
      try {
        setLoading(true);

        // Set category name based on ID
        setCategoryName(categoryNames[categoryId] || categoryId);

        // For demo purposes, we'll use the same API endpoint
        // const response = await fetch(
        //   `https://manaenadu.com/wp-json/wp/v2/posts?per_page=9`
        // );

        const response = await fetch(
          `https://manaenadu.com/wp-json/wp/v2/posts?_embed&orderby=date&order=desc&per_page=20`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }

        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryPosts();
  }, [categoryId]);

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
          వార్తలను పొందడంలో సమస్య ఏర్పడింది. దయచేసి కొంచెం సేపటి తర్వాత మళ్లీ
          ప్రయత్నించండి.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <div className="bg-red-600 text-white py-6 px-6 rounded-lg">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            {categoryName}
          </h1>
          <p className="text-red-100">వర్గం: {categoryName} వార్తలు</p>
        </div>
      </div>

      <div className="news-grid">
        {posts.map((post) => (
          <NewsCard key={post.id} post={post} />
        ))}
      </div>

      <div className="mt-10 text-center">
        <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full transition-colors duration-300">
          ఇంకా వార్తలు చూడండి
        </button>
      </div>
    </div>
  );
};

export default CategoryPage;
