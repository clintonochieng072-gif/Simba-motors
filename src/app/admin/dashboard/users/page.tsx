import { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Management - Simba Motors Admin",
  description: "Manage registered users and dealers on the platform.",
  robots: "noindex, nofollow",
};

export default function Page() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <p className="text-gray-600">
        User management functionality to be implemented.
      </p>
    </div>
  );
}
