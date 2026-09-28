"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  Heart,
  ArrowLeftRight,
  Eye,
  Check,
  ChevronLeft,
  ChevronRight,
  Loader2,
  ShoppingCart,
} from "lucide-react";
import { motion } from "framer-motion";

import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";

import { useWishlist } from "@/context/WishlistContext";
import { useRouter } from "next/navigation";
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
  stock?: number;
};

type ApiResponse = {
  success: boolean;
  message?: string;
  statusCode?: number;
  data: {
    featured: Product[];
    flashSale: Product[];
    topRated: Product[];
    mostSelling: Product[];
    newArrivals: Product[];
  };
};

/* =========================================================
   FALLBACK IMAGE
========================================================= */

const FALLBACK_IMAGE = "/placeholder.svg";

/* =========================================================
   IMAGE HELPER
========================================================= */

const getProductImage = (image?: string) => {
  if (!image || image.trim() === "") {
    return FALLBACK_IMAGE;
  }

  if (image.includes("example.com")) {
    return FALLBACK_IMAGE;
  }

  return image;
};

/* =========================================================
   OLD PRICE CALCULATION
========================================================= */

const getOldPrice = (price: number, discount?: number) => {
  if (!discount || discount <= 0 || discount >= 100) {
    return null;
  }

  return price / (1 - discount / 100);
};

/* =========================================================
   RATING STARS
========================================================= */

function getRatingStars(rating = 0) {
  const rounded = Math.round(rating);

  return Array.from(
    { length: 5 },
    (_, index) => (index < rounded ? "★" : "☆"),
  );
}

/* =========================================================
   PRODUCT CARD
========================================================= */

function ProductCard({ product }: { product: Product }) {
  const image = getProductImage(product.images?.[0]);

  const oldPrice = getOldPrice(
    Number(product.price),
    product.discount,
  );

  const rating = Number(product.rating || 0);
  const stock = Number(product.stock || 0);

  const router = useRouter();

  const { addToCart } = useCart();

  const {
    isWishlisted,
    toggleWishlist,
    pendingId,
    isAuthenticated,
  } = useWishlist();

  /* =======================================================
     CART STATES
  ======================================================= */

  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  /* =======================================================
     WISHLIST
  ======================================================= */

  const wishlisted = isWishlisted(product._id);
  const wishlistPending = pendingId === product._id;

  const handleToggleWishlist = () => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    void toggleWishlist(product._id);
  };

  /* =======================================================
     ADD TO CART
  ======================================================= */

  const handleAddToCart = async () => {
    if (adding || added || stock <= 0) {
      return;
    }

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
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="
        group
        flex
        flex-col
        overflow-hidden
        rounded-xl
        border
        border-gray-200
        bg-white
        p-4
        shadow-sm
        shadow-black/5
        transition-shadow
        hover:shadow-md
        hover:shadow-black/10
        dark:border-gray-800
        dark:bg-black
      "
    >
      {/* =================================================
          IMAGE SECTION
      ================================================= */}

      <div
        className="
          relative
          flex
          h-[230px]
          items-center
          justify-center
          overflow-hidden
          rounded-lg
          bg-gray-100
          dark:bg-gray-900
        "
      >
        <Image
          src={image}
          alt={product.name || "Product image"}
          width={220}
          height={220}
          className="
            h-[200px]
            w-[200px]
            object-contain
            transition-transform
            duration-500
            group-hover:scale-105
          "
        />

        {/* =================================================
            DISCOUNT BADGE
        ================================================= */}

        {product.discount !== undefined &&
          product.discount > 0 && (
            <span
              className="
                absolute
                left-0
                top-0
                rounded-br-xl
                bg-[#FD5B44]
                px-3
                py-1
                text-xs
                font-semibold
                text-white
                shadow-sm
              "
            >
              -{product.discount}%
            </span>
          )}

        {/* =================================================
            ACTION BUTTONS
        ================================================= */}

        <div
          className="
            absolute
            right-3
            top-3
            flex
            translate-x-10
            flex-col
            gap-2
            opacity-0
            transition-all
            duration-300
            group-hover:translate-x-0
            group-hover:opacity-100
          "
        >
          {/* Wishlist */}

          <button
            type="button"
            aria-label={
              wishlisted
                ? "Remove from wishlist"
                : "Add to wishlist"
            }
            onClick={handleToggleWishlist}
            disabled={wishlistPending}
            className={`
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              shadow-md
              transition-all
              duration-300

              ${
                wishlisted
                  ? "bg-[#FD5B44] text-white"
                  : "bg-white text-black hover:bg-[#FD5B44] hover:text-white"
              }

              disabled:cursor-not-allowed
              disabled:opacity-70
            `}
          >
            {wishlistPending ? (
              <Loader2
                size={17}
                className="animate-spin"
              />
            ) : (
              <Heart
                size={17}
                className={
                  wishlisted ? "fill-current" : ""
                }
              />
            )}
          </button>

          {/* Compare */}

          <Link
            href="/compare"
            aria-label="Compare product"
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              bg-white
              text-black
              shadow-md
              transition-all
              duration-300
              hover:bg-[#FD5B44]
              hover:text-white
            "
          >
            <ArrowLeftRight size={17} />
          </Link>

          {/* Quick View */}

          <Link
            href={`/products/${product._id}`}
            aria-label="View product"
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              bg-white
              text-black
              shadow-md
              transition-all
              duration-300
              hover:bg-[#FD5B44]
              hover:text-white
            "
          >
            <Eye size={17} />
          </Link>
        </div>
      </div>

      {/* =================================================
          CONTENT SECTION
      ================================================= */}

      <div className="flex flex-1 flex-col pt-4">

        {/* PRODUCT NAME */}

        <h3
          className="
            min-h-[48px]
            text-[15px]
            font-semibold
            leading-6
            text-black
            dark:text-white
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

        <div className="mt-2 flex items-center gap-3">
          <div
            className="
              flex
              gap-[1px]
              text-[16px]
              leading-none
              text-[#FD5B44]
            "
            aria-label={`Rated ${rating} out of 5`}
          >
            {getRatingStars(rating).map(
              (star, index) => (
                <span key={index}>{star}</span>
              ),
            )}
          </div>

          <span
            className="
              text-[13px]
              text-gray-500
              dark:text-gray-400
            "
          >
            ({rating})
          </span>
        </div>

        {/* =================================================
            PRICE
        ================================================= */}

        <div className="mt-3 flex items-center gap-2">
          <span
            className="
              text-[17px]
              font-bold
              text-black
              dark:text-white
            "
          >
            ${Number(product.price).toFixed(2)}
          </span>

          {oldPrice !== null && (
            <del
              className="
                text-[13px]
                text-gray-400
              "
            >
              ${oldPrice.toFixed(2)}
            </del>
          )}
        </div>

        {/* =================================================
            STOCK
        ================================================= */}

        <div className="mt-3 flex items-center gap-1.5 text-[13px]">
          <Check
            size={15}
            strokeWidth={2}
            className={
              stock > 0
                ? "text-emerald-600"
                : "text-red-500"
            }
          />

          <span
            className={
              stock > 0
                ? "text-emerald-600"
                : "text-red-500"
            }
          >
            {stock > 0
              ? "In Stock"
              : "Out of Stock"}
          </span>

          {stock > 0 && (
            <span
              className="
                text-gray-600
                dark:text-gray-400
              "
            >
              ({stock})
            </span>
          )}
        </div>

        {/* =================================================
            ADD TO CART
        ================================================= */}

        <Button
          onClick={handleAddToCart}
          isDisabled={
            adding ||
            added ||
            stock <= 0
          }
          className={`
            group/btn
            relative
            mt-5
            flex
            h-[44px]
            w-full
            items-center
            justify-center
            overflow-hidden
            rounded-lg
            border
            text-[13px]
            font-semibold
            uppercase
            tracking-wide
            transition-all
            duration-300

            ${
              stock <= 0
                ? `
                  cursor-not-allowed
                  border-gray-200
                  bg-gray-100
                  text-gray-400
                `
                : added
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

            dark:border-gray-700
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
                size={16}
                className="animate-spin"
              />

              <span>ADDING...</span>
            </div>
          ) : added ? (
            /* =================================================
                SUCCESS
            ================================================= */

            <div className="flex items-center gap-2">
              <Check size={16} />

              <span>ADDED!</span>
            </div>
          ) : stock <= 0 ? (
            /* =================================================
                OUT OF STOCK
            ================================================= */

            <span>OUT OF STOCK</span>
          ) : (
            /* =================================================
                NORMAL + HOVER ANIMATION
            ================================================= */

            <>
              {/* Background slides from bottom */}

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

              {/* Original text */}

              <span
                className="
                  relative
                  flex
                  items-center
                  gap-1.5
                  transition-all
                  duration-300
                  ease-out
                  group-hover/btn:-translate-y-10
                  group-hover/btn:opacity-0
                "
              >
                <ShoppingCart size={16} />

                <span>
                  ADD TO CART
                </span>
              </span>

              {/* Hover text */}

              <span
                className="
                  absolute
                  flex
                  translate-y-10
                  items-center
                  gap-1.5
                  text-white
                  opacity-0
                  transition-all
                  duration-300
                  ease-out
                  group-hover/btn:translate-y-0
                  group-hover/btn:opacity-100
                "
              >
                <ShoppingCart size={16} />

                <span>
                  ADD TO CART
                </span>
              </span>
            </>
          )}
        </Button>
      </div>
    </motion.div>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function TrendingProducts() {
  const [products, setProducts] = useState<Product[]>(
    [],
  );

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const swiperRef = useRef<SwiperType | null>(
    null,
  );

  /* =======================================================
     FETCH DATA
  ======================================================= */

  useEffect(() => {
    const fetchTrendingProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL;

        if (!apiUrl) {
          throw new Error(
            "NEXT_PUBLIC_API_URL is not configured",
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
            `Failed to fetch products: ${response.status}`,
          );
        }

        const result: ApiResponse =
          await response.json();

        if (!result.success) {
          throw new Error(
            result.message ||
              "Failed to load products",
          );
        }

        setProducts(
          result.data?.mostSelling || [],
        );
      } catch (err) {
        console.error(
          "Trending Products Error:",
          err,
        );

        setError(
          "Failed to load trending products.",
        );

        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingProducts();
  }, []);

  return (
    <section
      className="overflow-hidden">
      <div
        className="mx-auto max-w-[1860px] px-5 lg:px-8 mt-[120px]" >
        {/* =================================================
            HEADER
        ================================================= */}

        <div
          className="
            flex
            flex-col
            justify-between
            gap-5
            sm:flex-row
            sm:items-center
          "
        >
          <div>
            <h2
              className="
                text-center
                text-[26px]
                font-bold
                leading-tight
                text-black
                sm:text-left
                sm:text-[30px]
                dark:text-white
              "
            >
              Trending Products
            </h2>

            {/* Accent line */}

            <div className="mt-3 h-[2px] w-24 bg-[#FD5B44]" />
          </div>

          <div className="text-center sm:text-right">
            <Link
              href="/shop"
              className="
                inline-block
                border-b-2
                border-[#FD5B44]
                pb-1
                text-[15px]
                font-semibold
                text-black
                transition-all
                duration-300
                hover:text-[#FD5B44]
                dark:text-white
                dark:hover:text-[#FD5B44]
              "
            >
              Explore All
            </Link>
          </div>
        </div>

        {/* =================================================
            BOTTOM LINE
        ================================================= */}

        <div
          className="
            mt-5
            h-px
            w-full
            bg-gray-200
            dark:bg-gray-800
          "
        />

        {/* =================================================
            LOADING
        ================================================= */}

        {loading && (
          <div
            className="
              flex
              min-h-[300px]
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
                  text-gray-600
                  dark:text-gray-400
                "
              >
                Loading trending products...
              </p>
            </div>
          </div>
        )}

        {/* =================================================
            ERROR
        ================================================= */}

        {!loading && error && (
          <div
            className="
              flex
              min-h-[300px]
              flex-col
              items-center
              justify-center
            "
          >
            <p className="text-red-500">
              {error}
            </p>

            <button
              type="button"
              onClick={() =>
                window.location.reload()
              }
              className="
                mt-4
                rounded-lg
                bg-black
                px-5
                py-2
                text-sm
                font-medium
                text-white
                transition-all
                duration-300
                hover:bg-[#FD5B44]
              "
            >
              Try Again
            </button>
          </div>
        )}

        {/* =================================================
            EMPTY
        ================================================= */}

        {!loading &&
          !error &&
          products.length === 0 && (
            <div
              className="
                flex
                min-h-[300px]
                items-center
                justify-center
              "
            >
              <p
                className="
                  text-gray-500
                  dark:text-gray-400
                "
              >
                No trending products found.
              </p>
            </div>
          )}

        {/* =================================================
            SLIDER
        ================================================= */}

        {!loading &&
          !error &&
          products.length > 0 && (
            <div className="relative mt-10">

              {/* Previous */}

              <button
                type="button"
                onClick={() =>
                  swiperRef.current?.slidePrev()
                }
                aria-label="Previous products"
                className="
                  z-25
                  absolute
                  -left-5
                  top-1/2
                  flex
                  h-11
                  w-11
                  -translate-y-1/2
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-gray-200
                  bg-white
                  text-black
                  shadow-md
                  transition-all
                  duration-300
                  hover:border-[#FD5B44]
                  hover:bg-[#FD5B44]
                  hover:text-white
                  dark:border-gray-700
                  dark:bg-black
                  dark:text-white
                "
              >
                <ChevronLeft size={20} />
              </button>

              {/* Next */}

              <button
                type="button"
                aria-label="Next products"
                onClick={() =>
                  swiperRef.current?.slideNext()
                }
                className="
                  z-25
                  absolute
                  -right-5
                  top-1/2
                  flex
                  h-11
                  w-11
                  -translate-y-1/2
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-gray-200
                  bg-white
                  text-black
                  shadow-md
                  transition-all
                  duration-300
                  hover:border-[#FD5B44]
                  hover:bg-[#FD5B44]
                  hover:text-white
                  dark:border-gray-700
                  dark:bg-black
                  dark:text-white
                "
              >
                <ChevronRight size={20} />
              </button>

              {/* =================================================
                  SWIPER
              ================================================= */}

              <Swiper
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                }}
                spaceBetween={20}
                slidesPerView={1}
                loop={products.length > 5}
                breakpoints={{
                  0: {
                    slidesPerView: 1,
                    spaceBetween: 16,
                  },

                  480: {
                    slidesPerView: 1,
                    spaceBetween: 16,
                  },

                  640: {
                    slidesPerView: 2,
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

                  1200: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                  },

                  1300: {
                    slidesPerView: 4,
                    spaceBetween: 22,
                  },

                  1500: {
                    slidesPerView: 5,
                    spaceBetween: 24,
                  },
                }}
                className="!py-3"
              >
                {products.map((product) => (
                  <SwiperSlide
                    key={product._id}
                  >
                    <ProductCard
                      product={product}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
      </div>
    </section>
  );
}