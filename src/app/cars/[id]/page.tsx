import { Metadata } from "next";
import CarDetail from "../../../../components/CarDetail";
import { getCar } from "../../../../lib/api";

interface PageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  try {
    const response = await getCar(params.id);
    const car = response.data;

    if (!car) {
      return {
        title: "Car Not Found - Simba Motors",
        description: "The requested car could not be found.",
      };
    }

    const title = `${car.name} ${car.model} ${car.year} - Simba Motors`;
    const description = `${car.name} ${car.model} ${
      car.year
    } for KSh ${car.price?.toLocaleString()}. ${car.mileage?.toLocaleString()} km, ${
      car.fuelType || car.engineType
    }, ${car.transmission}. View detailed specs and contact seller.`;

    // Structured data for car listing
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Car",
      name: `${car.name} ${car.model}`,
      brand: {
        "@type": "Brand",
        name: car.name,
      },
      model: car.model,
      modelDate: car.year,
      vehicleConfiguration: car.bodyType,
      fuelType: car.fuelType || car.engineType,
      vehicleTransmission: car.transmission,
      mileageFromOdometer: {
        "@type": "QuantitativeValue",
        value: car.mileage,
        unitCode: "KMT",
      },
      offers: {
        "@type": "Offer",
        price: car.price,
        priceCurrency: "KES",
        availability: "https://schema.org/InStock",
        seller: {
          "@type": "AutoDealer",
          name: "Simba Motors",
          address: {
            "@type": "PostalAddress",
            addressLocality: car.location || "Nairobi",
            addressCountry: "KE",
          },
        },
      },
      image: car.images?.length > 0 ? car.images : undefined,
      description: car.ownershipHistory || description,
    };

    return {
      title,
      description,
      keywords: `${car.name}, ${car.model}, ${car.year}, ${
        car.fuelType || car.engineType
      }, ${car.transmission}, ${car.bodyType}, used cars Kenya, buy car`,
      openGraph: {
        title,
        description,
        type: "website",
        images:
          car.images?.length > 0
            ? [
                {
                  url: car.images[0],
                  alt: `${car.name} ${car.model}`,
                  width: 800,
                  height: 600,
                },
              ]
            : undefined,
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: car.images?.length > 0 ? [car.images[0]] : undefined,
      },
      other: {
        "application/ld+json": JSON.stringify(structuredData),
      },
    };
  } catch (error) {
    return {
      title: "Car Details - Simba Motors",
      description:
        "View detailed information about this vehicle including specifications, features, and contact information.",
    };
  }
}

export default function Page({ params }: PageProps) {
  return <CarDetail id={params.id} />;
}
