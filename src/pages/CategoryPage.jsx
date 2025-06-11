import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NewsCard from "../components/NewsCard";

const CategoryPage = () => {
  const { categoryId } = useParams();
  const [posts, setPosts] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Aliases for alternative slugs
  const slugAliases = {
    andhra: "andhra-pradesh",
    cinema: "movies",
  };

  // Telugu category display names
  const categoryNames = {
    telangana: "తెలంగాణ",
    "andhra-pradesh": "ఆంధ్రప్రదేశ్",
    politics: "పాలిటిక్స్",
    movies: "సినిమాలు",
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
        setError(null);

        const actualSlug = slugAliases[categoryId] || categoryId;

        // 1. Load all categories
        const catRes = await fetch(
          "https://manaenadu.com/wp-json/wp/v2/categories?per_page=100"
        );
        const categories = await catRes.json();

        // 2. Match slug
        const matchedCat = categories.find((c) => c.slug === actualSlug);

        if (!matchedCat) {
          setError(`Category "${actualSlug}" not found`);
          return;
        }

        setCategoryName(categoryNames[actualSlug] || matchedCat.name);

        // 3. Fetch posts for this category
        const postsRes = await fetch(
          `https://manaenadu.com/wp-json/wp/v2/posts?_embed&categories=${matchedCat.id}&per_page=20&orderby=date&order=desc`
        );

        if (!postsRes.ok) {
          throw new Error("Failed to fetch posts");
        }

        const postsData = await postsRes.json();
        setPosts(postsData);
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
    <div className="p-4">
      <div className="mb-8">
        <div className="bg-red-600 text-white py-6 px-6 rounded-lg">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            {categoryName}
          </h1>
          <p className="text-red-100">వర్గం: {categoryName} వార్తలు</p>
        </div>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {posts.length > 0 ? (
          posts.map((post) => <NewsCard key={post.id} post={post} />)
        ) : (
          <p className="col-span-full text-center text-gray-600">
            ఈ వర్గంలో వార్తలు ఇప్పటికీ అందుబాటులో లేవు.
          </p>
        )}
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
