import { Metadata } from "next";
import Contact from "../../../components/Contact";

export const metadata: Metadata = {
  title: "Contact Us - Simba Motors",
  description:
    "Get in touch with Simba Motors. Visit our showroom, call us, or send a message. We're here to help you find your perfect car.",
  keywords:
    "contact Simba Motors, car dealership Nairobi, automotive inquiry, vehicle purchase",
  openGraph: {
    title: "Contact Us - Simba Motors",
    description:
      "Get in touch with Simba Motors. Visit our showroom, call us, or send a message.",
    type: "website",
  },
};

export default function Page() {
  return <Contact />;
}
