import React from "react";
import "./BackgroundAnimation.css"; // Import custom animation styles

const ManaenaduBackground = () => {
  return (
    <div className="fixed inset-0 z-[-1] bg-white overflow-hidden">
      <div className="lines">
        {Array.from({ length: 10 }).map((_, i) => (
          <div className="line" key={i}></div>
        ))}
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-[72px] font-bold tracking-wider text-center text-[#000066] opacity-10">
          MANAENADU
        </h1>
      </div>
    </div>
  );
};

export default ManaenaduBackground;
