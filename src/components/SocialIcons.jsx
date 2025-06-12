import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaWhatsapp,
  FaLinkedin,
  FaPinterest,
  FaSnapchatGhost,
} from "react-icons/fa";
import { SiTelegram, SiGmail, SiThreads } from "react-icons/si";
import { IoShareSocial } from "react-icons/io5";

const SocialIcons = () => {
  return (
    <div className="flex flex-wrap gap-3 m-2">
      <a
        href="https://facebook.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-800"
      >
        <FaFacebook size={28} />
      </a>
      <a
        href="https://wa.me/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-green-500 hover:text-green-700"
      >
        <FaWhatsapp size={28} />
      </a>
      <a
        href="https://telegram.org/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-sky-400 hover:text-sky-600"
      >
        <SiTelegram size={28} />
      </a>
      <a
        href="https://twitter.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-sky-500 hover:text-sky-700"
      >
        <FaTwitter size={28} />
      </a>
      <a
        href="https://linkedin.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-700 hover:text-blue-900"
      >
        <FaLinkedin size={28} />
      </a>
      <a
        href="https://pinterest.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-red-600 hover:text-red-800"
      >
        <FaPinterest size={28} />
      </a>
      <a
        href="mailto:someone@example.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-red-500 hover:text-red-700"
      >
        <SiGmail size={28} />
      </a>
      <a
        href="https://www.threads.net/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-black hover:text-gray-700"
      >
        <SiThreads size={28} />
      </a>
      <a
        href="https://snapchat.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-black hover:text-gray-700"
      >
        <FaSnapchatGhost size={28} />
      </a>
    </div>
  );
};

export default SocialIcons;
