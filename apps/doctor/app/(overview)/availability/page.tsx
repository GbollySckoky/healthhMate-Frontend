"use client";

import { useState } from "react";
import { Edit2, Trash2, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useGetCalendarDays from "@/hooks/useGetCalendarDays";
import { FlexWrapper, PageWrapper } from "@/components/ui/Reusable";

const timeSlots = [
  "8:00am",
  "9:00am",
  "10:00am",
  "11:00am",
  "12:00pm",
  "1:00pm",
  "2:00pm",
  "3:00pm",
  "4:00pm",
  "5:00pm",
  "6:00pm",
  "7:00pm",
];

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const consultations = [
  {label: "Physical Appointment", value: "in_person"},
  {label: "Video Call", value: "video_call"},
  {label: "Audio Call", value: "audio_call"},
]

type AvailabilityEvent = {
  date: string;
  times: string[];
};

const initialAvailabilityEvents: AvailabilityEvent[] = [
  {
    date: "2025-07-18",
    times: ["9:00am", "11:00am", "12:00pm", "2:00pm"],
  },
  {
    date: "2025-07-25",
    times: ["8:00am", "10:00am", "1:00pm", "4:00pm"],
  },
  {
    date: "2025-07-28",
    times: ["9:00am", "3:00pm", "5:00pm"],
  },
];

const formatDateKey = (date: Date) => {
  return date.toLocaleDateString("en-CA");
};

const isSameDate = (firstDate: Date, secondDate: Date) => {
  return firstDate.toDateString() === secondDate.toDateString();
};

export default function AvailabilityPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 6));
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 6, 25));

  const [availabilityEvents, setAvailabilityEvents] = useState<
    AvailabilityEvent[]
  >(initialAvailabilityEvents);

  const [openModal, setOpenModal] = useState(false);
  const [draftTimes, setDraftTimes] = useState<string[]>([]);
  const {getCalendarDays} = useGetCalendarDays()
  const calendarDays = getCalendarDays(currentDate);
  const selectedDateKey = formatDateKey(selectedDate);

  const selectedEvent = availabilityEvents.find(
    (event) => event.date === selectedDateKey
  );

  const selectedDateTimes = selectedEvent?.times || [];

  const monthName = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const selectedDateText = selectedDate.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  const hasEvent = (date: Date) => {
    const dateKey = formatDateKey(date);
    return availabilityEvents.some((event) => event.date === dateKey);
  };

  const openTimeModal = () => {
    setDraftTimes(selectedDateTimes);
    setOpenModal(true);
  };

  const toggleDraftTime = (slot: string) => {
    setDraftTimes((prev) =>
      prev.includes(slot)
        ? prev.filter((item) => item !== slot)
        : [...prev, slot]
    );
  };

  const saveTimeSlots = () => {
    setAvailabilityEvents((prev) => {
      const dateExists = prev.some((event) => event.date === selectedDateKey);

      if (draftTimes.length === 0) {
        return prev.filter((event) => event.date !== selectedDateKey);
      }

      if (dateExists) {
        return prev.map((event) =>
          event.date === selectedDateKey
            ? { ...event, times: draftTimes }
            : event
        );
      }

      return [
        ...prev,
        {
          date: selectedDateKey,
          times: draftTimes,
        },
      ];
    });

    setOpenModal(false);
  };

  const deleteSelectedDateSlots = () => {
    setAvailabilityEvents((prev) =>
      prev.filter((event) => event.date !== selectedDateKey)
    );
  };

  return (
    <PageWrapper>
      <FlexWrapper>
        <section className="space-y-6">
          <div className="rounded-xl border bg-white">
            <div className="flex items-center gap-4 border-b px-8 py-5">
              <Button variant="outline" size="icon" onClick={prevMonth}>
                <ChevronLeft size={16} />
              </Button>

              <p className="font-medium">{monthName}</p>

              <Button variant="outline" size="icon" onClick={nextMonth}>
                <ChevronRight size={16} />
              </Button>
            </div>

            <div className="grid grid-cols-7 gap-y-8 px-16 py-10 text-center">
              {weekDays.map((day) => (
                <p key={day} className="font-medium text-[#111827]">
                  {day}
                </p>
              ))}

              {calendarDays.map((item, index) => {
                const isSelected = isSameDate(item.date, selectedDate);
                const eventExists = hasEvent(item.date);

                return (
                  <div key={index} className="flex flex-col items-center gap-2">
                    <button
                      onClick={() => setSelectedDate(item.date)}
                      className={`h-10 min-w-20 rounded-2xl text-sm transition ${
                        isSelected
                          ? "bg-[#FFE8E0] text-[#111827]"
                          : !item.currentMonth
                          ? "text-gray-400"
                          : "text-[#111827]"
                      }`}
                    >
                      {item.day}
                    </button>

                    {eventExists && (
                      <span className="h-1.5 w-1.5 rounded-full bg-[#D92D8A]" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-xl border bg-white p-8">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-medium">Available Time Slots</p>
              <p className="text-sm text-gray-500">{selectedDateText}</p>
            </div>

            {selectedDateTimes.length > 0 ? (
              <div className="flex max-w-3xl flex-wrap gap-3">
                {selectedDateTimes.map((slot) => (
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
                No time slot selected for this date.
              </p>
            )}

            <div className="mt-8 flex gap-6 text-gray-600">
              <button onClick={deleteSelectedDateSlots}>
                <Trash2 size={18} />
              </button>

              <button onClick={openTimeModal}>
                <Edit2 size={18} />
              </button>
            </div>
          </div>

           <SelectConsultation />
        </section>
      </FlexWrapper>

      <TimeSlotModal
        open={openModal}
        setOpen={setOpenModal}
        selectedDateText={selectedDateText}
        draftTimes={draftTimes}
        toggleDraftTime={toggleDraftTime}
        saveTimeSlots={saveTimeSlots}
      />
    </PageWrapper>
  );
}

function TimeSlotModal({
  open,
  setOpen,
  selectedDateText,
  draftTimes,
  toggleDraftTime,
  saveTimeSlots,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
  selectedDateText: string;
  draftTimes: string[];
  toggleDraftTime: (slot: string) => void;
  saveTimeSlots: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-xl p-0">
        <DialogHeader className="border-b px-6 py-5">
          <div className="flex items-center justify-between">
            <DialogTitle>Edit Time Slot</DialogTitle>

            <button onClick={() => setOpen(false)}>
              <X size={20} />
            </button>
          </div>
        </DialogHeader>

        <div className="space-y-6 px-6 py-5">
          <div className="rounded-lg border py-4 text-center font-medium">
            {selectedDateText}
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
                    className={`rounded-md border px-4 py-3 text-sm transition ${
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
        </div>

        <div className="flex justify-between border-t px-6 py-5">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>

          <Button
            onClick={saveTimeSlots}
            className="bg-[#D92D8A] hover:bg-[#C01F78]"
          >
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

const SelectConsultation = () => {
  return(
   <div className="rounded-xl border bg-white p-8">
      <p className="text-sm font-medium">Consultation Type</p>
      <div className="flex max-w-3xl flex-wrap gap-3 mt-4">
        {consultations.map((consultation) => (
          <button className="rounded-md border border-gray-400 px-5 py-2 text-sm" key={consultation.value}>
            {consultation.label}
          </button>
        ))}
      </div>
    </div>
  )
}