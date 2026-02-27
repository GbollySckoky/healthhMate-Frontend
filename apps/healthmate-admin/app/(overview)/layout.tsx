import Provider from "@/components/provider/Provider";
import SideBar from "@/components/ui/SideBar";
import Header from "@/components/ui/Header";

export default function OverviewLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div className=" flex">
        <SideBar />
        <Provider>
          <div className="flex-1  md:ml-[250px] ml-[60px]">
            <Header />
            <div>{children}</div>
          </div>
        </Provider>
      </div>
  );
}
