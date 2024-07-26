import React from "react";
import { Metadata } from "next";
import ClientReportComponent from "@/components/Client/Reports";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "Reportes",
};

export default async function ReportsPage() {
  const session = await auth();

  if (!session) {
    return <div>loading...</div>;
  }

  return <ClientReportComponent id={Number(session.user?.id)} />;
}
