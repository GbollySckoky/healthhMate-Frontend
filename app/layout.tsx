import type { Metadata } from "next";
// import localFont from "next/font/local";
import "./globals.css";
import SideBar from "../components/SideBar/SideBar";
import Header from "../components/header/Header";

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
    <html lang="en">
      <body className={`font-sans flex`}>
        <SideBar />
        <div className="w-full ml-[250px]">
          <Header />
          <div>
          {children}
          </div>
     
        </div>
      </body>
    </html>
  );
}
