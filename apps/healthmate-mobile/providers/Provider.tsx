"use client";

import { ModalProvider } from "@/store/Modal";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import dynamic from "next/dynamic";
import ErrorBoundary from "@/components/ErrorBoundary";


const ToastLoader = dynamic(() => import("@/components/Client/ToastLoader"), { ssr: false });

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <ModalProvider>
          {children}
          <ToastLoader />
        </ModalProvider>
      </ErrorBoundary>
    </QueryClientProvider>
  );
}