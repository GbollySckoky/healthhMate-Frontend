"use client";

import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Appointment } from "@/lib/interface/createAppointment";
import { CreatePayment } from "@/lib/interface/createPayment";
import { patientService } from "@/service/patientService";
import { ROUTES } from "@/constants/route";

interface UseBookingProps {
  onSuccess?: () => void;
}

export const useBooking = ({ onSuccess }: UseBookingProps = {}) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const paymentMutation = useMutation({
    mutationKey: ["createPayment"],

    mutationFn: (payload: CreatePayment) =>
      patientService.createPayment(payload),

    onSuccess: (response: any) => {
      console.log("Payment created:", response);

      queryClient.invalidateQueries({
        queryKey: ["getAppointments"],
      });

      const authorizationUrl =
        response?.data?.data?.authorization_url ?? response?.data?.authorization_url;

      const reference =
        response?.data?.data?.reference ?? response?.data?.reference;

      if (authorizationUrl && reference) {
        // Page is about to unload — persist reference so the
        // callback page can read it after Paystack redirects back.
        sessionStorage.setItem("paystack_reference", reference);
        window.location.href = authorizationUrl;
        return;
      }

      router.push(ROUTES.consultationPayment);
      onSuccess?.();
    },

    onError: (error: any) => {
      console.error(
        "Payment creation failed:",
        error?.response?.data ?? error
      );
    },
  });

  const appointmentMutation = useMutation({
    mutationKey: ["createConsultation"],

    mutationFn: (payload: Appointment) =>
      patientService.createConsultation(payload),

    onSuccess: (response: any) => {
      console.log("Appointment created:", response);

      queryClient.invalidateQueries({
        queryKey: ["getAppointments"],
      });

      const appointmentId = response?.data?.id;

      if (!appointmentId) {
        console.error("Appointment ID was not returned.");
        return;
      }

      paymentMutation.mutate({
        appointmentId,
        currency: "NGN",
        // paymentMethod: "BANK_TRANSFER",
        // amount: response?.data?.amount,
      });
    },

    onError: (error: any) => {
      console.error(
        "Appointment creation failed:",
        error?.response?.data ?? error
      );
    },
  });

  const createBooking = (payload: Appointment) => {
    appointmentMutation.mutate(payload);
  };

  return {
    createBooking,

    isBooking: appointmentMutation.isPending,
    isPaymentProcessing: paymentMutation.isPending,

    isProcessing:
      appointmentMutation.isPending || paymentMutation.isPending,

    appointmentError: appointmentMutation.error,
    paymentError: paymentMutation.error,
  };
};