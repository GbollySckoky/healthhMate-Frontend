"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/lib/components/ui/table";

type AvailabilitySlot = {
  id: string;
  doctorId: string;
  dayOfWeek: string;
  availableTimeSlots: string[];
  consultationType: string[];
  createdAt?: string;
  updatedAt?: string;
};

const DAY_ORDER = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
];

const formatDay = (day: string) =>
  day ? day.charAt(0).toUpperCase() + day.slice(1).toLowerCase() : "-";

const formatConsultationType = (type: string) => {
  switch (type) {
    case "in_person":
      return "In Person";
    case "video_call":
      return "Video Call";
    case "audio_call":
      return "Audio Call";
    default:
      return type;
  }
};

const consultationTypeStyle = (type: string) => {
  switch (type) {
    case "in_person":
      return "text-purple-700 bg-purple-100";
    case "video_call":
      return "text-blue-700 bg-blue-100";
    case "audio_call":
      return "text-amber-700 bg-amber-100";
    default:
      return "text-gray-700 bg-gray-100";
  }
};

const formatTime = (time: string) => {
  const [hourStr, minuteStr] = time.split(":");
  const hour = Number(hourStr);
  const period = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${displayHour}:${minuteStr} ${period}`;
};

const sortTimeSlots = (slots: string[]) => [...slots].sort((a, b) => a.localeCompare(b));

// ---------- Skeleton ----------

const SkeletonRow = () => (
  <TableRow>
    <TableCell>
      <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
    </TableCell>
    <TableCell>
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-6 w-16 animate-pulse rounded-full bg-gray-200" />
        ))}
      </div>
    </TableCell>
    <TableCell>
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="h-6 w-20 animate-pulse rounded-full bg-gray-200" />
        ))}
      </div>
    </TableCell>
  </TableRow>
);

const AvailabilitySkeleton = () => (
  <TableBody>
    {Array.from({ length: 5 }).map((_, i) => (
      <SkeletonRow key={i} />
    ))}
  </TableBody>
);

// ---------- Main ----------

const Availability = ({
  availability,
  isLoading,
}: {
  availability: AvailabilitySlot[];
  isLoading: boolean;
}) => {
  const sortedAvailability = [...(availability || [])].sort(
    (a, b) => DAY_ORDER.indexOf(a.dayOfWeek) - DAY_ORDER.indexOf(b.dayOfWeek)
  );

  return (
    <div>
      <Table>
        <TableHeader className="border-t border-borderColor text-grey-20">
          <TableRow className="bg-[#FAFBFF] font-inter text-[12px] font-medium">
            <TableHead>Day</TableHead>
            <TableHead>Available Time Slots</TableHead>
            <TableHead>Consultation Type</TableHead>
          </TableRow>
        </TableHeader>

        {isLoading ? (
          <AvailabilitySkeleton />
        ) : (
          <TableBody>
            {sortedAvailability.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="py-8 text-center text-sm text-gray-500">
                  No availability set
                </TableCell>
              </TableRow>
            ) : (
              sortedAvailability.map((slot) => (
                <TableRow key={slot.id}>
                  <TableCell className="font-inter text-[14px] font-medium text-grey-30">
                    {formatDay(slot.dayOfWeek)}
                  </TableCell>

                  <TableCell>
                    <div className="flex flex-wrap gap-2">
                      {slot.availableTimeSlots?.length ? (
                        sortTimeSlots(slot.availableTimeSlots).map((time) => (
                          <span
                            key={time}
                            className="rounded-full bg-[#FDF2FA] px-3 py-1 font-inter text-[12px] font-medium text-[#C11574]"
                          >
                            {formatTime(time)}
                          </span>
                        ))
                      ) : (
                        <span className="text-[12px] text-gray-400">-</span>
                      )}
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex flex-wrap gap-2">
                      {slot.consultationType?.length ? (
                        slot.consultationType.map((type) => (
                          <span
                            key={type}
                            className={`rounded-full px-3 py-1 font-inter text-[12px] font-medium ${consultationTypeStyle(
                              type
                            )}`}
                          >
                            {formatConsultationType(type)}
                          </span>
                        ))
                      ) : (
                        <span className="text-[12px] text-gray-400">-</span>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        )}
      </Table>
    </div>
  );
};

export default Availability;