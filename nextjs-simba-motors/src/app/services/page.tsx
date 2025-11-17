import { Metadata } from "next";
import Services from "../../../components/Services";

export const metadata: Metadata = {
  title: "Our Services - Simba Motors",
  description:
    "Explore comprehensive automotive services at Simba Motors including car sales, maintenance, financing, and after-sales support.",
  keywords:
    "car services, automotive maintenance, vehicle financing, car warranty, Simba Motors services",
  openGraph: {
    title: "Our Services - Simba Motors",
    description:
      "Explore comprehensive automotive services at Simba Motors including car sales, maintenance, financing, and after-sales support.",
    type: "website",
  },
};

export default function Page() {
  return <Services />;
}
