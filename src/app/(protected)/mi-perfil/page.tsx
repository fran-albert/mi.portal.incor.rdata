import React from "react";
import { Metadata } from "next";
import ClientMyProfileComponent from "@/components/Client/My-Profile";

export const metadata: Metadata = {
  title: "Inicio",
};
export default async function MyProfilePage() {
  return <ClientMyProfileComponent />;
}
