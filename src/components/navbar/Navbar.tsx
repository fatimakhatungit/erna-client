"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Menu,
  X,
  User,
  LogOut,
  LayoutDashboard,
  ShoppingCart,
  ChevronDown,
  Store,
  Heart,
  CreditCard,
} from "lucide-react";

import { signOut, useSession } from "@/lib/auth-client";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [role, setRole] = useState("");

  const router = useRouter();
  const { data: session, isPending } = useSession();

  // =========================================================
  // GET USER ROLE
  // =========================================================
  useEffect(() => {
    const getRole = async () => {
      try {
        if (!session?.user?.email) {
          setRole("");
          return;
        }

        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        if (!apiUrl) {
          console.error("NEXT_PUBLIC_API_URL is not defined");
          return;
        }

        const res = await fetch(
          `${apiUrl}/users/${encodeURIComponent(session.user.email)}`
        );

        if (!res.ok) {
          console.error("Failed to fetch user role:", res.status);
          return;
        }

        const data = await res.json();

        setRole(data?.role?.toLowerCase() || "");
      } catch (error) {
        console.error("Failed to get user role:", error);
      }
    };

    getRole();
  }, [session]);

  // =========================================================
  // NAVBAR SCROLL EFFECT
  // =========================================================
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // =========================================================
  // LOGOUT
  // =========================================================
  const handleLogout = async () => {
    try {
      await signOut();

      setIsMenuOpen(false);
      setIsShopOpen(false);

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // =========================================================
  // DASHBOARD ROUTE
  // =========================================================
  const getDashboardRoute = () => {
    if (role === "admin") {
      return "/dashboard/admin";
    }

    if (role === "seller") {
      return "/dashboard/seller";
    }

    return "/dashboard";
  };

  // =========================================================
  // CLOSE MOBILE MENU
  // =========================================================
  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsShopOpen(false);
  };

  // =========================================================
  // USER IMAGE
  // =========================================================
  const userImage =
    session?.user?.image || "/assets/default-user.png";

  return (
    <nav
      className={`fixed left-0 top-0 z-[9999] w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/95 shadow-md backdrop-blur-md"
          : "bg-white shadow-sm"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* =====================================================
              LOGO
          ====================================================== */}
          <Link
            href="/"
            onClick={closeMenu}
            className="flex items-center gap-2"
          >
            <div className="p-2">
                <Image
                  src="/assets/logo.svg"
                  height={50}
                  width={178} 
                  alt="logo"
                />
              </div>
          </Link>

          {/* =====================================================
              DESKTOP NAVIGATION
          ====================================================== */}
          <div className="hidden items-center gap-5 md:flex lg:gap-7">

            {/* HOME */}
            <Link
              href="/"
              className="text-sm font-medium text-gray-700 transition hover:text-[#ff594d] lg:text-base"
            >
              Home
            </Link>

            {/* PRODUCTS */}
            <Link
              href="/products"
              className="text-sm font-medium text-gray-700 transition hover:text-[#ff594d] lg:text-base"
            >
              Product
            </Link>

            {/* =================================================
                SHOP DROPDOWN
            ================================================== */}
            <div className="group relative">
              <Link
                href="/shop"
                className="flex items-center gap-1 text-sm font-medium text-gray-700 transition hover:text-[#ff594d] lg:text-base"
              >
                Shop

                <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
              </Link>

              {/* SHOP SUBMENU */}
              <div
                className="
                  invisible absolute left-0 top-full mt-3 w-56
                  translate-y-2 overflow-hidden rounded-2xl
                  bg-white p-2 opacity-0 shadow-xl
                  ring-1 ring-black/5
                  transition-all duration-200
                  group-hover:visible
                  group-hover:translate-y-0
                  group-hover:opacity-100
                "
              >
                {/* Shop */}
                <Link
                  href="/shop"
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-[#ff594d]/10 hover:text-[#ff594d]"
                >
                  <Store className="h-4 w-4" />
                  Shop
                </Link>

                {/* Shop Details */}
                <Link
                  href="/shop-details"
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-[#ff594d]/10 hover:text-[#ff594d]"
                >
                  <Store className="h-4 w-4" />
                  Shop Details
                </Link>

                {/* Cart */}
                <Link
                  href="/cart"
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-[#ff594d]/10 hover:text-[#ff594d]"
                >
                  <ShoppingCart className="h-4 w-4" />
                  Cart
                </Link>

                {/* Wishlist */}
                <Link
                  href="/wishlist"
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-[#ff594d]/10 hover:text-[#ff594d]"
                >
                  <Heart className="h-4 w-4" />
                  Wishlist
                </Link>

                {/* Checkout */}
                <Link
                  href="/checkout"
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-[#ff594d]/10 hover:text-[#ff594d]"
                >
                  <CreditCard className="h-4 w-4" />
                  Checkout
                </Link>
              </div>
            </div>

            {/* CATEGORIES */}
            <Link
              href="/categories"
              className="text-sm font-medium text-gray-700 transition hover:text-[#ff594d] lg:text-base"
            >
              Categories
            </Link>

            {/* ABOUT */}
            <Link
              href="/about"
              className="text-sm font-medium text-gray-700 transition hover:text-[#ff594d] lg:text-base"
            >
              About
            </Link>

            {/* CONTACT */}
            <Link
              href="/contact"
              className="text-sm font-medium text-gray-700 transition hover:text-[#ff594d] lg:text-base"
            >
              Contact
            </Link>
          </div>

          {/* =====================================================
              DESKTOP RIGHT SIDE
          ====================================================== */}
          <div className="hidden items-center gap-3 md:flex">

            {/* CART */}
            <Link
              href="/cart"
              className="relative rounded-xl p-2.5 text-gray-700 transition hover:bg-gray-100 hover:text-[#ff594d]"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="h-5 w-5" />
            </Link>

            {/* WISHLIST */}
            <Link
              href="/wishlist"
              className="relative rounded-xl p-2.5 text-gray-700 transition hover:bg-gray-100 hover:text-[#ff594d]"
              aria-label="Wishlist"
            >
              <Heart className="h-5 w-5" />
            </Link>

            {/* =================================================
                LOGIN / REGISTER
            ================================================== */}
            {!isPending && !session ? (
              <>
                {/* LOGIN */}
                <Link
                  href="/login"
                  className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 hover:text-[#ff594d]"
                >
                  <User className="h-5 w-5" />
                  Login
                </Link>

                {/* REGISTER */}
                <Link
                  href="/register"
                  className="rounded-xl bg-[#ff594d] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#e94d43]"
                >
                  Register
                </Link>
              </>
            ) : !isPending && session ? (
              /* =================================================
                 LOGGED IN USER
              ================================================== */
              <div className="group relative">

                {/* USER BUTTON */}
                <div className="flex cursor-pointer items-center gap-2 rounded-xl px-2 py-1.5 transition hover:bg-gray-100">

                  <Image
                    src={userImage}
                    width={38}
                    height={38}
                    alt="User"
                    className="h-9 w-9 rounded-full object-cover"
                  />

                  <span className="max-w-[120px] truncate text-sm font-semibold text-gray-700">
                    {session.user?.name || "User"}
                  </span>

                  <ChevronDown className="h-4 w-4 text-gray-500 transition-transform duration-200 group-hover:rotate-180" />
                </div>

                {/* USER DROPDOWN */}
                <div
                  className="
                    invisible absolute right-0 top-12 w-60
                    translate-y-2 overflow-hidden rounded-2xl
                    bg-white opacity-0 shadow-xl
                    ring-1 ring-black/5
                    transition-all duration-200
                    group-hover:visible
                    group-hover:translate-y-0
                    group-hover:opacity-100
                  "
                >
                  {/* USER INFO */}
                  <div className="border-b border-gray-100 bg-gray-50 px-4 py-4">
                    <div className="flex items-center gap-3">

                      <Image
                        src={userImage}
                        width={42}
                        height={42}
                        alt="User"
                        className="h-10 w-10 rounded-full object-cover"
                      />

                      <div className="min-w-0">
                        <p className="truncate font-semibold text-gray-900">
                          {session.user?.name || "User"}
                        </p>

                        <p className="truncate text-xs text-gray-500">
                          {session.user?.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* DASHBOARD */}
                  <Link
                    href={getDashboardRoute()}
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 hover:text-[#ff594d]"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </Link>

                  {/* PROFILE */}
                  <Link
                    href="/profile"
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 hover:text-[#ff594d]"
                  >
                    <User className="h-4 w-4" />
                    Profile
                  </Link>

                  {/* CART */}
                  <Link
                    href="/cart"
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 hover:text-[#ff594d]"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    My Cart
                  </Link>

                  {/* WISHLIST */}
                  <Link
                    href="/wishlist"
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 hover:text-[#ff594d]"
                  >
                    <Heart className="h-4 w-4" />
                    Wishlist
                  </Link>

                  {/* LOGOUT */}
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 border-t border-gray-100 px-4 py-3 text-left text-sm font-medium text-red-500 transition hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              </div>
            ) : null}
          </div>

          {/* =====================================================
              MOBILE MENU BUTTON
          ====================================================== */}
          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="rounded-xl bg-[#ff594d] p-2.5 text-white shadow-sm transition hover:bg-[#e94d43] md:hidden"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* =========================================================
          MOBILE MENU
      ========================================================== */}
      {isMenuOpen && (
        <div className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-gray-100 bg-white shadow-xl md:hidden">

          {/* =====================================================
              MOBILE USER INFO
          ====================================================== */}
          {session && (
            <div className="border-b border-gray-100 bg-gray-50 px-5 py-4">
              <div className="flex items-center gap-3">

                <Image
                  src={userImage}
                  width={48}
                  height={48}
                  alt="User"
                  className="h-12 w-12 rounded-full object-cover ring-2 ring-[#ff594d]"
                />

                <div className="min-w-0">
                  <p className="truncate font-semibold text-gray-900">
                    {session.user?.name || "User"}
                  </p>

                  <p className="truncate text-xs text-gray-500">
                    {session.user?.email}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* =====================================================
              MOBILE NAVIGATION
          ====================================================== */}
          <div className="space-y-1 px-4 py-4">

            {/* HOME */}
            <Link
              href="/"
              onClick={closeMenu}
              className="block rounded-xl px-4 py-3 font-medium text-gray-700 transition hover:bg-gray-50 hover:text-[#ff594d]"
            >
              Home
            </Link>

            {/* PRODUCTS */}
            <Link
              href="/products"
              onClick={closeMenu}
              className="block rounded-xl px-4 py-3 font-medium text-gray-700 transition hover:bg-gray-50 hover:text-[#ff594d]"
            >
              Product
            </Link>

            {/* =================================================
                MOBILE SHOP
            ================================================== */}
            <div className="rounded-xl">

              {/* SHOP HEADER */}
              <button
                type="button"
                onClick={() => setIsShopOpen((prev) => !prev)}
                className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left font-medium text-gray-700 transition hover:bg-gray-50 hover:text-[#ff594d]"
              >
                <span className="flex items-center gap-3">
                  <Store className="h-5 w-5" />
                  Shop
                </span>

                <ChevronDown
                  className={`h-5 w-5 transition-transform duration-200 ${
                    isShopOpen ? "rotate-180 text-[#ff594d]" : ""
                  }`}
                />
              </button>

              {/* SHOP SUBMENU */}
              {isShopOpen && (
                <div className="ml-4 space-y-1 border-l-2 border-[#ff594d]/20 pl-3">

                  {/* Shop */}
                  <Link
                    href="/shop"
                    onClick={closeMenu}
                    className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-[#ff594d]/10 hover:text-[#ff594d]"
                  >
                    <Store className="h-4 w-4" />
                    Shop
                  </Link>

                  {/* Shop Details */}
                  <Link
                    href="/shop-details"
                    onClick={closeMenu}
                    className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-[#ff594d]/10 hover:text-[#ff594d]"
                  >
                    <Store className="h-4 w-4" />
                    Shop Details
                  </Link>

                  {/* Cart */}
                  <Link
                    href="/cart"
                    onClick={closeMenu}
                    className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-[#ff594d]/10 hover:text-[#ff594d]"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Cart
                  </Link>

                  {/* Wishlist */}
                  <Link
                    href="/wishlist"
                    onClick={closeMenu}
                    className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-[#ff594d]/10 hover:text-[#ff594d]"
                  >
                    <Heart className="h-4 w-4" />
                    Wishlist
                  </Link>

                  {/* Checkout */}
                  <Link
                    href="/checkout"
                    onClick={closeMenu}
                    className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-[#ff594d]/10 hover:text-[#ff594d]"
                  >
                    <CreditCard className="h-4 w-4" />
                    Checkout
                  </Link>
                </div>
              )}
            </div>

            {/* CATEGORIES */}
            <Link
              href="/categories"
              onClick={closeMenu}
              className="block rounded-xl px-4 py-3 font-medium text-gray-700 transition hover:bg-gray-50 hover:text-[#ff594d]"
            >
              Categories
            </Link>

            {/* ABOUT */}
            <Link
              href="/about"
              onClick={closeMenu}
              className="block rounded-xl px-4 py-3 font-medium text-gray-700 transition hover:bg-gray-50 hover:text-[#ff594d]"
            >
              About
            </Link>

            {/* CONTACT */}
            <Link
              href="/contact"
              onClick={closeMenu}
              className="block rounded-xl px-4 py-3 font-medium text-gray-700 transition hover:bg-gray-50 hover:text-[#ff594d]"
            >
              Contact
            </Link>

            {/* =================================================
                MOBILE CART
            ================================================== */}
            <Link
              href="/cart"
              onClick={closeMenu}
              className="flex items-center gap-3 rounded-xl bg-gray-50 px-4 py-3 font-medium text-gray-700 transition hover:text-[#ff594d]"
            >
              <ShoppingCart className="h-5 w-5" />
              Shopping Cart
            </Link>

            {/* MOBILE WISHLIST */}
            <Link
              href="/wishlist"
              onClick={closeMenu}
              className="flex items-center gap-3 rounded-xl bg-gray-50 px-4 py-3 font-medium text-gray-700 transition hover:text-[#ff594d]"
            >
              <Heart className="h-5 w-5" />
              Wishlist
            </Link>

            {/* =================================================
                LOGGED-IN LINKS
            ================================================== */}
            {session && (
              <>
                {/* DASHBOARD */}
                <Link
                  href={getDashboardRoute()}
                  onClick={closeMenu}
                  className="flex items-center gap-3 rounded-xl bg-[#ff594d]/10 px-4 py-3 font-semibold text-[#ff594d]"
                >
                  <LayoutDashboard className="h-5 w-5" />
                  Dashboard
                </Link>

                {/* PROFILE */}
                <Link
                  href="/profile"
                  onClick={closeMenu}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 font-medium text-gray-700 transition hover:bg-gray-50 hover:text-[#ff594d]"
                >
                  <User className="h-5 w-5" />
                  Profile
                </Link>
              </>
            )}
          </div>

          {/* =====================================================
              MOBILE AUTH
          ====================================================== */}
          <div className="border-t border-gray-100 p-4">

            {!session ? (
              <div className="grid grid-cols-2 gap-3">

                {/* LOGIN */}
                <Link
                  href="/login"
                  onClick={closeMenu}
                  className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
                >
                  <User className="h-5 w-5" />
                  Login
                </Link>

                {/* REGISTER */}
                <Link
                  href="/register"
                  onClick={closeMenu}
                  className="rounded-xl bg-[#ff594d] px-4 py-3 text-center font-semibold text-white transition hover:bg-[#e94d43]"
                >
                  Register
                </Link>

              </div>
            ) : (
              /* LOGOUT */
              <button
                onClick={handleLogout}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-50 px-4 py-3 font-semibold text-red-500 transition hover:bg-red-100"
              >
                <LogOut className="h-5 w-5" />
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

