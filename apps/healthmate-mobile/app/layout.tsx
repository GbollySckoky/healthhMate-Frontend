import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Healthmate Patient App",
  description: "Healthmate patient app",
};

export { default } from "@/features/shell/RootLayout";
