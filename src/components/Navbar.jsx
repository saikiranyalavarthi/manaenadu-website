import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import manaLogo from "../assets/mana.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const categories = [
    { id: "telangana", name: "తెలంగాణ" },
    { id: "andhra", name: "ఆంధ్రప్రదేశ్" },
    { id: "politics", name: "పాలిటిక్స్" },
    { id: "cinema", name: "సినిమాలు" },
    { id: "sports", name: "క్రీడలు" },
    { id: "business", name: "బిజినెస్" },
    { id: "crime", name: "క్రైమ్" },
    { id: "education", name: "విద్య" },
  ];

  return (
    <header className="bg-white shadow-md">
      {/* Logo */}
      <div className="flex justify-center py-4">
        <div className="mt-1 w-64 h-16 flex items-center justify-center">
          <img
            src={manaLogo}
            alt="Mana Logo"
            className="h-30 w-300 object-contain"
          />
        </div>
      </div>

      {/* Navbar */}
      <nav className="border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-3">
            {/* Mobile menu button */}
            <button
              className="md:hidden text-gray-700 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>

            {/* Desktop Navigation */}
            <ul className="hidden md:flex space-x-6">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link
                    to={`/category/${category.id}`}
                    className="text-gray-700 hover:text-red-600 font-medium transition-colors duration-300"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Quick Links */}
            <div className="hidden md:flex items-center space-x-4">
              <span className="text-gray-600 font-medium">త్వరిత లింకులు:</span>
              <Link to="/" className="text-red-600 hover:underline">
                హోమ్
              </Link>
              <Link
                to="/category/latest"
                className="text-red-600 hover:underline"
              >
                తాజా వార్తలు
              </Link>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4">
              <ul className="space-y-3">
                {categories.map((category) => (
                  <li key={category.id}>
                    <Link
                      to={`/category/${category.id}`}
                      className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
                <li className="border-t border-gray-200 pt-3">
                  <Link
                    to="/"
                    className="block py-2 px-4 text-red-600 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    హోమ్
                  </Link>
                </li>
                <li>
                  <Link
                    to="/category/latest"
                    className="block py-2 px-4 text-red-600 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    తాజా వార్తలు
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
