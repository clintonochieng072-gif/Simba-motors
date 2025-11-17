import { Metadata } from "next";
import AdminCarEdit from "@/components/AdminCarEdit";

export const metadata: Metadata = {
  title: "Edit Car - Simba Motors Admin",
  description: "Edit car details and manage listing.",
  robots: "noindex, nofollow",
};

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <AdminCarEdit id={id} />;
}
