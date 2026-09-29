"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import {
  ChevronLeft,
  ChevronRight,
  Loader2,
  ShoppingCart,
  Check,
} from "lucide-react";

import "swiper/css";

import { Button } from "@heroui/react";
import { useCart } from "@/context/CartContext";

/* =========================================================
   TYPES
========================================================= */

type Product = {
  _id: string;
  name: string;
  images?: string[];
  price: number;
  discount?: number;
  rating?: number;
};

type ApiResponse = {
  success: boolean;
  message: string;
  data: {
    featured: Product[];
    flashSale: Product[];
    topRated: Product[];
    mostSelling: Product[];
    newArrivals: Product[];
  };
};

/* =========================================================
   PRODUCT IMAGE HELPER
========================================================= */

const getProductImage = (images?: string[]) => {
  const image = images?.[0];

  if (!image || image.includes("example.com")) {
    return "/placeholder.svg";
  }

  return image;
};

/* =========================================================
   RATING STARS
========================================================= */

const getRatingStars = (rating = 0) => {
  const roundedRating = Math.round(rating);

  return Array.from(
    { length: 5 },
    (_, index) => (index < roundedRating ? "★" : "☆"),
  ).join("");
};

/* =========================================================
   FEATURED PRODUCT CARD
========================================================= */

function FeaturedProductCard({
  product,
}: {
  product: Product;
}) {
  const { addToCart } = useCart();

  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  const rating = product.rating ?? 0;
  const imageUrl = getProductImage(product.images);

  /* =======================================================
     ADD TO CART
  ======================================================= */

  const handleAddToCart = async () => {
    if (adding || added) return;

    setAdding(true);

    try {
      await addToCart(product, 1);

      setAdded(true);

      setTimeout(() => {
        setAdded(false);
      }, 1500);
    } finally {
      setAdding(false);
    }
  };

  return (
    <div
      className="
        m-4
        flex
        min-h-[500px]
        flex-col
        items-center
        rounded-2xl
        border
        border-gray-200
        bg-white
        p-6
        shadow-md
        shadow-black/5
        transition-all
        duration-300
        hover:shadow-lg
        hover:shadow-black/10
        sm:p-8
        md:flex-row
        md:p-[25px]
        dark:border-gray-800
        dark:bg-black
      "
    >
      {/* =================================================
          IMAGE
      ================================================= */}

      <div
        className="
          relative
          h-[300px]
          w-full
          shrink-0
          overflow-hidden
          rounded-xl
          bg-gray-100
          dark:bg-gray-900
          md:h-[450px]
          md:w-[53%]
        "
      >
        <Image
          src={imageUrl}
          alt={product.name || "Product image"}
          fill
          sizes="
            (max-width: 767px) 100vw,
            (max-width: 1199px) 53vw,
            450px
          "
          className="
            h-full
            w-full
            object-cover
            transition-transform
            duration-500
            hover:scale-105
          "
          priority={false}
        />

        {/* DISCOUNT BADGE */}

        {product.discount !== undefined &&
          product.discount > 0 && (
            <span
              className="
                absolute
                left-0
                top-0
                rounded-br-xl
                bg-[#FD5B44]
                px-4
                py-2
                text-sm
                font-bold
                text-white
                shadow-md
              "
            >
              -{product.discount}%
            </span>
          )}
      </div>

      {/* =================================================
          CONTENT
      ================================================= */}

      <div
        className="
          flex
          flex-1
          flex-col
          justify-center
          pt-7
          md:pl-10
          md:pt-0
        "
      >
        {/* PRODUCT NAME */}

        <h3
          className="
            max-w-[350px]
            text-[19px]
            font-bold
            leading-[1.45]
            text-black
            dark:text-white
            md:text-[23px]
          "
        >
          <Link
            href={`/shop-details/${product._id}`}
            className="
              transition-colors
              duration-300
              hover:text-[#FD5B44]
            "
          >
            {product.name}
          </Link>
        </h3>

        {/* =================================================
            RATING
        ================================================= */}

        <div
          className="
            mt-3
            flex
            flex-wrap
            items-center
            gap-3
            md:gap-4
          "
        >
          <span
            className="
              whitespace-nowrap
              text-[18px]
              tracking-[1px]
              text-[#FD5B44]
              md:text-[20px]
            "
            aria-label={`Rated ${rating} out of 5`}
          >
            {getRatingStars(rating)}
          </span>

          <span
            className="
              whitespace-nowrap
              text-[13px]
              text-gray-500
              dark:text-gray-400
              md:text-[14px]
            "
          >
            ({rating} rating)
          </span>
        </div>

        {/* =================================================
            PRICE
        ================================================= */}

        <div className="mt-2 flex items-center gap-2">
          <span
            className="
              text-[19px]
              font-bold
              text-black
              dark:text-white
              md:text-[21px]
            "
          >
            ${Number(product.price || 0).toFixed(2)}
          </span>

          {product.discount !== undefined &&
            product.discount > 0 && (
              <del
                className="
                  text-[13px]
                  text-gray-400
                  dark:text-gray-500
                  md:text-[14px]
                "
              >
                $
                {(
                  product.price /
                  (1 - product.discount / 100)
                ).toFixed(2)}
              </del>
            )}
        </div>

        {/* =================================================
            ADD TO CART BUTTON
        ================================================= */}

        <Button
          onClick={handleAddToCart}
          isDisabled={adding || added}
          className={`
            group/btn
            relative
            mt-8
            flex
            h-[51px]
            w-full
            items-center
            justify-center
            overflow-hidden
            rounded-xl
            border
            px-6
            text-[14px]
            font-bold
            uppercase
            tracking-wide
            transition-all
            duration-300
            md:px-7

            ${
              added
                ? `
                  border-[#FD5B44]
                  bg-[#FD5B44]
                  text-white
                `
                : `
                  border-black
                  bg-black
                  text-white
                  hover:border-[#FD5B44]
                `
            }

            disabled:cursor-not-allowed
            disabled:opacity-80

            dark:border-white
            dark:bg-white
            dark:text-black
            dark:hover:border-[#FD5B44]
            dark:hover:bg-[#FD5B44]
            dark:hover:text-white
          `}
        >
          {/* =================================================
              LOADING
          ================================================= */}

          {adding ? (
            <div className="flex items-center gap-2">
              <Loader2
                size={18}
                className="animate-spin"
              />

              <span>ADDING...</span>
            </div>
          ) : added ? (
            /* =================================================
                SUCCESS
            ================================================= */

            <div className="flex items-center gap-2">
              <Check size={18} />

              <span>ADDED!</span>
            </div>
          ) : (
            /* =================================================
                NORMAL + HOVER
            ================================================= */

            <>
              {/* Bottom-to-top orange background */}

              <span
                className="
                  absolute
                  inset-0
                  translate-y-full
                  bg-[#FD5B44]
                  transition-transform
                  duration-300
                  ease-out
                  group-hover/btn:translate-y-0
                "
              />

              {/* Default text */}

              <span
                className="
                  relative
                  flex
                  items-center
                  gap-2
                  transition-all
                  duration-300
                  ease-out
                  group-hover/btn:-translate-y-12
                  group-hover/btn:opacity-0
                "
              >
                <ShoppingCart size={18} />

                <span>
                  ADD TO CART
                </span>
              </span>

              {/* Hover text */}

              <span
                className="
                  absolute
                  flex
                  translate-y-12
                  items-center
                  justify-center
                  gap-2
                  text-white
                  opacity-0
                  transition-all
                  duration-300
                  ease-out
                  group-hover/btn:translate-y-0
                  group-hover/btn:opacity-100
                "
              >
                <ShoppingCart size={18} />

                <span>
                  ADD TO CART
                </span>
              </span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

/* =========================================================
   MAIN FEATURED PRODUCTS SECTION
========================================================= */

export default function FeaturedProducts() {
  const swiperRef = useRef<SwiperType | null>(null);

  const [products, setProducts] = useState<Product[]>(
    [],
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* =======================================================
     FETCH FEATURED PRODUCTS
  ======================================================= */

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL;

        if (!apiUrl) {
          throw new Error(
            "NEXT_PUBLIC_API_URL is not configured in .env.local",
          );
        }

        const response = await fetch(
          `${apiUrl}/products/home-sections`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            cache: "no-store",
          },
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch products. Status: ${response.status}`,
          );
        }

        const result: ApiResponse =
          await response.json();

        if (!result.success) {
          throw new Error(
            result.message ||
              "Failed to load featured products.",
          );
        }

        setProducts(
          result.data?.featured || [],
        );
      } catch (error) {
        console.error(
          "Featured Products Error:",
          error,
        );

        setError(
          "Failed to load featured products.",
        );

        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  /* =======================================================
     LOADING STATE
  ======================================================= */

  if (loading) {
    return (
      <section
        id="shop-sec"
        className="
          w-full
          overflow-hidden
          bg-white
          py-10
          dark:bg-black
          md:py-14
        "
      >
        <div
          className="
            mx-auto
            w-full
            max-w-[1800px]
            px-7
            md:px-10
          "
        >
          {/* HEADER */}

          <div className="flex items-end justify-between">
            <div>
              <h2
                className="
                  inline-block
                  px-0.5
                  pt-1
                  text-[30px]
                  font-bold
                  leading-[1.15]
                  text-black
                  dark:text-white
                  md:text-[40px]
                "
              >
                Featured Products
              </h2>

              <div
                className="
                  h-[2.5px]
                  w-[172px]
                  bg-[#FD5B44]
                "
              />
            </div>

            <Link
              href="/shop"
              className="
                mb-3
                hidden
                text-[18px]
                font-semibold
                text-black
                transition-colors
                hover:text-[#FD5B44]
                dark:text-white
                md:block
                md:text-[23px]
              "
            >
              Explore All
            </Link>
          </div>

          {/* HEADER LINE */}

          <div
            className="
              h-[1px]
              w-full
              bg-gray-200
              dark:bg-gray-800
            "
          />

          {/* LOADING */}

          <div
            className="
              flex
              min-h-[500px]
              items-center
              justify-center
            "
          >
            <div className="flex items-center gap-2">
              <Loader2
                size={20}
                className="
                  animate-spin
                  text-[#FD5B44]
                "
              />

              <p
                className="
                  text-lg
                  text-gray-500
                  dark:text-gray-400
                "
              >
                Loading products...
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* =======================================================
     MAIN RENDER
  ======================================================= */

  return (
    <section
      id="shop-sec" className="w-full overflow-hidden md:py-14" >
      <div
        className="
          mx-auto
          w-full
          max-w-[1800px]
          px-7
          md:px-10
        "
      >
        {/* =================================================
            HEADER
        ================================================= */}

        <div className="flex items-end justify-between">
          <div>
            <h2
              className="
                inline-block
                px-0.5
                pt-1
                text-[30px]
                font-bold
                leading-[1.15]
                text-black
                dark:text-white
                md:text-[40px]
              "
            >
              Featured Products
            </h2>

            <div
              className="
                h-[2.5px]
                w-[172px]
                bg-[#FD5B44]
              "
            />
          </div>

          <Link
            href="/shop"
            className="
              mb-3
              hidden
              text-[18px]
              font-semibold
              text-black
              transition-colors
              hover:text-[#FD5B44]
              dark:text-white
              md:block
              md:text-[23px]
            "
          >
            Explore All
          </Link>
        </div>

        {/* HEADER LINE */}

        <div className="h-[1px] w-full"/>

        {/* =================================================
            ERROR STATE
        ================================================= */}

        {error && (
          <div
            className="
              flex
              min-h-[500px]
              items-center
              justify-center
            "
          >
            <div className="text-center">
              <p className="text-lg text-red-500">
                {error}
              </p>

              <button
                type="button"
                onClick={() =>
                  window.location.reload()
                }
                className="
                  mt-4
                  rounded-xl
                  bg-black
                  px-5
                  py-2.5
                  text-sm
                  font-semibold
                  text-white
                  shadow-md
                  transition-all
                  duration-300
                  hover:bg-[#FD5B44]
                "
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* =================================================
            EMPTY STATE
        ================================================= */}

        {!error &&
          products.length === 0 && (
            <div
              className="
                flex
                min-h-[500px]
                items-center
                justify-center
              "
            >
              <p
                className="
                  text-lg
                  text-gray-500
                  dark:text-gray-400
                "
              >
                No featured products found.
              </p>
            </div>
          )}

        {/* =================================================
            SLIDER
        ================================================= */}

        {!error &&
          products.length > 0 && (
            <div className="relative mt-8">
              <Swiper
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                }}
                slidesPerView={1}
                spaceBetween={24}
                breakpoints={{
                  0: {
                    slidesPerView: 1,
                  },

                  768: {
                    slidesPerView: 1,
                  },

                  1200: {
                    slidesPerView: 2,
                  },
                }}
              >
                {products.map((product) => (
                  <SwiperSlide
                    key={product._id}
                  >
                    <FeaturedProductCard
                      product={product}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* =================================================
                  PREVIOUS
              ================================================= */}

              <button
                type="button"
                aria-label="Previous product"
                onClick={() =>
                  swiperRef.current?.slidePrev()
                }
                className="
                  group
                  absolute
                  -left-5
                  top-1/2
                  z-20
                  hidden
                  h-11
                  w-11
                  -translate-y-1/2
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-gray-200
                  bg-white
                  shadow-md
                  shadow-black/10
                  transition-all
                  duration-300
                  hover:border-[#FD5B44]
                  hover:bg-[#FD5B44]
                  dark:border-gray-700
                  dark:bg-black
                  dark:hover:bg-[#FD5B44]
                  md:flex
                "
              >
                <ChevronLeft
                  size={24}
                  strokeWidth={2.5}
                  className="
                    text-black
                    transition-colors
                    group-hover:text-white
                    dark:text-white
                  "
                />
              </button>

              {/* =================================================
                  NEXT
              ================================================= */}

              <button
                type="button"
                aria-label="Next product"
                onClick={() =>
                  swiperRef.current?.slideNext()
                }
                className="
                  group
                  absolute
                  -right-5
                  top-1/2
                  z-20
                  hidden
                  h-11
                  w-11
                  -translate-y-1/2
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-gray-200
                  bg-white
                  shadow-md
                  shadow-black/10
                  transition-all
                  duration-300
                  hover:border-[#FD5B44]
                  hover:bg-[#FD5B44]
                  dark:border-gray-700
                  dark:bg-black
                  dark:hover:bg-[#FD5B44]
                  md:flex
                "
              >
                <ChevronRight
                  size={24}
                  strokeWidth={2.5}
                  className="
                    text-black
                    transition-colors
                    group-hover:text-white
                    dark:text-white
                  "
                />
              </button>
            </div>
          )}

        {/* =================================================
            MOBILE EXPLORE
        ================================================= */}

        <div className="mt-6 text-center md:hidden">
          <Link
            href="/shop"
            className="
              text-base
              font-semibold
              text-black
              transition-colors
              hover:text-[#FD5B44]
              dark:text-white
            "
          >
            Explore All
          </Link>
        </div>
      </div>
    </section>
  );
}