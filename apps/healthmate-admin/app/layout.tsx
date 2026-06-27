// 'use client'
import type { Metadata } from "next";
import "./globals.css";
// import './'
// import '@/styles/globals.css'
import { ToastContainer} from 'react-toastify';
import { Providers } from "@/lib/context/Providers";

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
    <html lang="en" >
      <body className="font-sans" suppressHydrationWarning>
      <Providers>
        {children}
        <ToastContainer />
      </Providers>
      </body>
    </html>
  );
}
