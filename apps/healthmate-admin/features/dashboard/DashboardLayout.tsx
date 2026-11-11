import SideBar from "@/components/ui/Sidebar";
import Header from "@/components/ui/Header";
import { ModalProvider } from "@/components/modal/Modal";

export default function OverviewLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div className=" flex">
        <ModalProvider>
          <SideBar />
          <div className="flex-1 md:ml-[250px] ml-[60px]">
            <Header />
            {children}
          </div>
        </ModalProvider>
      </div>
  );
}

