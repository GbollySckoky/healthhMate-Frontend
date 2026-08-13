"use client";

import { useQuery } from "@tanstack/react-query";
import { patientService } from "@/service/patientService";

const useVerifyPayment = (reference?: string) => {
  const query = useQuery({
    queryKey: ["verifyPayment", reference],

    queryFn: () => patientService.verifyPayment(reference!),

    enabled: Boolean(reference),

    retry: false,
  });

  return {
    verifyData: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    isSuccess: query.isSuccess,
  };
};

export default useVerifyPayment;