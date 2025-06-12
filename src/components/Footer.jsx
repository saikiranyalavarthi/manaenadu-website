import React from "react";
import SocialIcons from "./SocialIcons";
import manaLogo from "../assets/mana.png";

const categories = [
  { name: "తెలంగాణ", href: "/category/telangana" },
  { name: "ఆంధ్రప్రదేశ్", href: "/category/andhra-pradesh" },
  { name: "పాలిటిక్స్", href: "/category/politics" },
  { name: "సినిమాలు", href: "/category/movies" },
  { name: "క్రీడలు", href: "/category/sports" },
  { name: "బిజినెస్", href: "/category/business" },
  { name: "జాతీయం", href: "/category/national" },
  { name: "అంతర్జాతీయం", href: "/category/international" },
];

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <img
              src={manaLogo} // Update this path to your actual logo image location
              alt="మన లোগో"
              className="w-65 h-25 object-contain mb-4"
            />

            <p className="text-gray-300 mb-4">
              మీకు అవసరమైన అన్ని తాజా వార్తలు, విశ్లేషణలు మరియు సమాచారం ఒకే చోట.
            </p>
            <SocialIcons />
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 border-b border-gray-700 pb-2">
              వర్గాలు
            </h3>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat.name}>
                  <a
                    href={cat.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {cat.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 border-b border-gray-700 pb-2">
              లింకులు
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  గోప్యతా విధానం
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  వాడుక నియమాలు
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  సంప్రదింపు
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  మా గురించి
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>© 2025 మన ఈనాడు. అన్ని హక్కులు ప్రత్యేకించబడినవి.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
