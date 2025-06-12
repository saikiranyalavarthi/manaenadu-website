import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import manaLogo from "../assets/mana.png";
import NewsTickerBar from "./NewsTickerBar";

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
    <header className="bg-white shadow-md sticky top-0 z-50">
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
      <NewsTickerBar />
      {/* Navbar */}
      <nav className="border-t border-gray-200 border-opacity-20  bg-blue-950">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-3">
            {/* Mobile menu button */}
            <button
              className="md:hidden text-white focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>

            {/* Desktop Navigation */}
            <ul className="hidden md:flex space-x-6  text-white px-4 py-2 rounded-lg">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link
                    to={`/category/${category.id}`}
                    className="inline-block  text-white  px-3 py-1 rounded-full text-sm font-medium hover:bg-red-600 hover:text-white transition-all duration-300 underline-offset-4 hover:underline"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Quick Links */}
            <div className="hidden md:flex items-center space-x-4">
              <span className="text-white font-medium">త్వరిత లింకులు:</span>
              <Link
                to="/"
                className="text-red-400 hover:text-white hover:underline transition duration-200"
              >
                హోమ్
              </Link>
              <Link
                to="/"
                className="text-red-400 hover:text-white hover:underline transition duration-200"
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
                      className="block py-2 px-4 text-white  hover:bg-red-600 rounded transition"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
                <li className="border-t border-gray-200 pt-3">
                  <Link
                    to="/"
                    className="block py-2 px-4 text-red-400 hover:text-white font-medium transition"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    హోమ్
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className="block py-2 px-4 text-red-400 hover:text-white font-medium transition"
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
// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { FaBars, FaTimes } from "react-icons/fa";
// import manaLogo from "../assets/mana.png";

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const categories = [
//     { id: "telangana", name: "తెలంగాణ" },
//     { id: "andhra", name: "ఆంధ్రప్రదేశ్" },
//     { id: "politics", name: "పాలిటిక్స్" },
//     { id: "cinema", name: "సినిమాలు" },
//     { id: "sports", name: "క్రీడలు" },
//     { id: "business", name: "బిజినెస్" },
//     { id: "crime", name: "క్రైమ్" },
//     { id: "education", name: "విద్య" },
//   ];

//   return (
//     <header className="bg-white shadow-md sticky top-0 z-50">
//       {/* Logo */}
//       <div className="flex justify-center py-3">
//         <Link to="/" className="w-64 h-16 flex items-center justify-center">
//           <img
//             src={manaLogo}
//             alt="Mana Logo"
//             className="h-16 object-contain"
//           />
//         </Link>
//       </div>

//       {/* Navbar */}
//       <nav className="border-t border-gray-200 bg-blue-950">
//         <div className="container mx-auto px-4">
//           <div className="flex justify-between items-center py-3">
//             {/* Mobile menu button */}
//             <button
//               className="md:hidden text-white focus:outline-none"
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//             >
//               {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
//             </button>

//             {/* Desktop Navigation */}
//             <ul className="hidden md:flex space-x-4 text-white text-sm font-medium">
//               {categories.map((category) => (
//                 <li key={category.id}>
//                   <Link
//                     to={`/category/${category.id}`}
//                     className="px-3 py-1 rounded hover:bg-red-600 transition"
//                   >
//                     {category.name}
//                   </Link>
//                 </li>
//               ))}
//             </ul>

//             {/* Quick Links */}
//             <div className="hidden md:flex items-center space-x-4">
//               <Link
//                 to="/"
//                 className="text-red-400 hover:text-white hover:underline transition"
//               >
//                 హోమ్
//               </Link>
//               <Link
//                 to="/latest"
//                 className="text-red-400 hover:text-white hover:underline transition"
//               >
//                 తాజా వార్తలు
//               </Link>
//             </div>
//           </div>

//           {/* Mobile Navigation */}
//           {isMenuOpen && (
//             <div className="md:hidden py-4">
//               <ul className="space-y-3 text-white">
//                 {categories.map((category) => (
//                   <li key={category.id}>
//                     <Link
//                       to={`/category/${category.id}`}
//                       className="block px-4 py-2 hover:bg-red-600 rounded transition"
//                       onClick={() => setIsMenuOpen(false)}
//                     >
//                       {category.name}
//                     </Link>
//                   </li>
//                 ))}
//                 <li className="border-t border-gray-600 pt-3">
//                   <Link
//                     to="/"
//                     className="block px-4 py-2 text-red-400 hover:text-white transition"
//                     onClick={() => setIsMenuOpen(false)}
//                   >
//                     హోమ్
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="/latest"
//                     className="block px-4 py-2 text-red-400 hover:text-white transition"
//                     onClick={() => setIsMenuOpen(false)}
//                   >
//                     తాజా వార్తలు
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//           )}
//         </div>
//       </nav>
//     </header>
//   );
// };

// export default Navbar;
