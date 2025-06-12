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

const SocialIcons = ({ postUrl, title }) => {
  const encodedUrl = encodeURIComponent(postUrl);
  const encodedTitle = encodeURIComponent(title || "Check this out");

  return (
    <div className="flex flex-wrap gap-3 m-2">
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-800"
      >
        <FaFacebook size={28} />
      </a>
      <a
        href={`https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-green-500 hover:text-green-700"
      >
        <FaWhatsapp size={28} />
      </a>
      <a
        href={`https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sky-400 hover:text-sky-600"
      >
        <SiTelegram size={28} />
      </a>
      <a
        href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sky-500 hover:text-sky-700"
      >
        <FaTwitter size={28} />
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-700 hover:text-blue-900"
      >
        <FaLinkedin size={28} />
      </a>
      <a
        href={`https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-red-600 hover:text-red-800"
      >
        <FaPinterest size={28} />
      </a>
      <a
        href={`mailto:?subject=${encodedTitle}&body=${encodedUrl}`}
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
