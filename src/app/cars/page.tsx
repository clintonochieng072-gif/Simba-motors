import { Metadata } from "next";
import dynamic from "next/dynamic";

// Dynamically import client components for code splitting
const CarList = dynamic(() => import("../../../components/CarList"), {
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading cars...</p>
      </div>
    </div>
  ),
});

const Filters = dynamic(() => import("../../../components/Filters"));
const SearchBar = dynamic(() => import("../../../components/SearchBar"));

export const metadata: Metadata = {
  title: "Browse Cars - Simba Motors | Used Cars for Sale in Kenya",
  description:
    "Browse our extensive collection of quality used cars in Kenya. Find Toyota, Honda, Nissan, BMW and more with competitive prices. Verified dealers and individual sellers.",
  keywords:
    "used cars Kenya, buy cars Nairobi, Toyota for sale, Honda cars Kenya, Nissan vehicles, BMW Kenya, car dealership Nairobi",
  openGraph: {
    title: "Browse Cars - Simba Motors | Used Cars for Sale in Kenya",
    description:
      "Browse our extensive collection of quality used cars in Kenya. Find Toyota, Honda, Nissan, BMW and more with competitive prices.",
    type: "website",
    images: [
      {
        url: "/og-cars.jpg",
        width: 1200,
        height: 630,
        alt: "Simba Motors Car Listings",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Browse Cars - Simba Motors",
    description:
      "Browse our extensive collection of quality used cars in Kenya.",
  },
};

// Structured data for car dealership
const structuredData = {
  "@context": "https://schema.org",
  "@type": "AutoDealer",
  name: "Simba Motors",
  description:
    "Kenya's premier car dealership offering quality used cars for sale",
  url: "https://your-domain.com",
  telephone: "+254712345678",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Nairobi",
    addressCountry: "KE",
  },
  sameAs: [
    "https://facebook.com/simbamotors",
    "https://twitter.com/simbamotors",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Car Inventory",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Car",
          name: "Toyota Corolla",
          brand: "Toyota",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Car",
          name: "Honda Civic",
          brand: "Honda",
        },
      },
    ],
  },
};

export default function CarsPage() {
  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Browse Our Car Collection
              </h1>
              <p className="text-lg text-gray-600">
                Find your perfect vehicle from our extensive inventory
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-12">
          <CarList searchTerm="" />
        </div>
      </div>
    </>
  );
}
