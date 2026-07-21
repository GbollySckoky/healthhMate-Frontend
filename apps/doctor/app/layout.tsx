import type { Metadata } from "next";
import "./globals.css";
import Provider from "@/lib/components/provider/Provider";
import { ToastContainer } from 'react-toastify'

export const metadata: Metadata = {
  title: "Healthmate Doctor App",
  description: "Healthmate doctor app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Provider>
      <body className={`font-inter`}>
        {children}
        <ToastContainer />
      </body>
      </Provider>
    </html>
  );
}
