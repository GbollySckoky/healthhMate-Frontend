import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

import { getStatusTone, type StatusTone } from "./Utils";

export const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600";

/* -------------------------------------------------------------------------- */
/* Detail: a label/value pair, used inside <dl>                               */
/* -------------------------------------------------------------------------- */

export function Detail({
  label,
  value,
  className,
  valueClassName,
}: {
  label: string;
  value?: string | number | null;
  className?: string;
  valueClassName?: string;
}) {
  const hasValue = value !== null && value !== undefined && value !== "";

  return (
    <div className={className}>
      <dt className="text-xs text-slate-500">{label}</dt>

      <dd
        className={`mt-0.5 break-words text-sm ${
          hasValue
            ? `font-normal text-gray-600 ${valueClassName ?? ""}`
            : "text-slate-400"
        }`}
      >
        {hasValue ? value : "Not recorded"}
      </dd>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Status badge                                                               */
/* -------------------------------------------------------------------------- */

const STATUS_STYLES: Record<StatusTone, string> = {
  success: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  warning: "bg-amber-50 text-amber-800 ring-amber-600/20",
  danger: "bg-red-50 text-red-700 ring-red-600/20",
  neutral: "bg-slate-100 text-slate-600 ring-slate-500/20",
};

export function StatusBadge({ status }: { status?: string | null }) {
  return (
    <span
      className={`inline-flex w-fit shrink-0 items-center rounded-full px-2.5 py-1 text-xs font-medium capitalize ring-1 ring-inset ${
        STATUS_STYLES[getStatusTone(status)]
      }`}
    >
      {status || "Recorded"}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* Section header                                                             */
/* -------------------------------------------------------------------------- */

export function SectionHeader({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-4 flex items-start justify-between gap-4">
      <div className="flex items-center gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
          <Icon size={18} aria-hidden />
        </span>

        <div>
          <h2 className="text-base font-medium text-gray-600">{title}</h2>

          {description && (
            <p className="text-sm text-slate-500">{description}</p>
          )}
        </div>
      </div>

      {action}
    </div>
  );
}

export function LinkButton({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`shrink-0 rounded text-sm font-medium text-emerald-700 hover:text-emerald-800 ${focusRing}`}
    >
      {children}
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/* Lists and empty states                                                     */
/* -------------------------------------------------------------------------- */

/** One bordered surface with dividers between rows, instead of a card per row. */
export function RecordList({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <ul
      aria-label={label}
      className="divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200 bg-white"
    >
      {children}
    </ul>
  );
}

export function EmptyState({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-10 text-center">
      <div className="mb-3 flex size-11 items-center justify-center rounded-full bg-slate-100 text-slate-400">
        <Icon size={22} aria-hidden />
      </div>

      <h3 className="text-sm font-semibold text-slate-800">{title}</h3>

      <p className="mt-1 max-w-xs text-sm text-slate-500">{description}</p>
    </div>
  );
}