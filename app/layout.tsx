import type { Metadata, Viewport } from "next";
import { Cedarville_Cursive, Inter, Kanit } from "next/font/google";
import type { PropsWithChildren } from "react";

import { CustomCursor } from "@/components/main/custom-cursor";
import { Footer } from "@/components/main/footer";
import { Navbar } from "@/components/main/navbar";
import { SmoothScroll } from "@/components/main/smooth-scroll";
import { StarsCanvas } from "@/components/main/star-background";
import { siteConfig } from "@/config";
import { cn } from "@/lib/utils";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const kanit = Kanit({
  subsets: ["latin"],
  weight: "900",
  variable: "--font-kanit",
  display: "swap",
});
const cursive = Cedarville_Cursive({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-cursive",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#030014",
};

export const metadata: Metadata = siteConfig;

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body
        className={cn(
          "bg-[#030014] overflow-y-scroll overflow-x-hidden",
          inter.className,
          kanit.variable,
          cursive.variable
        )}
      >
        <StarsCanvas />
        <div className="grain" aria-hidden="true" />
        <CustomCursor />
        <Navbar />
        <SmoothScroll>{children}</SmoothScroll>
        <Footer />
      </body>
    </html>
  );
}
