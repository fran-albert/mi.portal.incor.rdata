import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "@/styles/globals.css";
import HeaderComponent from "@/components/Header/header";
import SessionAuthProvider from "@/context/SessionAuthProviders";
import ClientWrapper from "@/components/Client/Wrapper";
import { Toaster } from "sonner";
import Footer from "@/components/Footer";

const roboto = Roboto({
  subsets: ["latin-ext"],
  weight: ["400", "500", "700"],
});

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
        <body className={roboto.className}>
          <div id="__next" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <HeaderComponent />
            <Toaster richColors position="top-center" />
            <ClientWrapper>
              {children}
            </ClientWrapper>
            <Footer  />
          </div>
        </body>
      </SessionAuthProvider>
    </html>
  );
}
