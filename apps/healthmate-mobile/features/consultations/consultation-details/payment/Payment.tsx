"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { patientService } from "@/service/patientService";

export default function ConsultationPaymentPage() {
  const searchParams = useSearchParams();

  const reference =
    searchParams.get("reference") ??
    searchParams.get("trxref") ??
    (typeof window !== "undefined"
      ? sessionStorage.getItem("paystack_reference")
      : null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["verifyPayment", reference],
    queryFn: () => patientService.verifyPayment(reference as string),
    enabled: !!reference,
    retry: false,
  });

  useEffect(() => {
    if (data) {
      sessionStorage.removeItem("paystack_reference");
    }
  }, [data]);

  if (!reference) return <div className="text-sm font-mdium text-center min-h-screen text-grey-20 flex justify-center items-center flex-col">No payment reference found.</div>;
  if (isLoading) return <div className="text-sm font-mdium text-center min-h-screen text-grey-20 flex justify-center items-center flex-col">Verifying payment...</div>;
  if (isError) return <div className="text-sm font-mdium text-center min-h-screen text-grey-20 flex justify-center items-center flex-col">Payment verification failed.</div>;

  return <div>Payment verified! Status: {data?.status}</div>;
}