"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronDown,
  Menu,
  Search,
  ShoppingCart,
  User,
  X,
  Loader2,
  PackageSearch,
  Sun,
  Moon,
} from "lucide-react";

import { useCart } from "@/context/CartContext";
import { useSession } from "@/lib/auth-client";
import { useTheme } from "next-themes";

/* =========================================
   TYPES
========================================= */

interface SearchProduct {
  _id: string;
  name: string;
  images?: string[];
  image?: string;
  price: number;
  discount?: number;
  isFlashSale?: boolean;
  flashSalePrice?: number;
}

interface DropdownItem {
  name: string;
  href: string;
}

interface NavItem {
  name: string;
  href: string;
  dropdown?: DropdownItem[];
}

/* =========================================
   NAVIGATION
========================================= */

const navLinks: NavItem[] = [
  {
    name: "Home",
    href: "/",
     dropdown: [
      {
        name: "Home fashion-shop",
        href: "/home-2",
      },
      {
        name: "Home Grocery-shop",
        href: "/home-3",
      },
      {
        name: "Home Coffee Shop",
        href: "/home-4",
      },
      {
        name: "Home Furniture Shop",
        href: "/home-5",
      },
    ],
  },
  {
    name: "Shop",
    href: "/shops",
    dropdown: [
      {
        name: "All Shops",
        href: "/shops",
      },
    ],
  },
  {
    name: "About Us",
    href: "/about",
  },
  {
    name: "Pages",
    href: "/pages",
    dropdown: [
      {
        name: "All Products",
        href: "/products",
      },
      {
        name: "Categories",
        href: "/categories",
      },
      {
        name: "Wishlist",
        href: "/userDashboard/wishList",
      },
      {
        name: "My Account",
        href: "/profile",
      },
    ],
  },
  {
    name: "Blog",
    href: "/blog",
    dropdown: [
      {
        name: "All Blog",
        href: "/blog",
      },
    ],
  },
  {
    name: "Contact Us",
    href: "/contact",
  },
];

/* =========================================
   API
========================================= */

const API = process.env.NEXT_PUBLIC_API_URL;

/* =========================================
   NAVBAR
========================================= */

export default function Navbar() {
  /* =========================================
     MOBILE
  ========================================= */

  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);

  /* =========================================
     DESKTOP
  ========================================= */

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  /* =========================================
     CATEGORY
  ========================================= */

  const [categoryOpen, setCategoryOpen] = useState(false);

  /* =========================================
     SEARCH
  ========================================= */

  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<SearchProduct[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);

  /* =========================================
     SCROLL
  ========================================= */

  const [scrolled, setScrolled] = useState(false);

  /* =========================================
     AUTH
  ========================================= */

  const { data: session } = useSession();

  /* =========================================
     CART
  ========================================= */

  const { totalItems } = useCart();

  /* =========================================
     THEME
  ========================================= */

  const { theme, setTheme } = useTheme();

  const isDark = theme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  /* =========================================
     REFS
  ========================================= */

  const searchRef = useRef<HTMLDivElement>(null);
  const searchCategoryRef = useRef<HTMLDivElement>(null);
  const navCategoryRef = useRef<HTMLDivElement>(null);

  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* =========================================
     SCROLL EFFECT
  ========================================= */

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* =========================================
     SEARCH TIMER CLEANUP
  ========================================= */

  useEffect(() => {
    return () => {
      if (searchTimer.current) {
        clearTimeout(searchTimer.current);
      }
    };
  }, []);

  /* =========================================
     OUTSIDE CLICK
  ========================================= */

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        searchRef.current &&
        !searchRef.current.contains(target)
      ) {
        setSearchOpen(false);
      }

      if (
        searchCategoryRef.current &&
        !searchCategoryRef.current.contains(target) &&
        navCategoryRef.current &&
        !navCategoryRef.current.contains(target)
      ) {
        setCategoryOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  /* =========================================
     SEARCH
  ========================================= */

  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = e.target.value;

    setQuery(value);

    if (searchTimer.current) {
      clearTimeout(searchTimer.current);
    }

    const keyword = value.trim();

    if (!keyword) {
      setProducts([]);
      setSearchLoading(false);
      setSearchOpen(false);
      return;
    }

    setSearchOpen(true);
    setSearchLoading(true);

    searchTimer.current = setTimeout(async () => {
      try {
        if (!API) {
          console.error(
            "NEXT_PUBLIC_API_URL is not configured.",
          );

          setProducts([]);
          setSearchLoading(false);

          return;
        }

        const response = await fetch(
          `${API}/products?search=${encodeURIComponent(
            keyword,
          )}&limit=6`,
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
            `Search request failed: ${response.status}`,
          );
        }

        const json = await response.json();

        const result =
          json?.data?.products ??
          (Array.isArray(json?.data)
            ? json.data
            : json?.products ?? []);

        setProducts(
          Array.isArray(result) ? result : [],
        );
      } catch (error) {
        console.error("Search error:", error);
        setProducts([]);
      } finally {
        setSearchLoading(false);
      }
    }, 350);
  };

  /* =========================================
     CLEAR SEARCH
  ========================================= */

  const clearSearch = () => {
    if (searchTimer.current) {
      clearTimeout(searchTimer.current);
    }

    setQuery("");
    setProducts([]);
    setSearchLoading(false);
    setSearchOpen(false);
  };

  /* =========================================
     PRODUCT PRICE
  ========================================= */

  const getProductPrice = (product: SearchProduct) => {
    if (
      product.isFlashSale &&
      typeof product.flashSalePrice === "number"
    ) {
      return product.flashSalePrice;
    }

    return product.price;
  };

  /* =========================================
     CLOSE MOBILE
  ========================================= */

  const closeMobileMenu = () => {
    setMobileOpen(false);
    setMobileDropdown(null);
    setCategoryOpen(false);
    setSearchOpen(false);
  };

  /* =========================================
     THEME CLASSES
  ========================================= */

  const headerBg = isDark
    ? "bg-gray-950"
    : "bg-white";

  const textMain = isDark
    ? "text-gray-100"
    : "text-gray-900";

  const textSecondary = isDark
    ? "text-gray-400"
    : "text-gray-500";

  const borderColor = isDark
    ? "border-gray-800"
    : "border-gray-100";

  /* =========================================
     RETURN
  ========================================= */

  return (
    <header
      className={`relative z-40 w-full transition-colors duration-300 ${headerBg} ${
        scrolled
          ? isDark
            ? "shadow-lg shadow-black/20"
            : "shadow-md"
          : ""
      }`}
    >
      {/* =====================================
          MAIN HEADER
      ===================================== */}

      <div className={`border-b ${borderColor}`}>

        <div className="mx-auto max-w-[1700px] px-5">
          <div className="flex min-h-[84px] items-center gap-6">

            {/* LOGO */}

            <Link
              href="/"
              className="flex shrink-0 items-center"
            >
              <Image
                src="/assets/logo-orange.svg"
                alt="ERNA"
                width={160}
                height={50}
                priority
                className="h-auto w-[150px] md:w-[160px]"
              />
            </Link>

            {/* DESKTOP SEARCH */}

            <div
              ref={searchRef}
              className="relative hidden flex-1 lg:block"
            >
              <div
                className={`mx-auto flex h-[44px] max-w-[700px] overflow-visible rounded-lg border transition-colors ${
                  isDark
                    ? "border-gray-700 bg-gray-900"
                    : "border-gray-200 bg-white"
                }`}
              >
                {/* CATEGORY */}

                <div
                  ref={searchCategoryRef}
                  className="relative"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setCategoryOpen(
                        (previous) => !previous,
                      )
                    }
                    className={`flex h-full w-[145px] shrink-0 items-center justify-between rounded-l-lg border-r px-4 text-sm transition-colors ${
                      isDark
                        ? "border-gray-700 text-gray-300 hover:bg-gray-800"
                        : "border-gray-200 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <span>All Categories</span>

                    <ChevronDown
                      size={15}
                      className={`transition-transform ${
                        categoryOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {categoryOpen && (
                    <div
                      className={`absolute left-0 top-[48px] z-[100] w-[220px] overflow-hidden rounded-lg border p-1.5 shadow-xl ${
                        isDark
                          ? "border-gray-700 bg-gray-900"
                          : "border-gray-100 bg-white"
                      }`}
                    >
                      <Link
                        href="/categories"
                        onClick={() =>
                          setCategoryOpen(false)
                        }
                        className={`block rounded-md px-3 py-2.5 text-sm transition ${
                          isDark
                            ? "text-gray-300 hover:bg-gray-800 hover:text-[#FD5B44]"
                            : "text-gray-700 hover:bg-gray-50 hover:text-[#FD5B44]"
                        }`}
                      >
                        All Categories
                      </Link>

                      <Link
                        href="/products"
                        onClick={() =>
                          setCategoryOpen(false)
                        }
                        className={`block rounded-md px-3 py-2.5 text-sm transition ${
                          isDark
                            ? "text-gray-300 hover:bg-gray-800 hover:text-[#FD5B44]"
                            : "text-gray-700 hover:bg-gray-50 hover:text-[#FD5B44]"
                        }`}
                      >
                        All Products
                      </Link>
                    </div>
                  )}
                </div>

                {/* INPUT */}

                <input
                  value={query}
                  onChange={handleSearchChange}
                  onFocus={() => {
                    if (query.trim()) {
                      setSearchOpen(true);
                    }
                  }}
                  type="text"
                  placeholder="Search for a product or brand..."
                  className={`min-w-0 flex-1 bg-transparent px-5 text-sm outline-none placeholder:text-gray-400 ${
                    isDark
                      ? "text-gray-100"
                      : "text-gray-800"
                  }`}
                />

                {/* CLEAR */}

                {query && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    aria-label="Clear search"
                    className={`px-3 transition ${
                      isDark
                        ? "text-gray-500 hover:text-gray-200"
                        : "text-gray-400 hover:text-gray-700"
                    }`}
                  >
                    <X size={17} />
                  </button>
                )}

                {/* SEARCH BUTTON */}

                <button
                  type="button"
                  onClick={() => {
                    if (query.trim()) {
                      setSearchOpen(true);
                    }
                  }}
                  aria-label="Search"
                  className="flex w-[58px] shrink-0 items-center justify-center rounded-r-lg bg-[#FD5B44] text-white transition hover:bg-[#f14e38]"
                >
                  <Search size={21} />
                </button>
              </div>

              {/* DESKTOP SEARCH RESULTS */}

              {searchOpen && (
                <div
                  className={`absolute left-1/2 top-[52px] z-[90] w-full max-w-[700px] -translate-x-1/2 overflow-hidden rounded-lg border shadow-xl ${
                    isDark
                      ? "border-gray-700 bg-gray-900"
                      : "border-gray-100 bg-white"
                  }`}
                >
                  {searchLoading ? (
                    <div className="flex items-center justify-center gap-2 px-4 py-7">
                      <Loader2 className="h-5 w-5 animate-spin text-[#FD5B44]" />

                      <span
                        className={`text-sm ${textSecondary}`}
                      >
                        Searching...
                      </span>
                    </div>
                  ) : products.length > 0 ? (
                    <>
                      <div className="max-h-[360px] overflow-y-auto">
                        {products.map((product) => (
                          <Link
                            key={product._id}
                            href={`/products/${product._id}`}
                            onClick={clearSearch}
                            className={`flex items-center gap-3 border-b px-4 py-3 transition ${
                              isDark
                                ? "border-gray-800 hover:bg-gray-800"
                                : "border-gray-100 hover:bg-gray-50"
                            }`}
                          >
                            <div
                              className={`relative h-12 w-12 shrink-0 overflow-hidden rounded-md ${
                                isDark
                                  ? "bg-gray-800"
                                  : "bg-gray-50"
                              }`}
                            >
                              <Image
                                src={
                                  product.images?.[0] ||
                                  product.image ||
                                  "/placeholder.svg"
                                }
                                alt={
                                  product.name || "Product"
                                }
                                fill
                                sizes="48px"
                                className="object-contain p-1"
                              />
                            </div>

                            <div className="min-w-0 flex-1">
                              <p
                                className={`truncate text-sm font-medium ${textMain}`}
                              >
                                {product.name}
                              </p>

                              <p className="mt-1 text-sm font-bold text-[#FD5B44]">
                                $
                                {Number(
                                  getProductPrice(product) || 0,
                                ).toFixed(2)}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>

                      <Link
                        href={`/products?search=${encodeURIComponent(
                          query.trim(),
                        )}`}
                        onClick={clearSearch}
                        className={`block border-t px-4 py-3 text-center text-sm font-semibold text-[#FD5B44] ${
                          isDark
                            ? "border-gray-800 hover:bg-gray-800"
                            : "border-gray-100 hover:bg-gray-50"
                        }`}
                      >
                        View all results
                      </Link>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center px-4 py-8 text-center">
                      <PackageSearch className="mb-2 h-8 w-8 text-gray-400" />

                      <p
                        className={`text-sm font-medium ${textMain}`}
                      >
                        No products found
                      </p>

                      <p
                        className={`mt-1 text-xs ${textSecondary}`}
                      >
                        Try a different search keyword.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

             {/* THEME TOGGLE */}

            <button
              type="button"
              onClick={toggleTheme}
              aria-label={
                isDark
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
              title={
                isDark
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                isDark
                  ? "border-gray-700 bg-gray-900 text-yellow-400 hover:bg-gray-800"
                  : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              {isDark ? (
                <Sun size={20} />
              ) : (
                <Moon size={20} />
              )}
            </button>

            {/* ACCOUNT */}

            <Link
              href={session ? "/profile" : "/login"}
              className="hidden shrink-0 items-center gap-3 lg:flex"
            >
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-full border ${
                  isDark
                    ? "border-gray-700 bg-gray-900 text-gray-200"
                    : "border-gray-100 bg-white text-gray-800"
                }`}
              >
                <User size={22} />
              </div>

              <div className="leading-tight">
                <p
                  className={`text-[12px] ${textSecondary}`}
                >
                  My Account
                </p>

                <p
                  className={`text-sm font-semibold ${textMain}`}
                >
                  {session
                    ? "My Profile"
                    : "Login / Register"}
                </p>
              </div>
            </Link>

           

            {/* DIVIDER */}

            <div
              className={`hidden h-10 w-px lg:block ${
                isDark
                  ? "bg-gray-800"
                  : "bg-gray-200"
              }`}
            />

            {/* CART */}

            <Link
              href="/cart"
              className="hidden shrink-0 items-center gap-3 lg:flex"
            >
              <div
                className={`relative flex h-11 w-11 items-center justify-center rounded-full border ${
                  isDark
                    ? "border-gray-700 bg-gray-900 text-gray-200"
                    : "border-gray-100 bg-white text-gray-800"
                }`}
              >
                <ShoppingCart size={22} />

                {totalItems > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#FD5B44] px-1 text-[10px] font-bold text-white">
                    {totalItems > 99 ? "99+" : totalItems}
                  </span>
                )}
              </div>

              <div className="leading-tight">
                <p
                  className={`text-[12px] ${textSecondary}`}
                >
                  Your Cart
                </p>

                <p
                  className={`text-sm font-semibold ${textMain}`}
                >
                  $0.00
                </p>
              </div>
            </Link>

            {/* MOBILE BUTTON */}

            <button
              type="button"
              onClick={() =>
                setMobileOpen((previous) => !previous)
              }
              aria-label={
                mobileOpen ? "Close menu" : "Open menu"
              }
              className="ml-auto flex h-11 w-11 items-center justify-center rounded-lg bg-[#FD5B44] text-white lg:hidden"
            >
              {mobileOpen ? (
                <X size={22} />
              ) : (
                <Menu size={22} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* =========================================
          DESKTOP NAV
      ========================================= */}

      <div
        className={`hidden border-b lg:block ${
          isDark
            ? "border-gray-800"
            : "border-gray-200"
        }`}
      >
        <div className="mx-auto max-w-[1700px] px-5">
          <div className="flex h-[49px] items-center">

            {/* ALL CATEGORIES */}

            <div
              ref={navCategoryRef}
              className="relative h-full"
            >
              <button
                type="button"
                onClick={() =>
                  setCategoryOpen(
                    (previous) => !previous,
                  )
                }
                className={`flex h-full w-[215px] items-center gap-4 border-l border-r px-5 text-sm font-semibold ${
                  isDark
                    ? "border-gray-800 text-gray-100"
                    : "border-gray-200 text-gray-900"
                }`}
              >
                <Menu size={23} />

                <span>All Categories</span>

                <ChevronDown
                  size={15}
                  className={`ml-auto transition-transform ${
                    categoryOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {categoryOpen && (
                <div
                  className={`absolute left-0 top-[49px] z-[100] w-[215px] overflow-hidden rounded-b-lg border border-t-0 p-2 shadow-xl ${
                    isDark
                      ? "border-gray-800 bg-gray-900"
                      : "border-gray-200 bg-white"
                  }`}
                >
                  <Link
                    href="/categories"
                    onClick={() =>
                      setCategoryOpen(false)
                    }
                    className={`block rounded-md px-3 py-2.5 text-sm ${
                      isDark
                        ? "text-gray-300 hover:bg-gray-800 hover:text-[#FD5B44]"
                        : "text-gray-700 hover:bg-gray-50 hover:text-[#FD5B44]"
                    }`}
                  >
                    All Categories
                  </Link>

                  <Link
                    href="/products"
                    onClick={() =>
                      setCategoryOpen(false)
                    }
                    className={`block rounded-md px-3 py-2.5 text-sm ${
                      isDark
                        ? "text-gray-300 hover:bg-gray-800 hover:text-[#FD5B44]"
                        : "text-gray-700 hover:bg-gray-50 hover:text-[#FD5B44]"
                    }`}
                  >
                    All Products
                  </Link>
                </div>
              )}
            </div>

            {/* NAV LINKS */}

            <nav className="ml-10 flex h-full items-center gap-0">
              {navLinks.map((link, index) => {
                const hasDropdown =
                  !!link.dropdown &&
                  link.dropdown.length > 0;

                return (
                  <div
                    key={link.href}
                    className="relative flex h-full items-center"
                    onMouseEnter={() => {
                      if (hasDropdown) {
                        setOpenDropdown(link.name);
                      }
                    }}
                    onMouseLeave={() => {
                      if (hasDropdown) {
                        setOpenDropdown(null);
                      }
                    }}
                  >
                    <div className="flex h-full items-center">
                      <Link
                        href={link.href}
                        className={`flex h-full items-center gap-1 px-5 text-sm font-medium transition ${
                          isDark
                            ? "text-gray-200 hover:text-[#FD5B44]"
                            : "text-gray-800 hover:text-[#FD5B44]"
                        }`}
                      >
                        {link.name}

                        {hasDropdown && (
                          <ChevronDown
                            size={13}
                            className={`transition-transform ${
                              openDropdown === link.name
                                ? "rotate-180"
                                : ""
                            }`}
                          />
                        )}
                      </Link>

                      {index !== navLinks.length - 1 && (
                        <span
                          className={`h-5 w-px ${
                            isDark
                              ? "bg-gray-800"
                              : "bg-gray-200"
                          }`}
                        />
                      )}
                    </div>

                    {hasDropdown && (
                      <div
                        className={`absolute left-0 top-[49px] z-[100] pt-1 transition-all duration-150 ${
                          openDropdown === link.name
                            ? "visible translate-y-0 opacity-100"
                            : "invisible translate-y-1 opacity-0"
                        }`}
                      >
                        <div
                          className={`w-[190px] overflow-hidden rounded-b-lg border p-2 shadow-xl ${
                            isDark
                              ? "border-gray-800 bg-gray-900"
                              : "border-gray-200 bg-white"
                          }`}
                        >
                          {link.dropdown?.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={() =>
                                setOpenDropdown(null)
                              }
                              className={`block rounded-md px-3 py-2.5 text-sm transition ${
                                isDark
                                  ? "text-gray-300 hover:bg-gray-800 hover:text-[#FD5B44]"
                                  : "text-gray-700 hover:bg-gray-50 hover:text-[#FD5B44]"
                              }`}
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* SHIPPING */}

            <div className="ml-auto flex items-center gap-3">
              <div className="text-[#FD5B44]">
                <svg
                  width="42"
                  height="30"
                  viewBox="0 0 42 30"
                  fill="none"
                >
                  <path
                    d="M1 7H25V23H1V7Z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />

                  <path
                    d="M25 12H33L40 19V23H25V12Z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />

                  <circle
                    cx="9"
                    cy="24"
                    r="3"
                    stroke="currentColor"
                    strokeWidth="2"
                  />

                  <circle
                    cx="32"
                    cy="24"
                    r="3"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </div>

              <div className="leading-tight">
                <p
                  className={`text-[12px] ${textSecondary}`}
                >
                  Free Shipping
                </p>

                <p
                  className={`text-[12px] font-bold ${textMain}`}
                >
                  OVER ORDER $280
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================
          MOBILE MENU
      ========================================= */}

      {mobileOpen && (
        <div
          className={`border-t lg:hidden ${
            isDark
              ? "border-gray-800 bg-gray-950"
              : "border-gray-200 bg-white"
          }`}
        >
          <div className="space-y-2 px-5 py-5">

            {/* MOBILE SEARCH */}

            <div className="relative">
              <div
                className={`flex h-11 overflow-hidden rounded-lg border ${
                  isDark
                    ? "border-gray-700 bg-gray-900"
                    : "border-gray-200 bg-white"
                }`}
              >
                <input
                  value={query}
                  onChange={handleSearchChange}
                  onFocus={() => {
                    if (query.trim()) {
                      setSearchOpen(true);
                    }
                  }}
                  type="text"
                  placeholder="Search for a product or brand..."
                  className={`min-w-0 flex-1 bg-transparent px-4 text-sm outline-none placeholder:text-gray-400 ${
                    isDark
                      ? "text-white"
                      : "text-gray-800"
                  }`}
                />

                {query && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="px-2 text-gray-400"
                  >
                    <X size={17} />
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => {
                    if (query.trim()) {
                      setSearchOpen(true);
                    }
                  }}
                  className="flex w-12 shrink-0 items-center justify-center bg-[#FD5B44] text-white"
                >
                  <Search size={20} />
                </button>
              </div>

              {/* MOBILE SEARCH RESULT */}

              {searchOpen && (
                <div
                  className={`absolute left-0 right-0 top-12 z-[100] overflow-hidden rounded-lg border shadow-xl ${
                    isDark
                      ? "border-gray-700 bg-gray-900"
                      : "border-gray-100 bg-white"
                  }`}
                >
                  {searchLoading ? (
                    <div className="flex items-center justify-center gap-2 px-4 py-6">
                      <Loader2 className="h-5 w-5 animate-spin text-[#FD5B44]" />

                      <span
                        className={`text-sm ${textSecondary}`}
                      >
                        Searching...
                      </span>
                    </div>
                  ) : products.length > 0 ? (
                    <>
                      <div className="max-h-72 overflow-y-auto">
                        {products.map((product) => (
                          <Link
                            key={product._id}
                            href={`/products/${product._id}`}
                            onClick={() => {
                              clearSearch();
                              closeMobileMenu();
                            }}
                            className={`flex items-center gap-3 border-b px-3 py-3 ${
                              isDark
                                ? "border-gray-800 hover:bg-gray-800"
                                : "border-gray-100 hover:bg-gray-50"
                            }`}
                          >
                            <div
                              className={`relative h-11 w-11 shrink-0 overflow-hidden rounded-md ${
                                isDark
                                  ? "bg-gray-800"
                                  : "bg-gray-50"
                              }`}
                            >
                              <Image
                                src={
                                  product.images?.[0] ||
                                  product.image ||
                                  "/placeholder.svg"
                                }
                                alt={
                                  product.name || "Product"
                                }
                                fill
                                sizes="44px"
                                className="object-contain p-1"
                              />
                            </div>

                            <div className="min-w-0">
                              <p
                                className={`truncate text-sm font-medium ${textMain}`}
                              >
                                {product.name}
                              </p>

                              <p className="text-sm font-bold text-[#FD5B44]">
                                $
                                {Number(
                                  getProductPrice(product) || 0,
                                ).toFixed(2)}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>

                      <Link
                        href={`/products?search=${encodeURIComponent(
                          query.trim(),
                        )}`}
                        onClick={() => {
                          clearSearch();
                          closeMobileMenu();
                        }}
                        className={`block border-t px-4 py-3 text-center text-sm font-semibold text-[#FD5B44] ${
                          isDark
                            ? "border-gray-800 hover:bg-gray-800"
                            : "border-gray-100 hover:bg-gray-50"
                        }`}
                      >
                        View all results
                      </Link>
                    </>
                  ) : (
                    <div className="px-4 py-6 text-center">
                      <PackageSearch className="mx-auto mb-2 h-7 w-7 text-gray-400" />

                      <p
                        className={`text-sm ${textSecondary}`}
                      >
                        No products found
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* MOBILE NAV */}

            {navLinks.map((link) => {
              const hasDropdown =
                !!link.dropdown &&
                link.dropdown.length > 0;

              if (!hasDropdown) {
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMobileMenu}
                    className={`block rounded-lg px-4 py-3 text-sm font-medium ${
                      isDark
                        ? "text-gray-200 hover:bg-gray-800 hover:text-[#FD5B44]"
                        : "text-gray-800 hover:bg-gray-50 hover:text-[#FD5B44]"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              }

              const opened =
                mobileDropdown === link.name;

              return (
                <div key={link.href}>
                  <div className="flex items-center">
                    <Link
                      href={link.href}
                      onClick={closeMobileMenu}
                      className={`flex-1 rounded-l-lg px-4 py-3 text-sm font-medium ${
                        isDark
                          ? "text-gray-200 hover:bg-gray-800"
                          : "text-gray-800 hover:bg-gray-50"
                      }`}
                    >
                      {link.name}
                    </Link>

                    <button
                      type="button"
                      onClick={() =>
                        setMobileDropdown(
                          opened ? null : link.name,
                        )
                      }
                      className={`rounded-r-lg px-3 py-3 ${
                        isDark
                          ? "text-gray-300 hover:bg-gray-800"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <ChevronDown
                        size={17}
                        className={`transition-transform ${
                          opened ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </div>

                  {opened && (
                    <div
                      className={`ml-4 mt-1 space-y-1 border-l-2 pl-3 ${
                        isDark
                          ? "border-[#FD5B44]/30"
                          : "border-[#FD5B44]/20"
                      }`}
                    >
                      {link.dropdown?.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={closeMobileMenu}
                          className={`block rounded-lg px-3 py-2.5 text-sm ${
                            isDark
                              ? "text-gray-400 hover:bg-gray-800 hover:text-[#FD5B44]"
                              : "text-gray-600 hover:bg-gray-50 hover:text-[#FD5B44]"
                          }`}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* MOBILE THEME */}

            <button
              type="button"
              onClick={toggleTheme}
              className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium ${
                isDark
                  ? "bg-gray-900 text-gray-200 hover:bg-gray-800"
                  : "bg-gray-50 text-gray-800 hover:bg-gray-100"
              }`}
            >
              {isDark ? (
                <>
                  <Sun
                    size={19}
                    className="text-yellow-400"
                  />

                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <Moon size={19} />

                  <span>Dark Mode</span>
                </>
              )}
            </button>

            {/* MOBILE CART */}

            <Link
              href="/cart"
              onClick={closeMobileMenu}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium ${
                isDark
                  ? "bg-gray-900 text-gray-200 hover:bg-gray-800"
                  : "bg-gray-50 text-gray-800 hover:bg-gray-100"
              }`}
            >
              <ShoppingCart size={19} />

              <span>Shopping Cart</span>

              {totalItems > 0 && (
                <span className="ml-auto rounded-full bg-[#FD5B44] px-2 py-0.5 text-xs font-bold text-white">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}