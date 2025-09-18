import React, { ReactNode } from 'react'
import { ModalProvider } from "@/components/Modal/Modal";
import { ModalProviders } from "@/components/Modal/FormModal";


const Provider = ({children}: {children: ReactNode}) => {
  return (
    <ModalProvider>
        <ModalProviders>
        {children}
        </ModalProviders>
    </ModalProvider>
  )
}

export default Provider