"use client";

import { useState } from "react";
import HeaderClient from "@/components/HeaderClient";
import Sidebar from "@/components/Sidebar";
import { usePathname } from "next/navigation";

interface DashboardShellProps {
  children: React.ReactNode;
}

export default function DashboardShell({
  children,
}: DashboardShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const isAuthPage = pathname === "/login" || pathname === "/register" || pathname === "/forgot-password";

  return (
    <div className="flex h-dvh bg-[#FAFAFA]">
      {/* Sidebar */}
      {isAuthPage ? (
        null ) :(
        <Sidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
      )}
      {/* <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      /> */}

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col md:ml-[250px]">
        {isAuthPage ? (
          null ):( 
          <HeaderClient
            onMenuClick={() => setSidebarOpen(true)}
          />
        )}
        

        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}