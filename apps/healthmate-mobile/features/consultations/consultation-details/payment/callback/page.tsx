"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Check,
  CreditCard,
  Copy,
} from "lucide-react";

import useVerifyPayment from "@/hooks/useVerifyPayment";
import { ROUTES } from "@/constants/route";

const PaymentCallback = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [copied, setCopied] = useState(false);

  const reference =
    searchParams.get("reference") ??
    searchParams.get("trxref") ??
    (typeof window !== "undefined"
      ? sessionStorage.getItem("paystack_reference")
      : null);

  const {
    verifyData,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useVerifyPayment(reference ?? undefined);

  const handleCopyReference = async () => {
    if (!reference) return;

    try {
      await navigator.clipboard.writeText(reference);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy payment reference:", error);
    }
  };

  /**
   * Invalid payment reference
   */
  if (!reference) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4">
        <div
          role="alert"
          className="w-full max-w-lg rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm sm:p-10"
        >
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
            <CreditCard className="h-8 w-8 text-red-500" />
          </div>

          <h1 className="mt-6 text-2xl font-bold text-gray-900">
            Invalid Payment Link
          </h1>

          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500">
            We couldn&apos;t find a valid payment reference for this
            transaction. If you believe you completed a payment,
            check your appointments first — it may already be
            confirmed.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={() => router.push(ROUTES.appointments)}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-pink-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-pink-700"
            >
              View My Appointments
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  /**
   * Payment verification loading state
   */
  if (isLoading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4">
        <div
          role="status"
          aria-live="polite"
          className="w-full max-w-lg rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm sm:p-10"
        >
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-pink-50">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-pink-100 border-t-pink-600" />
          </div>

          <h1 className="mt-6 text-2xl font-bold text-gray-900">
            Verifying Your Payment
          </h1>

          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500">
            We&apos;re securely confirming your transaction with your
            payment provider. This usually takes just a few seconds.
          </p>

          <div className="mt-6 rounded-2xl border border-gray-100 bg-gray-50 p-4 text-left">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
              Payment Reference
            </p>

            <p className="mt-2 break-all font-mono text-sm font-medium leading-5 text-gray-700">
              {reference}
            </p>
          </div>

          <p className="mt-5 text-xs text-gray-400">
            Please don&apos;t close or refresh this page.
          </p>
        </div>
      </div>
    );
  }

  /**
   * Payment verification failed
   */
  if (isError) {
    console.error("Payment verification error:", error);

    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4">
        <div
          role="alert"
          aria-live="assertive"
          className="w-full max-w-lg rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm sm:p-10"
        >
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
            <CreditCard className="h-8 w-8 text-red-500" />
          </div>

          <h1 className="mt-6 text-2xl font-bold text-gray-900">
            We Couldn&apos;t Confirm Your Payment
          </h1>

          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500">
            This might just be a delay on our end. If your account
            was charged, don&apos;t worry — save your reference
            below and contact support so we can look into it.
          </p>

          <div className="mt-6 rounded-2xl border border-red-100 bg-red-50 p-4 text-left">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold uppercase tracking-wide text-red-500">
                  Payment Reference
                </p>

                <p className="mt-2 break-all font-mono text-sm font-medium leading-5 text-red-700">
                  {reference}
                </p>
              </div>

              <button
                type="button"
                onClick={handleCopyReference}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-red-200 bg-white px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    Copy
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={() => router.push(ROUTES.appointments)}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-pink-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-pink-700"
            >
              View My Appointments
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <p className="mt-5 text-xs leading-5 text-gray-400">
            Please have the reference above ready if you contact
            support.
          </p>
        </div>
      </div>
    );
  }

  /**
   * Payment successfully verified
   */
  if (isSuccess && verifyData) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4 py-10">
        <div
          role="status"
          aria-live="polite"
          className="w-full max-w-lg rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm sm:p-10"
        >
          {/* Success Icon */}
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-50">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
          </div>

          {/* Heading */}
          <h1 className="mt-6 text-2xl font-bold text-gray-900">
            Payment Successful
          </h1>

          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500">
            Your payment has been verified and your appointment is
            confirmed. You&apos;re all set.
          </p>

          {/* Appointment Confirmation */}
          <div className="mt-8 rounded-2xl border border-gray-100 bg-gray-50 p-5 text-left">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
                <CalendarDays className="h-5 w-5 text-pink-600" />
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-900">
                  Appointment Confirmed
                </p>

                <p className="mt-1 text-sm leading-5 text-gray-500">
                  You can find the date, time, and doctor details
                  on your appointments page.
                </p>
              </div>
            </div>
          </div>

          {/* Payment Reference */}
          <div className="mt-4 rounded-2xl border border-gray-200 bg-white p-5 text-left">
            <div className="flex items-start justify-between gap-4">
              <div className="flex min-w-0 items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-pink-50">
                  <CreditCard className="h-5 w-5 text-pink-600" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Payment Reference
                  </p>

                  <p className="mt-2 break-all font-mono text-sm leading-5 text-gray-800">
                    {reference}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCopyReference}
                aria-label="Copy payment reference"
                className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-600 transition hover:bg-gray-50"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-green-600" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    Copy
                  </>
                )}
              </button>
            </div>

            <p className="mt-4 text-xs leading-5 text-gray-400">
              Keep this reference for your records — you may need
              it if you contact support about this payment.
            </p>
          </div>

          {/* Main CTA */}
          <div className="mt-8">
            <button
              type="button"
              onClick={() => router.push(ROUTES.appointments)}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-pink-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
            >
              View My Appointments
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <p className="mt-5 text-xs leading-5 text-gray-400">
            You can safely leave this page — your appointment is
            already confirmed.
          </p>
        </div>
      </div>
    );
  }

  return null;
};

export default PaymentCallback;