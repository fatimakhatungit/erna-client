"use client";

import Link from "next/link";
import Image from "next/image";

import { Headphones } from "lucide-react";

import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaTelegramPlane,
  FaPaypal,
  FaAmazonPay,
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaCcDiscover,
} from "react-icons/fa";

const footerColumns = [
  {
    title: "About Company",
    links: [
      { title: "About Erna", href: "/about" },
      { title: "Affiliate Program", href: "/affiliate" },
      { title: "Privacy Policy", href: "/privacy-policy" },
      { title: "Awards & Ranking", href: "/awards" },
      { title: "Erna Careers", href: "/careers" },
      { title: "Newsroom", href: "/newsroom" },
      { title: "Erna Insider", href: "/insider" },
      { title: "Hours & Locations", href: "/locations" },
    ],
  },
  {
    title: "Customer Services",
    links: [
      { title: "Help Center", href: "/help-center" },
      { title: "Track an Order", href: "/track-order" },
      { title: "Return an Item", href: "/returns" },
      { title: "Gift Card", href: "/gift-card" },
      { title: "Report Abuse", href: "/report-abuse" },
      { title: "Submit and Dispute", href: "/dispute" },
      { title: "Policies & Rules", href: "/policies" },
      { title: "Redeem Voucher", href: "/voucher" },
    ],
  },
  {
    title: "My Account",
    links: [
      { title: "Login/Register", href: "/login" },
      { title: "Browsing History", href: "/history" },
      { title: "Order History", href: "/orders" },
      { title: "Returns History", href: "/returns/history" },
      { title: "Address Book", href: "/account/address" },
      { title: "Wish Lists", href: "/wishlist" },
      { title: "Subscription Orders", href: "/subscriptions" },
      { title: "Email Notifications", href: "/notifications" },
    ],
  },
  {
    title: "Information",
    links: [
      { title: "Become a Vendor", href: "/vendor" },
      { title: "Affiliate Program", href: "/affiliate" },
      { title: "Privacy Policy", href: "/privacy-policy" },
      { title: "Our Suppliers", href: "/suppliers" },
      { title: "Extended Plan", href: "/extended-plan" },
      { title: "Community", href: "/community" },
      { title: "Locality", href: "/locality" },
    ],
  },
  {
    title: "Tools & Resources",
    links: [
      { title: "Become a Supplier", href: "/supplier" },
      { title: "Sell on Erna", href: "/sell" },
      { title: "Become an Affiliate", href: "/affiliate" },
      { title: "Erna Creators", href: "/creators" },
      { title: "Shop by Brand", href: "/brands" },
      { title: "Mobile App", href: "/mobile-app" },
      { title: "Build Showcase", href: "/showcase" },
      { title: "Rules & Policy", href: "/rules" },
    ],
  },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "#",
    icon: FaFacebookF,
  },
  {
    label: "Twitter",
    href: "#",
    icon: FaTwitter,
  },
  {
    label: "Instagram",
    href: "#",
    icon: FaInstagram,
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: FaLinkedinIn,
  },
  {
    label: "YouTube",
    href: "#",
    icon: FaYoutube,
  },
  {
    label: "Telegram",
    href: "#",
    icon: FaTelegramPlane,
  },
];

export default function Footer() {
  return (
    <footer className="w-full bg-[#f4f8fc] px-4 pb-5 pt-10 dark:bg-black sm:px-6 lg:px-8">
      {/* Main Footer Card */}
      <div className="mx-auto max-w-[1800px] overflow-hidden rounded-[18px] bg-[#111111] text-white">
        <div className="px-7 py-10 sm:px-10 lg:px-12 xl:px-[60px] xl:py-14">
          {/* ================= MAIN FOOTER ================= */}
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.7fr_repeat(5,1fr)]">
            {/* ================= BRAND SECTION ================= */}
            <div className="pr-3">
              {/* Logo */}
              <Link
                href="/"
                className="mb-7 inline-flex items-center"
              >
                <Image
                  src="/assets/logo-orange.svg"
                  width={178}
                  height={50}
                  alt="ERNA"
                  className="h-auto w-[178px]"
                  priority
                />
              </Link>

              {/* Description */}
              <p className="max-w-[390px] text-[14px] leading-6 text-gray-300">
                Make Erna your one-stop electronics store for technology,
                consumer electronics, gaming components, and many more!
                Competitive pricing and frequent promotions, Erna features a
                diverse range of in-demand electronics and tech products.
              </p>

              {/* Hotline */}
              <div className="mt-7 flex items-center gap-4">
                <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full border-2 border-[#FD5B44] text-[#FD5B44]">
                  <Headphones className="h-7 w-7" />
                </div>

                <div>
                  <p className="text-[13px] text-gray-300">
                    Got Questions? 24/7 Hotline Call
                  </p>

                  <a
                    href="tel:+880123456789"
                    className="mt-1 block text-[24px] font-bold leading-none text-white transition-colors duration-300 hover:text-[#FD5B44]"
                  >
                    +00 123 456 789
                  </a>
                </div>
              </div>

              {/* Social Icons */}
              <div className="mt-7 flex flex-wrap gap-2.5">
                {socialLinks.map((social) => {
                  const Icon = social.icon;

                  return (
                    <Link
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      className="flex h-10 w-10 items-center justify-center rounded-md bg-[#f8eee5] text-[#FD5B44] transition-all duration-300 hover:-translate-y-1 hover:bg-[#FD5B44] hover:text-white"
                    >
                      <Icon className="h-[17px] w-[17px]" />
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* ================= FOOTER COLUMNS ================= */}
            {footerColumns.map((column) => (
              <div
                key={column.title}
                className="border-l border-white/15 pl-6 lg:pl-7"
              >
                <h3 className="mb-7 text-[15px] font-bold text-white">
                  {column.title}
                </h3>

                <ul className="space-y-[13px]">
                  {column.links.map((link) => (
                    <li key={`${column.title}-${link.title}`}>
                      <Link
                        href={link.href}
                        className="group relative inline-block text-[14px] text-gray-300 transition-all duration-200 hover:translate-x-1 hover:text-white"
                      >
                        {link.title}

                        <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-[#FD5B44] transition-all duration-300 group-hover:w-full" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* ================= DIVIDER ================= */}
          <div className="my-10 border-t border-white/15" />

          {/* ================= BOTTOM BAR ================= */}
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            {/* Copyright */}
            <p className="text-[14px] text-gray-300">
              ERNA eCommerce{" "}
              <span className="text-[#FD5B44]">©</span>{" "}
              {new Date().getFullYear()}{" "}
              <span className="text-[#FD5B44]">ERNA</span>. All Rights
              Reserved.
            </p>

            {/* Payment Methods */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="mr-2 text-[14px] text-gray-300">
                We Are Accepting
              </span>

              {/* PayPal */}
              <div
                className="flex h-8 min-w-[50px] items-center justify-center rounded-sm bg-white px-2"
                title="PayPal"
              >
                <FaPaypal className="h-4 w-4 text-[#003087]" />
              </div>

              {/* Amazon Pay */}
              <div
                className="flex h-8 min-w-[50px] items-center justify-center rounded-sm bg-white px-2"
                title="Amazon Pay"
              >
                <FaAmazonPay className="h-5 w-5 text-[#111111]" />
              </div>

              {/* Visa */}
              <div
                className="flex h-8 min-w-[50px] items-center justify-center rounded-sm bg-white px-2"
                title="Visa"
              >
                <FaCcVisa className="h-5 w-5 text-[#1434CB]" />
              </div>

              {/* Mastercard */}
              <div
                className="flex h-8 min-w-[50px] items-center justify-center rounded-sm bg-white px-2"
                title="Mastercard"
              >
                <FaCcMastercard className="h-5 w-5 text-[#EB001B]" />
              </div>

              {/* American Express */}
              <div
                className="flex h-8 min-w-[50px] items-center justify-center rounded-sm bg-white px-2"
                title="American Express"
              >
                <FaCcAmex className="h-5 w-5 text-[#006FCF]" />
              </div>

              {/* Discover */}
              <div
                className="flex h-8 min-w-[50px] items-center justify-center rounded-sm bg-white px-2"
                title="Discover"
              >
                <FaCcDiscover className="h-5 w-5 text-[#F76C00]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}