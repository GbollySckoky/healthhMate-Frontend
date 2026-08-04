import type { Metadata } from "next";
import "./globals.css";
import Providers from "../providers/Provider";
import Footer from "@/constants/Footer";
import Header from "@/components/Header";

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
      <body className="h-dvh overflow-hidden" suppressHydrationWarning>
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