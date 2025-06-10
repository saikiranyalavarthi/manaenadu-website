import React from "react";
import SocialIcons from "./SocialIcons";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-48 h-12 mb-4" />
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
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  తెలంగాణ
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  ఆంధ్రప్రదేశ్
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  పాలిటిక్స్
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  సినిమాలు
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  క్రీడలు
                </a>
              </li>
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
          <p>© 2023 మన ఆంధ్ర ప్రదేశ్. అన్ని హక్కులు ప్రత్యేకించబడినవి.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
