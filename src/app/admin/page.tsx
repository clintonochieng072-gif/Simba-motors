import { Metadata } from "next";
import AdminLogin from "../../../components/AdminLogin";

export const metadata: Metadata = {
  title: "Admin Login - Simba Motors",
  description: "Admin login page for Simba Motors management system.",
};

export default function Page() {
  return <AdminLogin />;
}
