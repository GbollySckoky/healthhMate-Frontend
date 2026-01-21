import Sidebar from "@/components/ui/Sidebar";
import Header from "@/components/ui/Header";
import { AppointmentProvider } from "@/lib/context/GetAppointmentContext";
// import Provider from "@/components/provider/Provider";

export default function OverviewLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
      <div className=" flex">
        {/* <Provider> */}
          <Sidebar />
            <div className="flex-1 md:ml-[250px] ml-0">
              <Header />
              <AppointmentProvider>
                {children}
              </AppointmentProvider>
            </div>
        {/* </Provider> */}
      </div>
  );
}
