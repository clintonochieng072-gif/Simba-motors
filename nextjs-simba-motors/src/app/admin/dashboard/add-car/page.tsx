import { Metadata } from "next";
import AdminAddCar from "../../../../../components/AdminAddCar";

export const metadata: Metadata = {
  title: "Add New Car - Simba Motors Admin",
  description: "Add a new car listing to the Simba Motors inventory.",
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const params = await searchParams;
  return <AdminAddCar id={params?.id} />;
}
