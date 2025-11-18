"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminOverview from "../../../../../components/AdminOverview";

export default function Page() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    console.log("Overview: Checking token", token);
    if (!token) {
      console.log("Overview: No token, redirecting to /admin");
      router.push("/admin");
    } else {
      console.log("Overview: Token found, setting authenticated");
      setIsAuthenticated(true);
    }
  }, [router]);

  if (!isAuthenticated) {
    console.log("Overview: Not authenticated, showing null");
    return null;
  }

  console.log("Overview: Rendering AdminOverview");
  return <AdminOverview />;
}
