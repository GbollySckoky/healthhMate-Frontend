// 'use client'
import type { Metadata } from "next";
import "./globals.css";
import Providers from "../providers/Provider";
import Footer from "@/constants/Footer";

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
    <html lang="en" >
      <body className="" suppressHydrationWarning>
      <Providers>
        {children}
        <Footer />
      </Providers>
      </body>
    </html>
  );
}
