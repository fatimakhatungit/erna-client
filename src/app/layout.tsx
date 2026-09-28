import type { Metadata } from "next";
import { Jost, DM_Sans } from "next/font/google";
import "./globals.css";

import { ToastProvider } from "@/context/ToastContext";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import ThemeProvider from "./theme-provider";
import SmoothScroll from "@/components/SmoothScroll";

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "erna — Multi-Vendor E-Commerce",
  description: "erna — Modern Multi-Vendor E-Commerce Platform.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
       className={`${jost.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground dark:bg-[#0b1325]">
        <SmoothScroll>
          <ThemeProvider>
            <ToastProvider>
              <CartProvider>
                <WishlistProvider>
                  {/* <Navbar /> */}

                  <main className="flex-grow">{children}</main>

                  {/* <Footer /> */}
                </WishlistProvider>
              </CartProvider>
            </ToastProvider>
          </ThemeProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}