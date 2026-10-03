"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col items-center justify-center relative overflow-hidden font-sans px-4">
      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-lg">
        {/* Error Image */}
        <div className="error-img mb-5">
           <Image src="assets/bg/error.svg"
                          alt="ERNA"
                          width={160}
                          height={50}
                          priority
                          className="w-full h-auto object-contain"
                        />
        </div>

        {/* Error Content */}
        <div className="error-content flex flex-col items-center">
          <h2 className="error-title text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
            Opp’s that page can’t be found
          </h2>
          <p className="error-text text-sm sm:text-base text-slate-500 mb-8 max-w-md leading-relaxed">
            It looks like nothing was found at this location. Maybe try one of the links below or a search?.
          </p>

          <Link
            href="electronics-shop.html"
            className="th-btn inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-[#ff5c47] hover:bg-[#e04f3b] text-white font-medium text-sm transition-all duration-200 shadow-sm"
          >
            <i className="fal fa-home me-2"></i>Back To Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;