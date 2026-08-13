"use client";

import { useState } from "react";

import { Appointment } from "@/lib/interface/createAppointment";

import DateInput from "@/components/DateInput";
import CustomCalendar from "@/components/CustomCalendar";
import TextAreaInput from "@/components/TextAreaInput";

import ConsultationTypeSelector from "./ConsultationTypeSelector";

import { useBooking } from "@/hooks/useBooking";
import TimeSlotSelector from "./TimeSlotSelector";
import BookingSummary from "./BookingSummary";

interface BookingProps {
  consultation: any;
}

interface BookingForm {
  date: string;
  time: string;
  consultationType: string;
  healthConcern: string;
}

const Booking = ({ consultation }: BookingProps) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [form, setForm] = useState<BookingForm>({
    date: new Date().toISOString().split("T")[0],
    time: "",
    consultationType: "",
    healthConcern: "",
  });

  const {
    createBooking,
    isBooking,
    isPaymentProcessing,
    isProcessing,
  } = useBooking();

  const consultationFee =
    consultation?.profile?.consultationFee ?? 0;

  const updateField = <K extends keyof BookingForm>(
    field: K,
    value: BookingForm[K]
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleDateSelect = (day: { dateString: string }) => {
    updateField("date", day.dateString);
    setShowDatePicker(false);
  };

  const handleSubmit = () => {
    if (isProcessing) return;

    const payload: Appointment = {
      date: form.date,
      time: form.time,
      consultationType: form.consultationType,
      healthConcern: form.healthConcern.trim(),
      doctorId: consultation?.id,
      hospitalId: consultation?.hospital?.id,
      amount: consultationFee,
    };

    createBooking(payload);
  };

  const isFormInvalid =
    !form.date ||
    !form.time ||
    !form.consultationType ||
    !form.healthConcern.trim();

  const isDisabled = isFormInvalid || isProcessing;

  const getButtonLabel = () => {
    if (isBooking) {
      return "Booking appointment...";
    }

    if (isPaymentProcessing) {
      return "Redirecting to payment...";
    }

    return "Proceed to Payment";
  };

  return (
    <div className="space-y-6">
      {/* Date */}
      <div>
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
      </div>

      {/* Time */}
      <TimeSlotSelector
        value={form.time}
        onChange={(value) => updateField("time", value)}
      />

      {/* Consultation Type */}
      <ConsultationTypeSelector
        value={form.consultationType}
        onChange={(value) => updateField("consultationType", value)}
      />

      {/* Health Concern */}
      <TextAreaInput
        label="Health Concern"
        placeholder="Describe your issue..."
        value={form.healthConcern}
        onChangeText={(value) =>
          updateField("healthConcern", value)
        }
      />

      {/* Summary */}
      <BookingSummary amount={consultationFee} />

      {/* Submit */}
      <button
        type="button"
        disabled={isDisabled}
        onClick={handleSubmit}
        className="w-full rounded-lg bg-pink-600 py-3 font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-50"
      >
        {getButtonLabel()}
      </button>
    </div>
  );
};

export default Booking;