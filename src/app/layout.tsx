import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "../../contexts/ToastContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Simba Motors - Premium Car Dealership | Buy & Sell Cars in Kenya",
  description:
    "Discover premium cars at Simba Motors. Your trusted car dealership for buying, selling, and servicing vehicles in Kenya. Quality used cars, competitive prices.",
  keywords:
    "cars, dealership, automotive, vehicles, buy cars, sell cars, used cars Kenya, car dealership Nairobi, Simba Motors",
  authors: [{ name: "Simba Motors" }],
  creator: "Simba Motors",
  publisher: "Simba Motors",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://your-domain.com"
  ),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Simba Motors - Premium Car Dealership | Buy & Sell Cars in Kenya",
    description:
      "Discover premium cars at Simba Motors. Your trusted car dealership for buying, selling, and servicing vehicles in Kenya.",
    type: "website",
    locale: "en_KE",
    siteName: "Simba Motors",
  },
  twitter: {
    card: "summary_large_image",
    title: "Simba Motors - Premium Car Dealership",
    description:
      "Your trusted car dealership for buying, selling, and servicing vehicles in Kenya.",
    creator: "@simba_motors",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code", // Replace with actual verification code
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
