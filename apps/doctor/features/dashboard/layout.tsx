import Sidebar from "@/lib/components/ui/Sidebar";
import Header from "@/lib/components/ui/Header";

export default function OverviewLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div className="flex h-dvh w-full overflow-hidden">
        <Sidebar />
        <div className="flex min-w-0 flex-1 flex-col ">
          <Header />
          <main className="min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
  );
}
