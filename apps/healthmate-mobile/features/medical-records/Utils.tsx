import type { Doctor } from "@/lib/interface/medical-records";

const DATE_ONLY = /^(\d{4})-(\d{2})-(\d{2})$/;

/**
 * Date-only strings like "2025-03-04" are parsed as local dates so they
 * never shift by a day depending on the viewer's time zone.
 */
function parseDate(value: string) {
  const match = DATE_ONLY.exec(value);

  return match
    ? new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]))
    : new Date(value);
}

/** Returns null when there is no date, so callers can show their own fallback. */
export function formatDate(date?: string | null): string | null {
  if (!date) return null;

  const parsed = parseDate(date);

  if (Number.isNaN(parsed.getTime())) return date;

  return parsed.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function getFullName(doctor?: Doctor | null) {
  if (!doctor) return "Unknown doctor";

  return (
    [doctor.title, doctor.firstName, doctor.lastName]
      .filter(Boolean)
      .join(" ") || "Unknown doctor"
  );
}

export function getInitials(
  firstName?: string | null,
  lastName?: string | null,
) {
  const initials = `${firstName?.charAt(0) ?? ""}${lastName?.charAt(0) ?? ""}`;

  return initials.toUpperCase() || "?";
}

export type StatusTone = "success" | "warning" | "danger" | "neutral";

export function getStatusTone(status?: string | null): StatusTone {
  const value = status?.trim().toLowerCase() ?? "";

  if (["completed", "complete", "done", "attended"].includes(value)) {
    return "success";
  }

  if (
    ["pending", "scheduled", "upcoming", "confirmed", "ongoing"].includes(value)
  ) {
    return "warning";
  }

  if (
    ["cancelled", "canceled", "missed", "declined", "rejected", "no-show"].includes(
      value,
    )
  ) {
    return "danger";
  }

  return "neutral";
}

/** "None", "N/A", "No known allergies"… shouldn't be styled as a warning. */
export function isNegativeEntry(value?: string | null) {
  return /^(none|nil|nka|nkda|n\/a|no known|no allergies)\b/i.test(
    value?.trim() ?? "",
  );
}