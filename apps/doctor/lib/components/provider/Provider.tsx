"use client"
import React, { ReactNode } from 'react'
import { ModalProvider } from "@/lib/components/modal/Modal";
import { ModalProviders } from "@/lib/components/modal/FormModal";
import { QueryClient, QueryClientProvider} from '@tanstack/react-query'

const Provider = ({children}: {children: ReactNode}) => {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <ModalProvider>
          <ModalProviders>
          {children}
          </ModalProviders>
      </ModalProvider>
    </QueryClientProvider>
  )
}

export default Provider