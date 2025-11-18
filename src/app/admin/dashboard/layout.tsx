"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import AdminLayout from "../../../../components/AdminLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    console.log("Dashboard Layout: Checking token", token);
    if (!token) {
      console.log("Dashboard Layout: No token, redirecting to /admin");
      router.push("/admin");
    } else {
      console.log("Dashboard Layout: Token found, setting authenticated");
      setIsAuthenticated(true);
    }
  }, [router]);

  // Also check for token changes (in case it gets set after initial load)
  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem("adminToken");
      if (token && !isAuthenticated) {
        console.log(
          "Dashboard Layout: Token found in storage change, setting authenticated"
        );
        setIsAuthenticated(true);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    console.log("Dashboard Layout: Not authenticated, showing null");
    return null;
  }

  console.log("Dashboard Layout: Rendering AdminLayout");
  return <AdminLayout>{children}</AdminLayout>;
}
