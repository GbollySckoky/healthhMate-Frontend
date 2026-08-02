"use client";

import { ModalProvider } from "@/store/Modal";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { ToastContainer } from 'react-toastify'

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ModalProvider>
         {children}
        <ToastContainer />
      </ModalProvider>
    </QueryClientProvider>
  );
}