import { Metadata } from "next";
import About from "../../../components/About";

export const metadata: Metadata = {
  title: "About Us - Simba Motors",
  description:
    "Learn about Simba Motors, Kenya's premier car dealership with over 5 years of experience. Discover our story, values, and commitment to quality vehicles.",
  keywords:
    "about Simba Motors, car dealership Kenya, automotive history, vehicle quality",
  openGraph: {
    title: "About Us - Simba Motors",
    description:
      "Learn about Simba Motors, Kenya's premier car dealership with over 5 years of experience.",
    type: "website",
  },
};

export default function Page() {
  return <About />;
}
