import React, { Suspense } from 'react'
import PaymentCallback from './PaymentCallback'

const page = () => {
  return (
    <Suspense fallback={<PaymentCallbackLoading />}>
      <PaymentCallback />
    </Suspense>
  )
}

function PaymentCallbackLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <p>Processing payment...</p>
    </div>
  );
}

export default page