'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import { ToastContainer } from 'react-toastify'

export function Providers({ children }: { children: React.ReactNode }) {
 
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* <ToastContainer /> */}
    </QueryClientProvider>
  )
}