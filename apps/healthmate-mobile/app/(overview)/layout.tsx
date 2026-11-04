
export default function OverviewLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div className="h-full min-h-0">
        {children}
      </div>
  );
}

