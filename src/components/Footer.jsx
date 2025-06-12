import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SocialIcons from "./SocialIcons";
import manaLogo from "../assets/mana.png";

const categories = [
  { name: "తెలంగాణ", href: "/category/telangana" },
  { name: "ఆంధ్రప్రదేశ్", href: "/category/andhra" },
  { name: "పాలిటిక్స్", href: "/category/politics" },
  { name: "సినిమాలు", href: "/category/cinema" },
  { name: "క్రీడలు", href: "/category/sports" },
  { name: "బిజినెస్", href: "/category/business" },
  { name: "జాతీయం", href: "/category/national" },
  { name: "అంతర్జాతీయం", href: "/category/international" },
];

const Footer = () => {
  const [latestPosts, setLatestPosts] = useState([]);

  useEffect(() => {
    const fetchLatestPosts = async () => {
      try {
        const res = await fetch(
          "https://manaenadu.com/wp-json/wp/v2/posts?_embed&per_page=5&orderby=date&order=desc"
        );
        const data = await res.json();
        setLatestPosts(data);
      } catch (error) {
        console.error("Failed to fetch latest news", error);
      }
    };

    fetchLatestPosts();
  }, []);

  const getTitle = (post) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = post.title.rendered;
    return txt.value;
  };

  return (
    <footer className="bg-[#251c48] text-white py-10 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Column 1 - Logo and text */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-red-500 text-xl">➤</span>
            <span className="font-bold text-xl">Mana Enadu</span>
          </div>
          <p className="text-sm text-gray-300">
            Thank you for considering our website. We are excited about the
            potential collaboration and look forward to the opportunity to
            discuss further details.
            <br />
            Email Address:
            <br />
            <strong>contact@manaenadu.com</strong>
          </p>
          <img src={manaLogo} alt="" className="w-60 h-36 object-cover" />
        </div>

        {/* Column 2 - Quick Links */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-red-500 text-xl">➤</span>
            <span className="font-bold text-xl">Quick Links</span>
          </div>
          <ul className="space-y-2 text-sm">
            {categories.map((cat) => (
              <li key={cat.name}>
                <Link
                  to={cat.href}
                  className="flex items-center gap-2 text-gray-300 hover:underline hover:text-red-400"
                >
                  <span className="text-red-500">➤</span>
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3 - Latest News */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-red-500 text-xl">➤</span>
            <span className="font-bold text-xl">The latest</span>
          </div>
          <ul className="space-y-3 text-sm">
            {latestPosts.map((post) => (
              <li key={post.id}>
                <Link
                  to={`/post/${post.id}`}
                  className="hover:underline hover:text-red-300"
                >
                  {getTitle(post).slice(0, 90)}...
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="text-center text-gray-400 text-sm pt-6 border-t border-gray-700 mt-10">
        © 2025 మన ఈనాడు. అన్ని హక్కులు ప్రత్యేకించబడినవి.
      </div>
      <SocialIcons postUrl="https://manaenadu.com" title="Mana Enadu" />
    </footer>
  );
};

export default Footer;
