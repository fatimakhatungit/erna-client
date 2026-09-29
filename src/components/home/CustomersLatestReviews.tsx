"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

interface Testimonial {
  id: number;
  avatar: string;
  name: string;
  designation: string;
  review: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    avatar: "/assets/testimonial/testi_2_1.jpg",
    name: "Michel Smith",
    designation: "CEO Of Company",
    review:
      "I just got this high fashion for Beckam and couldn’t be happier with it. It gets amazing reviews and made a total believer out of me. I love the minimal, clean look.",
  },
  {
    id: 2,
    avatar: "/assets/testimonial/testi_2_2.jpg",
    name: "Abraham Khalil",
    designation: "Managing Director",
    review:
      "I just got this high fashion for Beckam and couldn’t be happier with it. It gets amazing reviews and made a total believer out of me. I love the minimal, clean look.",
  },
  {
    id: 3,
    avatar: "/assets/testimonial/testi_2_3.jpg",
    name: "Jenny Wilson",
    designation: "CEO Of Company",
    review:
      "I just got this high fashion for Beckam and couldn’t be happier with it. It gets amazing reviews and made a total believer out of me. I love the minimal, clean look.",
  },
  {
    id: 4,
    avatar: "/assets/testimonial/testi_2_4.jpg",
    name: "Jackline Techie",
    designation: "Managing Director",
    review:
      "I just got this high fashion for Beckam and couldn’t be happier with it. It gets amazing reviews and made a total believer out of me. I love the minimal, clean look.",
  },
  {
    id: 5,
    avatar: "/assets/testimonial/testi_2_5.jpg",
    name: "Michel Smith",
    designation: "CEO Of Company",
    review:
      "I just got this high fashion for Beckam and couldn’t be happier with it. It gets amazing reviews and made a total believer out of me. I love the minimal, clean look.",
  },
];

export default function CustomerReviews() {
  return (
    <section className="w-full bg-white dark:bg-black">
      <div
        id="testi-sec"
        className="relative overflow-hidden px-4 py-16 lg:py-20"
      >
        {/* Heading Container */}
        <div className="mx-auto max-w-[1860px] px-5 lg:px-8">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            {/* Title */}
            <div>
              <h2 className="text-center text-[26px] font-bold leading-tight text-black dark:text-white sm:text-left sm:text-[30px]">
                Customers Latest Reviews
              </h2>

              {/* Accent Line */}
              <div className="mt-3 h-[3px] w-[170px] rounded-full bg-[#FD5B44]" />
            </div>

            {/* Explore */}
            <div className="text-center sm:text-right">
              <a
                href="/contact"
                className="inline-block border-b-2 border-[#FD5B44] pb-1 text-[15px] font-semibold text-[#FD5B44] transition-all duration-300 hover:border-black hover:text-black dark:hover:border-white dark:hover:text-white"
              >
                Explore All
              </a>
            </div>
          </div>

          {/* Bottom Line */}
          <div className="mt-5 h-px w-full bg-gray-200 dark:bg-gray-800" />
        </div>

        {/* Slider Container */}
        <div className="mx-auto mt-10 max-w-[1860px] px-5 lg:px-8">
          <Swiper
            modules={[Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            pagination={{
              clickable: true,
              el: ".testimonial-pagination",
            }}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 18,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              992: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1300: {
                slidesPerView: 4,
                spaceBetween: 22,
              },
              1500: {
                slidesPerView: 4,
                spaceBetween: 24,
              },
            }}
            className="!py-3"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id} className="h-auto">
                <div className="group flex h-full flex-col justify-between rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#FD5B44] hover:shadow-lg hover:shadow-black/10 sm:p-8 dark:border-gray-800 dark:bg-[#0b0b0b]">
                  <div>
                    {/* Quote + Rating */}
                    <div className="mb-5 flex items-center justify-between">
                      {/* Quote Icon */}
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#FD5B44]/10">
                        <Image
                          src="/assets/icon/quote2.svg"
                          alt="Quote"
                          width={28}
                          height={28}
                          className="opacity-80"
                        />
                      </div>

                      {/* Rating */}
                      <div
                        className="flex gap-[2px] text-[16px] leading-none text-[#FD5B44]"
                        aria-label="Rated 5 out of 5"
                      >
                        <span>★</span>
                        <span>★</span>
                        <span>★</span>
                        <span>★</span>
                        <span>★</span>
                      </div>
                    </div>

                    {/* Review Text */}
                    <p className="mb-6 text-[15px] leading-7 text-gray-600 dark:text-gray-300">
                      {testimonial.review}
                    </p>
                  </div>

                  {/* Profile Details */}
                  <div className="flex items-center gap-4 border-t border-gray-100 pt-4 dark:border-gray-800">
                    {/* Avatar */}
                    <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full border-2 border-transparent transition-all duration-300 group-hover:border-[#FD5B44]">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        width={56}
                        height={56}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    {/* Name + Designation */}
                    <div>
                      <h3 className="text-[16px] font-semibold text-black dark:text-white">
                        {testimonial.name}
                      </h3>

                      <p className="mt-0.5 text-[13px] text-gray-500 dark:text-gray-400">
                        {testimonial.designation}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Pagination */}
          <div className="testimonial-pagination mt-8 flex justify-center gap-2" />
        </div>
      </div>
    </section>
  );
}