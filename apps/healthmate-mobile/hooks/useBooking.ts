"use client";

import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Appointment } from "@/lib/interface/createAppointment";
// import { CreatePayment } from "@/lib/interface/createPayment";
import { patientService } from "@/service/patientService";
import { ROUTES } from "@/constants/route";
import { InitializePayment } from "@/lib/interface/payment";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
// import { Appointment } from "@/lib/interface/createAppointment";

interface UseBookingProps {
  onSuccess?: () => void;
}

export const useBooking = ({ onSuccess }: UseBookingProps = {}) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const paymentMutation = useMutation({
    mutationKey: ["createPayment"],

    mutationFn: (payload: InitializePayment) =>
      patientService.createPayment(payload),

    onSuccess: (response) => {
      toast.success("Payment created:", response.data.message ?? "Payment created successfully");

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

    onError: (error: AxiosError<{message: string}>) => {
      toast.error(error?.response?.data?.message ?? "Something went wrong");
    },
  });

  const appointmentMutation = useMutation({
    mutationKey: ["createConsultation"],

    mutationFn: (payload: Appointment) =>
      patientService.createConsultation(payload),

    onSuccess: (response) => {
      toast.success("Appointment created:", response.data.message ?? "Appointment created successfully");

      queryClient.invalidateQueries({
        queryKey: ["getAppointments"],
      });

      const appointmentId = response?.data?.id;

      if (!appointmentId) {
        toast.error("Appointment ID was not returned.");
        return;
      }

      paymentMutation.mutate({
        appointmentId,
        currency: "NGN",
        metadata:{
          date: response.data.date,
          time: response.data.time,
          consultationType: response.data.consultationType,
          healthConcern: response.data.healthConcern,
          doctorId: response.data.doctorId,
          hospitalId: response.data.hospitalId,
          amount: response.data
        }
        // paymentMethod: "BANK_TRANSFER",
        // amount: response?.data?.amount,
      });
    },

    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message ?? "Something went wrong");
      console.log(
        "Appointment creation failed:",
        error.response?.data?.message ?? error
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

    isProcessing: paymentMutation.isPending,

    appointmentError: appointmentMutation.error,
    paymentError: paymentMutation.error,
  };
};