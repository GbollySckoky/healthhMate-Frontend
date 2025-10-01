import React, { ReactNode } from 'react'
import { ModalProvider } from "@/components/modal/Modal";
import { ModalProviders } from "@/components/modal/FormModal";


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