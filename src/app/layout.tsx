import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import HeaderComponent from "@/components/Header/header";
import SessionAuthProvider from "@/context/SessionAuthProviders";
import ClientWrapper from "@/components/Client/Wrapper";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "Mi Portal Incor - %s",
    default: "Mi Portal Incor",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SessionAuthProvider>
        <body className={inter.className}>
          <ClientWrapper>
            <HeaderComponent />
            <Toaster richColors position="top-center" />
            {children}
          </ClientWrapper>
        </body>
      </SessionAuthProvider>
    </html>
  );
}
