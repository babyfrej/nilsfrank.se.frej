"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function RedirectTask() {
  const router = useRouter();
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
    }, 5000);
    return () => clearTimeout(timer);
  }, [router]);
  return null;
}
