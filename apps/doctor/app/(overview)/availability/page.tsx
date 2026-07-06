"use client";

import { useState } from "react";
import { Edit2, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FlexWrapper, PageWrapper } from "@/components/ui/Reusable";
import { Doctor } from "@/lib/constant/service";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

const timeSlots = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
];

const weekDays = [
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
];

const consultations = [
  { label: "Physical Appointment", value: "in_person" },
  { label: "Video Call", value: "video_call" },
  { label: "Audio Call", value: "audio_call" },
];

type Availability = {
  dayOfWeek: string;
  availableTimeSlots: string[];
  consultationType: string[];
};

export default function AvailabilityPage() {
  const [selectedDay, setSelectedDay] = useState("MONDAY");
  const [openModal, setOpenModal] = useState(false);
  const [draftTimes, setDraftTimes] = useState<string[]>([]);
  const [draftConsultationTypes, setDraftConsultationTypes] = useState<string[]>([]);
  const [availabilityEvents, setAvailabilityEvents] = useState<Availability[]>([]);
  console.log(draftConsultationTypes)
  const selectedEvent = availabilityEvents.find(
    (event) => event.dayOfWeek === selectedDay
  );

  const selectedDayTimes = selectedEvent?.availableTimeSlots || [];
  const selectedConsultations = selectedEvent?.consultationType || [];

  const openEditModal = () => {
    setDraftTimes(selectedDayTimes);
    setDraftConsultationTypes(selectedConsultations);
    setOpenModal(true);
  };

  const toggleDraftTime = (slot: string) => {
    setDraftTimes((prev) =>
      prev.includes(slot)
        ? prev.filter((item) => item !== slot)
        : [...prev, slot]
    );
  };

  const toggleConsultationType = (type: string) => {
    setDraftConsultationTypes((prev) =>
      prev.includes(type)
        ? prev.filter((item) => item !== type)
        : [...prev, type]
    );
  };

  const saveAvailability = () => {
    setAvailabilityEvents((prev) => {
      const dayExists = prev.some((event) => event.dayOfWeek === selectedDay);

      if (draftTimes.length === 0) {
        return prev.filter((event) => event.dayOfWeek !== selectedDay);
      }

      if (dayExists) {
        return prev.map((event) =>
          event.dayOfWeek === selectedDay
            ? {
                ...event,
                availableTimeSlots: draftTimes,
                consultationType: draftConsultationTypes,
              }
            : event
        );
      }

      return [
        ...prev,
        {
          dayOfWeek: selectedDay,
          availableTimeSlots: draftTimes,
          consultationType: draftConsultationTypes,
        },
      ];
    });

    setOpenModal(false);
  };

  const deleteSelectedDaySlots = () => {
    setAvailabilityEvents((prev) =>
      prev.filter((event) => event.dayOfWeek !== selectedDay)
    );
  };

  // const submitAvailability = async () => {
  //   await Doctor.createDoctorAvailability(availabilityEvents);
  // };

  const mutation = useMutation({
    mutationKey: ['createAvailability'],
    mutationFn: (payload: Availability) => Doctor.createDoctorAvailability(payload),
    onSuccess: (response) => {
      console.log(response)
    },
    onError: (error: AxiosError) => {
      console.log(error)
    }
  })

  const submitAvailability = async () => {
    const payload = {
      dayOfWeek: selectedDay,
      availableTimeSlots: draftTimes,
      consultationType: draftConsultationTypes
    }

    console.log("JAMES", payload)
    await mutation.mutateAsync(payload)
  }

  return (
    <PageWrapper>
      <FlexWrapper>
        <section className="space-y-6">
          <div className="rounded-xl border bg-white p-8">
            <p className="mb-4 text-sm font-medium">Select Available Day</p>

            <div className="flex flex-wrap gap-3">
              {weekDays.map((day) => {
                const active = selectedDay === day;
                const hasAvailability = availabilityEvents.some(
                  (event) => event.dayOfWeek === day
                );

                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    className={`rounded-md border px-5 py-2 text-sm ${
                      active
                        ? "border-[#D92D8A] bg-[#FFE7E1]"
                        : "border-gray-300 bg-white"
                    }`}
                  >
                    {day}
                    {hasAvailability && (
                      <span className="ml-2 text-[#D92D8A]">●</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="rounded-xl border bg-white p-8">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-medium">Available Time Slots</p>
              <p className="text-sm text-gray-500">{selectedDay}</p>
            </div>

            {selectedDayTimes.length > 0 ? (
              <div className="flex max-w-3xl flex-wrap gap-3">
                {selectedDayTimes.map((slot) => (
                  <button
                    key={slot}
                    className="rounded-md border border-gray-400 px-5 py-2 text-sm"
                  >
                    {slot}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">
                No time slot selected for this day.
              </p>
            )}

            <div className="mt-8 flex gap-6 text-gray-600">
              <button onClick={deleteSelectedDaySlots}>
                <Trash2 size={18} />
              </button>

              <button onClick={openEditModal}>
                <Edit2 size={18} />
              </button>
            </div>
          </div>

          <div className="rounded-xl border bg-white p-8">
            <p className="text-sm font-medium">Consultation Type</p>

            {selectedConsultations.length > 0 ? (
              <div className="mt-4 flex max-w-3xl flex-wrap gap-3">
                {selectedConsultations.map((type) => (
                  <button
                    key={type}
                    className="rounded-md border border-gray-400 px-5 py-2 text-sm"
                  >
                    {type}
                  </button>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-sm text-gray-500">
                No consultation type selected.
              </p>
            )}
          </div>

          <Button
            onClick={submitAvailability}
            className="bg-[#D92D8A] hover:bg-[#C01F78]"
          >
            Save Doctor Availability
          </Button>
        </section>
      </FlexWrapper>

      <AvailabilityModal
        open={openModal}
        setOpen={setOpenModal}
        selectedDay={selectedDay}
        draftTimes={draftTimes}
        draftConsultationTypes={draftConsultationTypes}
        toggleDraftTime={toggleDraftTime}
        toggleConsultationType={toggleConsultationType}
        saveAvailability={saveAvailability}
      />
    </PageWrapper>
  );
}

function AvailabilityModal({
  open,
  setOpen,
  selectedDay,
  draftTimes,
  draftConsultationTypes,
  toggleDraftTime,
  toggleConsultationType,
  saveAvailability,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
  selectedDay: string;
  draftTimes: string[];
  draftConsultationTypes: string[];
  toggleDraftTime: (slot: string) => void;
  toggleConsultationType: (type: string) => void;
  saveAvailability: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-xl p-0">
        <DialogHeader className="border-b px-6 py-5">
          <div className="flex items-center justify-between">
            <DialogTitle>Edit Availability</DialogTitle>

            <button onClick={() => setOpen(false)}>
              <X size={20} />
            </button>
          </div>
        </DialogHeader>

        <div className="space-y-6 px-6 py-5">
          <div className="rounded-lg border py-4 text-center font-medium">
            {selectedDay}
          </div>

          <div>
            <p className="mb-4 text-sm font-medium">Time Slots</p>

            <div className="grid grid-cols-4 gap-4">
              {timeSlots.map((slot) => {
                const active = draftTimes.includes(slot);

                return (
                  <button
                    key={slot}
                    onClick={() => toggleDraftTime(slot)}
                    className={`rounded-md border px-4 py-3 text-sm ${
                      active
                        ? "border-[#FFE7E1] bg-[#FFE7E1]"
                        : "border-gray-200 bg-white"
                    }`}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <p className="mb-4 text-sm font-medium">Consultation Type</p>

            <div className="flex flex-wrap gap-3">
              {consultations.map((consultation) => {
                const active = draftConsultationTypes.includes(
                  consultation.value
                );

                return (
                  <button
                    key={consultation.value}
                    onClick={() => toggleConsultationType(consultation.value)}
                    className={`rounded-md border px-5 py-2 text-sm ${
                      active
                        ? "border-[#D92D8A] bg-[#FFE7E1]"
                        : "border-gray-300 bg-white"
                    }`}
                  >
                    {consultation.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex justify-between border-t px-6 py-5">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>

          <Button
            onClick={saveAvailability}
            className="bg-[#D92D8A] hover:bg-[#C01F78]"
          >
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}