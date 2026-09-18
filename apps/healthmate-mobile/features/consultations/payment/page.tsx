import React, { Suspense } from 'react'
import ConsultationPaymentPage from './Payment'

const Page = () => {
  return (
    <Suspense fallback={<PaymentLoading />}>
      <ConsultationPaymentPage />
    </Suspense>
  )
}

const PaymentLoading = () => {
  return(
    <div className="flex min-h-screen items-center justify-center">
      Processing payment...
    </div>
  )
}
export default Page