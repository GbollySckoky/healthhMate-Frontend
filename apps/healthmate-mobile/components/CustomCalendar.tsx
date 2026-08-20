import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface CalendarDay {
  dateString: string;
}

interface CustomCalendarType {
  isOpen: boolean;
  onChangeText: (day: CalendarDay) => void;
  onClose: () => void;
  minDate?: string;
}

const CustomCalendar = ({
  isOpen,
  onChangeText,
  onClose,
  minDate,
}: CustomCalendarType) => {
  const [viewDate, setViewDate] = useState<Date>(new Date());

  /*
   * Convert YYYY-MM-DD into a local Date.
   *
   * We don't use new Date("YYYY-MM-DD") because that
   * can be interpreted as UTC and cause timezone issues.
   */
  const parseDate = (dateString: string): Date => {
    const [year, month, day] = dateString.split("-").map(Number);

    return new Date(year, month - 1, day);
  };

  /*
   * Format a Date as YYYY-MM-DD using local date values.
   */
  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  /*
   * Reset the calendar view when it opens.
   *
   * If minDate is supplied, start from that month.
   * Otherwise start from the current month.
   */
  useEffect(() => {
    if (!isOpen) return;

    if (minDate) {
      setViewDate(parseDate(minDate));
    } else {
      setViewDate(new Date());
    }
  }, [isOpen, minDate]);

  if (!isOpen) return null;

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const monthLabel = viewDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  /*
   * Determine the first month the user is allowed to view.
   */
  const minimumMonth = minDate
    ? parseDate(minDate)
    : new Date();

  const minimumYear = minimumMonth.getFullYear();
  const minimumMonthIndex = minimumMonth.getMonth();

  /*
   * Disable the previous-month button when we're already
   * viewing the minimum allowed month.
   */
  const isPreviousMonthDisabled =
    year < minimumYear ||
    (year === minimumYear && month <= minimumMonthIndex);

  const changeMonth = (delta: number) => {
    const newDate = new Date(year, month + delta, 1);

    /*
     * Don't allow navigation to a month before minDate.
     */
    if (
      minDate &&
      newDate <
        new Date(minimumYear, minimumMonthIndex, 1)
    ) {
      return;
    }

    setViewDate(newDate);
  };

  const selectDay = (day: number) => {
    const dateObj = new Date(year, month, day);
    const dateString = formatDate(dateObj);

    /*
     * Don't allow selecting a date before minDate.
     */
    if (minDate && dateString < minDate) {
      return;
    }

    onChangeText({
      dateString,
    });

    onClose();
  };

  const isDateDisabled = (day: number): boolean => {
    if (!minDate) return false;

    const dateObj = new Date(year, month, day);
    const dateString = formatDate(dateObj);

    return dateString < minDate;
  };

  const cells: (number | null)[] = [];

  for (let i = 0; i < firstDay; i++) {
    cells.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    cells.push(day);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
      onClick={onClose}
    >
      <div
        className="w-[300px] rounded-xl bg-white p-4 shadow-lg"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Calendar Header */}
        <div className="mb-3 flex items-center justify-between">
          <button
            type="button"
            onClick={() => changeMonth(-1)}
            disabled={isPreviousMonthDisabled}
            className="
              rounded p-1
              hover:bg-gray-100
              disabled:cursor-not-allowed
              disabled:opacity-30
            "
          >
            <ChevronLeft size={18} />
          </button>

          <p className="text-sm font-semibold text-[#414651]">
            {monthLabel}
          </p>

          <button
            type="button"
            onClick={() => changeMonth(1)}
            className="rounded p-1 hover:bg-gray-100"
          >
            <ChevronRight size={18} />
          </button>

          <button
            type="button"
            onClick={onClose}
            className="ml-1 rounded p-1 hover:bg-gray-100"
          >
            <X size={16} />
          </button>
        </div>

        {/* Days of Week */}
        <div className="mb-1 grid grid-cols-7 gap-1">
          {["S", "M", "T", "W", "T", "F", "S"].map(
            (day, index) => (
              <div
                key={index}
                className="py-1 text-center text-xs text-[#717680]"
              >
                {day}
              </div>
            )
          )}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-1">
          {cells.map((day, index) => {
            if (!day) {
              return <div key={index} />;
            }

            const disabled = isDateDisabled(day);

            return (
              <button
                key={index}
                type="button"
                disabled={disabled}
                onClick={() => selectDay(day)}
                className={`
                  rounded py-1.5 text-sm transition-colors
                  ${
                    disabled
                      ? "cursor-not-allowed text-gray-300"
                      : "cursor-pointer hover:bg-[#DD2590] hover:text-white"
                  }
                `}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CustomCalendar;