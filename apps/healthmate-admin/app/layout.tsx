// 'use client'
import type { Metadata } from "next";
import "./globals.css";
import { ToastContainer} from 'react-toastify';
import { Providers } from "@/lib/constant/Providers";

export const metadata: Metadata = {
  title: "Healthmate Hospital App",
  description: "Healthmate hospital app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans">
      <Providers>
        {children}
        <ToastContainer />
      </Providers>
      </body>
    </html>
  );
}
