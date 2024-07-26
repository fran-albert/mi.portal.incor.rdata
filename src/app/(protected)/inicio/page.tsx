import React from "react";
import { Metadata } from "next";
import ClientHomePage from "@/components/Client/Home";

export const metadata: Metadata = {
  title: "Inicio",
};

export default async function HomePage() {
  return <ClientHomePage />;
}
