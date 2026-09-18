import type { Metadata } from "next";
import "./globals.css";

import Providers from "../providers/Provider";
import DashboardShell from "@/components/DashboardShell";
import AuthExpiredLoader from "@/components/Client/AuthExpiredLoader";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

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
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <head>
        <link
          rel="preconnect"
          href="https://fonts.cdnfonts.com"
          crossOrigin=""
        />

        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />

        <link
          rel="stylesheet"
          href="https://fonts.cdnfonts.com/css/lato"
        />

        <link
          rel="stylesheet"
          href="https://fonts.cdnfonts.com/css/libre-franklin"
        />

        <link
          rel="stylesheet"
          href="https://fonts.cdnfonts.com/css/inter"
        />
      </head>

      <body
        className="h-dvh overflow-hidden"
        suppressHydrationWarning
      >
        <AuthExpiredLoader />

        <Providers>
          <DashboardShell>
            {children}
          </DashboardShell>
        </Providers>
      </body>
    </html>
  );
}