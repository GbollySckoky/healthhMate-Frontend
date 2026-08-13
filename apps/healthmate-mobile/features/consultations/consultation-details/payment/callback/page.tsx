"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import useVerifyPayment from "@/hooks/useVerifyPayment";
import { ROUTES } from "@/constants/route";

const PaymentCallback = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const reference = searchParams.get("reference");

  const {
    verifyData,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useVerifyPayment(reference ?? undefined);

  useEffect(() => {
    if (!isSuccess || !verifyData) return;

    const timer = setTimeout(() => {
      router.push(ROUTES.appointments);
    }, 2000);

    return () => clearTimeout(timer);
  }, [isSuccess, verifyData, router]);

  if (!reference) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold">
            Invalid Payment
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            No payment reference was provided.
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-pink-600" />

          <h2 className="text-lg font-semibold">
            Verifying your payment...
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Please wait while we confirm your transaction.
          </p>
        </div>
      </div>
    );
  }

  if (isError) {
    console.error("Payment verification error:", error);

    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="max-w-md text-center">
          <h2 className="text-xl font-semibold text-red-600">
            Payment Verification Failed
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            We could not verify your payment. Please try again
            or contact support.
          </p>

          <button
            type="button"
            onClick={() => router.push(ROUTES.appointments)}
            className="mt-6 rounded-lg bg-pink-600 px-6 py-3 font-semibold text-white"
          >
            Go to Appointments
          </button>
        </div>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
            <span className="text-2xl text-green-600">
              ✓
            </span>
          </div>

          <h2 className="text-xl font-semibold text-green-600">
            Payment Successful
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Your appointment has been confirmed.
          </p>

          <p className="mt-4 text-xs text-gray-400">
            Redirecting to your appointments...
          </p>
        </div>
      </div>
    );
  }

  return null;
};

export default PaymentCallback;