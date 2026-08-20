import DashboardShell from "@/components/DashboardShell";

export default function OverviewLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <DashboardShell>
        {children}
      </DashboardShell>
  );
}

