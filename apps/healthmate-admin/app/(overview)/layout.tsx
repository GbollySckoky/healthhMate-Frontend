import Provider from "@/lib/components/provider/Provider";
import SideBar from "@/components/ui/SideBar";
import Header from "@/components/ui/Header";

export default function OverviewLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div className=" flex">
        <Provider>
          <SideBar />
          <div className="flex-1 md:ml-[250px] ml-[60px]">
            <Header />
            {children}
          </div>
        </Provider>
      </div>
  );
}

