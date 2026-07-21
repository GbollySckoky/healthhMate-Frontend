"use client";

import { useState } from "react";
import { Edit2, Trash2, X } from "lucide-react";
import { Button } from "@/lib/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/lib/components/ui/dialog";
import { FlexWrapper, PageWrapper } from "@/lib/components/ui/Reusable";
import { Doctor } from "@/lib/constant/service";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import useGetDoctorAvailability from "@/lib/hooks/useGetDoctorAvailability";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/lib/components/ui/table";

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

type AvailabilityRecord = {
  id: string;
  doctorId: string;
  dayOfWeek: string;
  availableTimeSlots: string[];
  consultationType: string[];
  createdAt: string;
  updatedAt: string;
};

const consultationLabels: Record<string, string> = {
  in_person: "Physical",
  video_call: "Video Call",
  audio_call: "Audio Call",
};

function AvailabilityTableSkeleton() {
  return (
    <>
      {[...Array(3)].map((_, i) => (
        <TableRow key={i}>
          {[...Array(4)].map((__, j) => (
            <TableCell key={j}>
              <div className="h-4 w-24 bg-gray-100 rounded animate-pulse" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}

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

  const {doctorAvailability, isLoading, isError, error} = useGetDoctorAvailability()
  console.log(doctorAvailability)

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
      <section className="space-y-5 w-full">
        {/* Day selector */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <p className="mb-4 text-sm font-semibold text-gray-900">Select Available Day</p>
          <div className="flex flex-wrap gap-2">
            {weekDays.map((day) => {
              const active = selectedDay === day;
              const hasAvailability = availabilityEvents.some(
                (event) => event.dayOfWeek === day
              );
              return (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`relative rounded-lg border px-4 py-2 text-xs font-medium tracking-wide transition ${
                    active
                      ? "border-[#D92D8A] bg-[#FFE7E1] text-[#D92D8A]"
                      : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                  }`}
                >
                  {day}
                  {hasAvailability && (
                    <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-[#D92D8A]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Time slots */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-semibold text-gray-900">Available Time Slots</p>
            <span className="rounded-full bg-gray-50 px-3 py-1 text-xs font-medium text-gray-500">
              {selectedDay}
            </span>
          </div>

          {selectedDayTimes.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {selectedDayTimes
                .slice()
                .sort()
                .map((slot) => (
                  <span
                    key={slot}
                    className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-1.5 text-xs font-medium text-gray-700"
                  >
                    {slot}
                  </span>
                ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400">No time slot selected for this day.</p>
          )}

          <div className="mt-6 flex gap-4 border-t border-gray-100 pt-4">
            <button
              onClick={deleteSelectedDaySlots}
              className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-red-500 transition"
            >
              <Trash2 size={15} /> Clear
            </button>
            <button
              onClick={openEditModal}
              className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-[#D92D8A] transition"
            >
              <Edit2 size={15} /> Edit
            </button>
          </div>
        </div>

        {/* Consultation type */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <p className="mb-4 text-sm font-semibold text-gray-900">Consultation Type</p>
          {selectedConsultations.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {selectedConsultations.map((type) => (
                <span
                  key={type}
                  className="rounded-lg border border-[#FFE7E1] bg-[#FFF5F1] px-4 py-1.5 text-xs font-medium text-[#D92D8A]"
                >
                  {consultationLabels[type] ?? type}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400">No consultation type selected.</p>
          )}
        </div>

        <Button
          onClick={submitAvailability}
          className="bg-[#D92D8A] hover:bg-[#C01F78] rounded-lg px-6 py-5 text-sm font-medium"
        >
          Save Doctor Availability
        </Button>

        {/* Table */}
        <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100">
            <p className="text-sm font-semibold text-gray-900">Weekly Schedule</p>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="bg-[#FAFBFF] hover:bg-[#FAFBFF]">
                <TableHead className="text-[11px] font-medium uppercase tracking-wide text-gray-400 py-3">
                  Day
                </TableHead>
                <TableHead className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
                  Time Slots
                </TableHead>
                <TableHead className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
                  Consultation Type
                </TableHead>
                <TableHead className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
                  Last Updated
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <AvailabilityTableSkeleton />
              ) : isError ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-10 text-gray-400 text-sm">
                    {error?.message ?? "Failed to load availability"}
                  </TableCell>
                </TableRow>
              ) : !doctorAvailability || doctorAvailability.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-10 text-gray-400 text-sm">
                    No availability set yet
                  </TableCell>
                </TableRow>
              ) : (
                doctorAvailability.map((available: AvailabilityRecord) => (
                  <TableRow
                    key={available.id}
                    className="hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0"
                    onClick={() => setSelectedDay(available.dayOfWeek)}
                  >
                    <TableCell className="py-4">
                      <span className="inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                        {available.dayOfWeek.charAt(0) + available.dayOfWeek.slice(1).toLowerCase()}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1.5 max-w-md">
                        {available.availableTimeSlots
                          .slice()
                          .sort()
                          .map((slot) => (
                            <span
                              key={slot}
                              className="px-2.5 py-1 rounded-md bg-gray-50 border border-gray-100 text-[11px] font-medium text-gray-600"
                            >
                              {slot}
                            </span>
                          ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1.5">
                        {available.consultationType.map((type) => (
                          <span
                            key={type}
                            className="px-2.5 py-1 rounded-md bg-[#FFF5F1] text-[11px] font-medium text-[#D92D8A]"
                          >
                            {consultationLabels[type] ?? type}
                          </span>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-xs text-gray-400">
                      {new Date(available.updatedAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
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