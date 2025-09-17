import type { Metadata } from "next";
// import localFont from "next/font/local";
import "./globals.css";
import SideBar from "../components/SideBar/SideBar";
import Header from "../components/header/Header";
import { ModalProvider } from "@/components/Modal/Modal";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
// });

export const metadata: Metadata = {
  title: "Healthmate - App",
  description: "Healthmate app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans bg-[#FAFAFA] flex">
        <SideBar />
        <ModalProvider>
          <main className="flex-1  md:ml-[250px] ml-0">
            <Header />
            <div>{children}</div>
          </main>
        </ModalProvider>
      </body>
    </html>
  );
}
