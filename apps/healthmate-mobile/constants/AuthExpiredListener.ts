"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/route";

/**
 * Listens for the 'auth:expired' event dispatched by the axios
 * response interceptor on a 401. Uses Next's router for a soft
 * navigation so unrelated in-flight requests (e.g. a booking or
 * payment mutation) aren't cancelled by a full page reload.
 */
export function AuthExpiredListener() {
  const router = useRouter();

  useEffect(() => {
    const handleAuthExpired = () => {
      router.push(ROUTES.login ?? "/auth/login");
    };

    window.addEventListener("auth:expired", handleAuthExpired);
    return () => window.removeEventListener("auth:expired", handleAuthExpired);
  }, [router]);

  return null;
}