import Sidebar from "@/lib/components/ui/Sidebar";
import Header from "@/lib/components/ui/Header";
import { AppointmentProvider } from "@/lib/context/GetAppointmentContext";

export default function OverviewLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppointmentProvider>
      <div className="flex h-dvh overflow-hidden bg-[#FAFAFA]">
        <Sidebar />
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <Header />
          <main className="min-h-0 flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </AppointmentProvider>
  );
}
