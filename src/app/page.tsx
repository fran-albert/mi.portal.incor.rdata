"use client";
import React from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
function HomePage() {
  const router = useRouter();
  useEffect(() => {
    router.push("/inicio");
  }, [router]);
  return <div></div>;
}

export default HomePage;
