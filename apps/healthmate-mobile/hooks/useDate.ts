"use client";
import { useCallback } from "react";

const useDate = () => {
  const getReadableDate = useCallback((value: string) => {
    if (!value || value === "-") return "-";

    try {
      const date = new Date(value);
      // Check if date is valid
      if (isNaN(date.getTime())) return "-";

      // Format the date (e.g., "Jan 15, 2024")
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch (error: unknown) {
        console.error(error)
      return "-";
    }
  }, []);

  const formatTime = (value: string) =>
  value
    ? new Date(value).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "-";

  const getToday = new Date().toLocaleDateString() 

  const formatReadingDate = (date?: string) => {
    if (!date) return "No date recorded";

    const readingDate = new Date(date);

    if (Number.isNaN(readingDate.getTime())) {
      return "No date recorded";
    }

    return `${readingDate.toLocaleDateString()} at ${readingDate.toLocaleTimeString()}`;
  };
  return {
    getReadableDate,
    formatReadingDate,
    formatTime,
    getToday
  };
};

export default useDate;
