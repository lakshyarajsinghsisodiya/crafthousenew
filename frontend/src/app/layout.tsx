import type { Metadata } from "next";
import { Syne, Inter } from "next/font/google";
import { AppProviders } from "@/components/providers/AppProviders";
import { Navigation } from "@/components/ui/Navigation";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Crafthouse Media | Building Brands That People Remember",
  description:
    "Premium creative marketing agency for cafes, restaurants, and local businesses. Social media, content creation, SEO, and paid advertising.",
  keywords: [
    "marketing agency",
    "social media management",
    "content creation",
    "local SEO",
    "cafe marketing",
    "restaurant marketing",
  ],
  openGraph: {
    title: "Crafthouse Media",
    description: "Building Brands That People Remember.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-[#090909] antialiased">
        <AppProviders>
          <Navigation />
          <main>{children}</main>
        </AppProviders>
      </body>
    </html>
  );
}
