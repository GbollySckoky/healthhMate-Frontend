"use client"
import React, { ReactNode } from 'react'
import { ModalProvider } from "@/lib/components/modal/Modal";
import { ModalProviders } from "@/lib/components/modal/FormModal";
import { Providers } from "@/lib/constant/Providers";

const Provider = ({children}: {children: ReactNode}) => {
  return (
    <Providers>
      <ModalProvider>
          <ModalProviders>
          {children}
          </ModalProviders>
      </ModalProvider>
    </Providers>
  )
}

export default Provider