"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";

import "swiper/css";

/* =========================================================
   TYPES
========================================================= */

type Brand = {
  id: number;
  image: string;
  name: string;
};

/* =========================================================
   BRANDS
========================================================= */

const brands: Brand[] = [
  {
    id: 1,
    image: "/assets/brand/brand_2_1.svg",
    name: "Brand 1",
  },
  {
    id: 2,
    image: "/assets/brand/brand_2_2.svg",
    name: "Brand 2",
  },
  {
    id: 3,
    image: "/assets/brand/brand_2_3.svg",
    name: "Brand 3",
  },
  {
    id: 4,
    image: "/assets/brand/brand_2_4.svg",
    name: "Brand 4",
  },
  {
    id: 5,
    image: "/assets/brand/brand_2_5.svg",
    name: "Brand 5",
  },
  {
    id: 6,
    image: "/assets/brand/brand_2_6.svg",
    name: "Brand 6",
  },
  {
    id: 7,
    image: "/assets/brand/brand_2_1.svg",
    name: "Brand 1",
  },
  {
    id: 8,
    image: "/assets/brand/brand_2_2.svg",
    name: "Brand 2",
  },
  {
    id: 9,
    image: "/assets/brand/brand_2_3.svg",
    name: "Brand 3",
  },
  {
    id: 10,
    image: "/assets/brand/brand_2_4.svg",
    name: "Brand 4",
  },
  {
    id: 11,
    image: "/assets/brand/brand_2_5.svg",
    name: "Brand 5",
  },
  {
    id: 12,
    image: "/assets/brand/brand_2_6.svg",
    name: "Brand 6",
  },
];

/* =========================================================
   COMPONENT
========================================================= */

const ShopByBrand = () => {
  return (
    <section className="overflow-hidden py-12 lg:py-16">
      <div className="mx-auto w-full">
        {/* =================================================
            HEADER
        ================================================= */}

        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="
            mb-8
            flex
            flex-col
            items-center
            justify-between
            gap-4
            lg:flex-row
          "
        >
          {/* TITLE */}

          <div>
            <h2
              className="
                text-center
                text-2xl
                font-bold
                text-black
                dark:text-white
                sm:text-3xl
                lg:text-left
              "
            >
              Shop By Brand
            </h2>
          </div>

          {/* EXPLORE ALL */}

          <div className="w-full text-center lg:w-auto lg:text-right">
            <Link
              href="/brands"
              className="
                inline-flex
                items-center
                border-b-2
                border-[#FD5B44]
                pb-1
                text-sm
                font-semibold
                text-[#FD5B44]
                transition-all
                duration-300
                hover:border-black
                hover:text-black
                dark:hover:border-white
                dark:hover:text-white
              "
            >
              Explore All
            </Link>
          </div>
        </motion.div>

        {/* =================================================
            BRAND SLIDER
        ================================================= */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Swiper
            spaceBetween={16}
            slidesPerView={2}
            loop={true}
            speed={600}
            breakpoints={{
              576: {
                slidesPerView: 2,
                spaceBetween: 16,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 18,
              },
              992: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
              1200: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
              1300: {
                slidesPerView: 5,
                spaceBetween: 24,
              },
              1500: {
                slidesPerView: 6,
                spaceBetween: 24,
              },
            }}
            className="w-full py-2"
          >
            {brands.map((brand) => (
              <SwiperSlide key={brand.id}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="" >
                  <Image
                    src={brand.image}
                    alt={brand.name}
                    width={200}
                    height={100}
                    className=""
                  />
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
};

export default ShopByBrand;