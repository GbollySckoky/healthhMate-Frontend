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
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-y-auto bg-gray-50">
          <Header />
          <div className="">
            {children}
          </div>
        </div>
      </div>
    </AppointmentProvider>
  );
}