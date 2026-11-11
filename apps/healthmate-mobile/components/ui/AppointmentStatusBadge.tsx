import React from "react";

type AppointmentStatusBadgeProps = {
  status?: string | null;
};

const STATUS_STYLES: Record<string, string> = {
  PENDING: "bg-[#FFFAEB] text-[#B54708]",
  UPCOMING: "bg-[#F4F3FF] text-[#5924DC]",
  COMPLETED: "bg-[#EBFEF3] text-[#027A48]",
  CANCELLED: "bg-[#FEF3F2] text-[#B42318]",
};

export const AppointmentStatusBadge = ({ status }: AppointmentStatusBadgeProps) => {
  const normalizedStatus = status?.trim().toUpperCase().replaceAll(" ", "_") || "PENDING";
  const variantClasses = STATUS_STYLES[normalizedStatus] || STATUS_STYLES.PENDING;
  const label =
    normalizedStatus.charAt(0) +
    normalizedStatus.slice(1).toLocaleLowerCase().replaceAll("_", " ");

  return (
    <span
      className={`inline-flex items-center justify-center rounded-[10px] px-[10px] h-[35px] font-inter-medium text-xs font-medium whitespace-nowrap ${variantClasses}`}
    >
      {label}
    </span>
  );
};

export default AppointmentStatusBadge;