// "use client"
import type { Metadata } from "next";
import "./globals.css";
import Providers from "../providers/Provider";
import Footer from "@/constants/Footer";
import Header from "@/components/Header";

// Load client-only listeners lazily to reduce initial client bundle impact on LCP
import AuthExpiredLoader from "@/components/Client/AuthExpiredLoader";

export const metadata: Metadata = {
  title: "Healthmate Mobile App",
  description: "Healthmate mobile app",
};

export default function RootLayout({
  children, 
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.cdnfonts.com" crossOrigin="" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href="https://fonts.cdnfonts.com/css/lato" />
        <link rel="stylesheet" href="https://fonts.cdnfonts.com/css/libre-franklin" />
        <link rel="stylesheet" href="https://fonts.cdnfonts.com/css/inter" />
      </head>
      <body className="h-dvh overflow-hidden" suppressHydrationWarning>
        <AuthExpiredLoader />
        <Providers>
          <div className="flex h-dvh flex-col">
            <Header />
            <main className="flex-1 overflow-y-auto">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}