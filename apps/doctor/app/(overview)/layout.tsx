// import Provider from "@/components/provider/Provider";
import Sidebar from "@/components/ui/Sidebar";
import Header from "@/components/ui/Header";

export default function OverviewLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div className=" flex">
        <Sidebar />
        {/* <Provider> */}
          <div className="flex-1  md:ml-[250px] ml-0">
            <Header />
            <div>{children}</div>
          </div>
        {/* </Provider> */}
      </div>
  );
}
