import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings - Simba Motors Admin",
  description: "Manage account settings and preferences.",
  robots: "noindex, nofollow",
};

export default function Page() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <p className="text-gray-600">
        Application settings and configuration to be implemented.
      </p>
    </div>
  );
}
