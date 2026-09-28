"use client";

import { useState } from "react";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

const offers = [
  "Free Shipping On Order $180+",
  "Deal of the day 35% off",
  "Free Today’s Deal $18+",
  "$5 off your first order",
];

const languages = ["English", "Spanish", "Hindi"];
const currencies = ["USD", "EUR", "GBP"];

export default function HeaderTop() {
  const [language, setLanguage] = useState("English");
  const [currency, setCurrency] = useState("USD");

  return (
    <div className="bg-[#111d35] bg-[url('/assets/img/shape/header-pattern.png')] bg-cover bg-center">
      <div className="mx-auto max-w-[1700px] px-5">
        <div className="flex min-h-[44px] flex-col items-center justify-between gap-2 md:flex-row">

          {/* Left */}
          <div className="hidden md:flex md:w-1/3">
            <div className="flex items-center gap-5 text-[13px] text-white">
              <a
                href="tel:+00123456789"
                className="flex items-center gap-2 hover:text-[#FD5B44]"
              >
                <Image
                  src="/assets/img/icon/phone2.svg"
                  alt="Phone"
                  width={15}
                  height={15}
                />
                +00 123 456 789
              </a>

              <div className="flex items-center gap-2">
                <MapPin size={15} className="text-[#FD5B44]" />
                <span>123 HR Street Line, UK</span>
              </div>
            </div>
          </div>

          {/* Center */}
          <div className="w-full md:w-1/3">
            <Swiper
              slidesPerView={1}
              loop
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              className="w-full"
            >
              {offers.map((offer) => (
                <SwiperSlide key={offer}>
                  <div className="flex justify-center">
                    <div className="flex items-center gap-2 text-[13px] font-medium text-white">
                      <Image
                        src="/assets/img/icon/fire.svg"
                        alt="Offer"
                        width={17}
                        height={17}
                      />
                      {offer}
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Right */}
          <div className="hidden items-center justify-end gap-3 md:flex md:w-1/3">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="cursor-pointer bg-transparent text-[13px] text-white outline-none"
            >
              {languages.map((item) => (
                <option
                  key={item}
                  value={item}
                  className="bg-white text-black"
                >
                  {item}
                </option>
              ))}
            </select>

            <span className="text-white/40">|</span>

            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="cursor-pointer bg-transparent text-[13px] text-white outline-none"
            >
              {currencies.map((item) => (
                <option
                  key={item}
                  value={item}
                  className="bg-white text-black"
                >
                  {item}
                </option>
              ))}
            </select>
          </div>

        </div>
      </div>
    </div>
  );
}