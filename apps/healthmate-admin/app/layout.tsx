import type { Metadata } from "next";
import "./globals.css";

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
      <body className="font-sans bg-[#FAFAFA]">
        {children}
      </body>
    </html>
  );
}
