import { Metadata } from "next";
import AdminCars from "../../../../../components/AdminCars";

export const metadata: Metadata = {
  title: "Car Inventory Management - Simba Motors Admin",
  description:
    "Manage your car listings, inventory, and vehicle information for Simba Motors dealership.",
  robots: "noindex, nofollow", // Prevent indexing of admin pages
};

export default function Page() {
  return <AdminCars />;
}
