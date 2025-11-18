import { MetadataRoute } from "next";
import { getCars } from "@/lib/api";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://simba-motors.vercel.app";

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  // Dynamic car pages
  let carPages: MetadataRoute.Sitemap = [];
  try {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL ?? "https://simba-cars.onrender.com/api"
      }/cars`
    );
    if (response.ok) {
      const data = await response.json();
      const cars = data.cars || [];

      carPages = cars.map((car: any) => ({
        url: `${baseUrl}/cars/${car._id}`,
        lastModified: new Date(car.updatedAt || car.createdAt || Date.now()),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      }));
    }
  } catch (error) {
    console.error("Error fetching cars for sitemap:", error);
  }

  return [...staticPages, ...carPages];
}
