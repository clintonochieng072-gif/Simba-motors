import { Metadata } from "next";
import dynamic from "next/dynamic";

const Home = dynamic(() => import("../../components/Home"), {
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading Simba Motors...</p>
      </div>
    </div>
  ),
});

export const metadata: Metadata = {
  title: "Home - Simba Motors | Premium Car Dealership in Kenya",
  description:
    "Welcome to Simba Motors. Discover our premium collection of quality used cars in Kenya. Find Toyota, Honda, Nissan, BMW and more with competitive prices.",
  keywords:
    "Simba Motors Kenya, used cars Nairobi, car dealership Kenya, Toyota for sale, Honda cars Kenya, buy cars online Kenya",
  openGraph: {
    title: "Home - Simba Motors | Premium Car Dealership in Kenya",
    description:
      "Welcome to Simba Motors. Discover our premium collection of quality used cars in Kenya.",
    type: "website",
    images: [
      {
        url: "/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "Simba Motors - Premium Car Dealership",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Simba Motors - Premium Car Dealership",
    description:
      "Discover premium cars in Kenya. Your trusted car dealership for buying and selling vehicles.",
  },
};

// Structured data for organization
const structuredData = {
  "@context": "https://schema.org",
  "@type": "AutoDealer",
  name: "Simba Motors",
  description:
    "Kenya's premier car dealership specializing in quality used cars",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://simba-motors.vercel.app",
  telephone: "+254712345678",
  email: "info@simba-motors.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Nairobi CBD",
    addressLocality: "Nairobi",
    addressRegion: "Nairobi County",
    postalCode: "00100",
    addressCountry: "KE",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -1.2864,
    longitude: 36.8172,
  },
  openingHours: "Mo-Fr 09:00-18:00, Sa 09:00-16:00",
  priceRange: "$$",
  paymentAccepted: "Cash, Credit Card, Bank Transfer",
  currenciesAccepted: "KES",
  sameAs: [
    "https://facebook.com/simbamotors",
    "https://twitter.com/simbamotors",
    "https://instagram.com/simbamotors",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Vehicle Inventory",
    description:
      "Wide selection of quality used cars including Toyota, Honda, Nissan, BMW and more",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "150",
    bestRating: "5",
    worstRating: "1",
  },
};

export default function Page() {
  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Home />
    </>
  );
}
