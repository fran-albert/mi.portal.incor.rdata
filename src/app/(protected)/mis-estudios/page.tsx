import React from "react";
import { Metadata } from "next";
import ClientMyStudiesComponent from "@/components/Client/My-Studies";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "Mis Estudios",
};

export default async function StudiesPage() {
  const session = await auth();

  if (!session) {
    return <div>loading...</div>;
  }
  return <ClientMyStudiesComponent session={session} />;
}
