import { ReactNode } from "react";

export type HealthOverviewItem = {
  id: number;
  title: string;
  value: string;
  text: string;
  icon: ReactNode;
  url: string;
};