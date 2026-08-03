"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// import toast from "react-hot-toast";

// import DateInput from "@/components/Input/DateInput";
// import TextAreaInput from "@/components/Input/TextAreaInput";
// import { patientService } from "@/services/patientService";
import { Appointment } from "@/lib/interface/createAppointment";
import DateInput from "@/components/DateInput";
import CustomCalendar from "@/components/CustomCalendar";
import TextAreaInput from "@/components/TextAreaInput";
import { ROUTES } from "@/constants/route";
import { patientService } from "@/service/patientService";
// import { ROUTES } from "@/constants/routes";

interface BookingProps {
  consultation: any;
}

const TIME_SLOTS = [
  "10:00am",
  "11:00am",
  "12:00pm",
  "1:00pm",
  "2:00pm",
  "3:00pm",
  "4:00pm",
  "5:00pm",
];

const CONSULTATION_TYPES = [
  {
    label: "Video Call",
    value: "video_call",
  },
  {
    label: "Audio Call",
    value: "audio_call",
  },
  {
    label: "Physical Appointment",
    value: "in_person",
  },
];

const Booking = ({ consultation }: BookingProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [form, setForm] = useState({
    date: new Date().toISOString().split("T")[0],
    time: "",
    consultationType: "",
    healthConcern: "",
  });
  const [showDatePicker, setShowDatePicker] = useState(false);

  const updateField = (
    key: keyof typeof form,
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleDateSelect = (day: { dateString: string }) => {
    updateField("date", day.dateString);
    setShowDatePicker(false);
  };

  const mutation = useMutation({
    mutationKey: ["createConsultation"],
    mutationFn: (payload: Appointment) =>
      patientService.createConsultation(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getAppointments"],
      });

      router.push(ROUTES.consultationPayment);
    },

    onError: (error: any) => {
      // toast.error(error.response?.data?.message);
    },
  });

  const handleSubmit = () => {
    mutation.mutate({
      date: form.date,
      time: form.time,
      consultationType: form.consultationType,
      healthConcern: form.healthConcern,
      doctorId: consultation?.id,
      hospitalId: consultation?.hospital?.id,
      amount: consultation?.profile?.consultationFee,
    });
  };

  const disabled =
    !form.date ||
    !form.time ||
    !form.consultationType ||
    !form.healthConcern.trim() ||
    mutation.isPending;

  return (
    <div className="space-y-6 pb-10">
      <DateInput
        label="Date"
        value={form.date}
        placeholder=""
        _fn={() => setShowDatePicker(true)}
      />
      <CustomCalendar
        isOpen={showDatePicker}
        onChangeText={handleDateSelect}
        onClose={() => setShowDatePicker(false)}
      />

      <div>
        <h3 className="mb-3 font-semibold">
          Select Time
        </h3>

        <div className="grid grid-cols-4 gap-3">
          {TIME_SLOTS.map((slot) => (
            <button
              key={slot}
              type="button"
              onClick={() =>
                updateField("time", slot)
              }
              className={`rounded-md border py-2 text-sm transition ${
                form.time === slot
                  ? "border-pink-600 bg-pink-50 text-pink-600"
                  : "border-gray-300"
              }`}
            >
              {slot}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 font-semibold">
          Consultation Type
        </h3>

        <div className="space-y-3">
          {CONSULTATION_TYPES.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() =>
                updateField(
                  "consultationType",
                  item.value
                )
              }
              className={`w-full rounded-md border p-3 text-left transition ${
                form.consultationType === item.value
                  ? "border-pink-600 bg-pink-50"
                  : "border-gray-300"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <TextAreaInput
        label="Health Concern"
        placeholder="Describe your issue..."
        value={form.healthConcern}
        onChangeText={(value) =>
          updateField("healthConcern", value)
        }
      />

      <div className="flex items-center justify-between">
        <span className="font-semibold">
          Total
        </span>

        <span className="text-lg font-semibold text-green-600">
          ₦
          {consultation?.profile?.consultationFee?.toLocaleString()}
        </span>
      </div>

      <button
        type="button"
        disabled={disabled}
        onClick={handleSubmit}
        className="w-full rounded-lg bg-pink-600 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        {mutation.isPending
          ? "Processing..."
          : "Proceed to Payment"}
      </button>
    </div>
  );
};

export default Booking;
