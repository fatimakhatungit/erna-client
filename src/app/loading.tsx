import React from "react";

const LoadingPage = () => {
  return (
    <div className="min-h-screen bg-[#0E1B1B] flex flex-col items-center justify-center relative overflow-hidden font-sans">
      {/* Background Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#C08A3E]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Loader Container */}
      <div className="relative flex flex-col items-center z-10">
        {/* Animated Brand Symbol/Spinner */}
        <div className="relative w-24 h-24 mb-6 flex items-center justify-center">
          {/* Outer Rotating Ring */}
          <div className="absolute inset-0 rounded-full border-2 border-[#8FB3A9]/20 border-t-[#C08A3E] animate-spin" />

          {/* Inner Counter-Rotating Ring */}
          <div className="absolute inset-2 rounded-full border-2 border-[#C08A3E]/20 border-b-[#8FB3A9] animate-[spin_1.5s_linear_infinite_reverse]" />

          {/* Center Pulsing Brand Icon */}
          <span 
            className="text-2xl font-medium text-[#FBFAF7] animate-pulse"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            er
          </span>
        </div>

        {/* Brand Name */}
        <h1 
          className="text-3xl font-medium tracking-tight text-[#FBFAF7] uppercase mb-2"
          style={{ fontFamily: "'Fraunces', serif" }}
        >
          erna
        </h1>

        {/* Dynamic Loading Text & Dots */}
        <div className="flex items-center space-x-1 text-[#B9CCC5] text-xs font-medium tracking-[0.2em] uppercase">
          <span>Loading</span>
          <span className="inline-flex space-x-0.5">
            <span className="animate-[bounce_1s_infinite_100ms]">.</span>
            <span className="animate-[bounce_1s_infinite_200ms]">.</span>
            <span className="animate-[bounce_1s_infinite_300ms]">.</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;