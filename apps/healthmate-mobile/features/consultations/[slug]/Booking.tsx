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
  id: string
}

interface BookingForm {
  date: string;
  time: string;
  consultationType: string;
  healthConcern: string;
}

const Booking = ({ consultation, id }: BookingProps) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [form, setForm] = useState<BookingForm>({
    date: new Date().toISOString().split("T")[0],
    time: "",
    consultationType: "",
    healthConcern: "",
  });

  const today = new Date();

  const minDate = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  const {
    createBooking,
    isPaymentProcessing,
    isProcessing,
    isBooking
  } = useBooking(id);

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

  const getAvailableTimeSlots = (selectedDate: string): string[] => {
    if(!selectedDate) return [];

    const [year, month, day] = selectedDate.split("-").map(Number);

    const weekday = new Date(year, month - 1, day)
      .toLocaleDateString("en-US", { weekday: "long" })
      .toUpperCase();

    const availableSlots = consultation?.availability?.find(
      (slot: { dayOfWeek: string }) =>
        slot.dayOfWeek.trim().toUpperCase() === weekday
    );

    return availableSlots?.availableTimeSlots ?? [];
  }

  const getConsultationType = (selectedDate: string): string[] => {
    if (!selectedDate) return [];

    const [year, month, day] = selectedDate.split("-").map(Number);

    const weekday = new Date(year, month -1, day)
      .toLocaleDateString("en-US", { weekday: 'long'})
      .toUpperCase();

    const availableSlots = consultation?.availability?.find(
      (slot: { dayOfWeek: string }) =>
        slot.dayOfWeek.trim().toUpperCase() === weekday
    )

    return availableSlots?.consultationType ?? [];
  }

  const availableTimes = getAvailableTimeSlots(form.date);
  const availableCleaningType = getConsultationType(form.date);

  const handleDateSelect = (day: { dateString: string }) => {
    setForm((previous) => ({
      ...previous,
      date: day.dateString,
      time: "",
    }));
    setShowDatePicker(false);
  };

  const handleSubmit = () => {
    if (isProcessing) return;

    const payload: Appointment = {
      date: form.date,
      time: form.time,
      consultationType: form.consultationType,
      healthConcern: form.healthConcern.trim(),
      amount: consultationFee,
    };

    createBooking(payload);
  };

  const isFormInvalid =
    !form.date ||
    !form.time ||
    !availableTimes.includes(form.time) ||
    !form.consultationType ||
    !form.healthConcern.trim();

  const isDisabled = isFormInvalid || isProcessing || isBooking;

  const getButtonLabel = () => {

    if(isBooking){
      return 'Processing...'
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
          minDate={minDate}
          data={consultation?.availability || []}
        />
      </div>
  
      {/* Time */}
      <TimeSlotSelector
        value={form.time}
        onChange={(value) => updateField("time", value)}
        data={availableTimes}
      />

      {/* Consultation Type */}
      <ConsultationTypeSelector
        value={form.consultationType}
        onChange={(value) => updateField("consultationType", value)}
        data={availableCleaningType}
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
      <div className="mb-[15px]">
        <button
          type="button"
          disabled={isDisabled}
          onClick={handleSubmit}
          className="w-full rounded-lg bg-pink-600 py-3 font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-50 mb-[45px]"
        >
          {getButtonLabel()}
        </button>
      </div>
    </div>
  );
};

export default Booking;