"use client";

import { useId, useState } from "react";
import { ChevronDown, ChevronUp, Stethoscope } from "lucide-react";

import type { ConsultationNote } from "@/lib/interface/medical-records";

import { Detail, StatusBadge, focusRing } from "./Primitives";
import { formatDate, getFullName } from "./Utils";

const NOTES_PREVIEW_LENGTH = 180;

export function ConsultationItem({
  note,
  compact = false,
}: {
  note: ConsultationNote;
  /** Shorter layout for the overview tab. */
  compact?: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const notesId = useId();

  const appointment = note?.appointment;
  const clinicalNote = note?.consultationNote || "";
  const canExpand = !compact && clinicalNote.length > NOTES_PREVIEW_LENGTH;
  const Chevron = expanded ? ChevronUp : ChevronDown;

  return (
    <li className="p-5 sm:p-6">
      {/* Doctor and status */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
            <Stethoscope size={20} aria-hidden />
          </span>

          <div className="min-w-0">
            <h3 className="font-medium text-base text-gray-600">
              {getFullName(note?.doctor)}
            </h3>

            <p className="mt-0.5 text-sm text-slate-500">
              {note?.hospital?.hospitalName || "Hospital not recorded"}
            </p>
          </div>
        </div>

        <StatusBadge status={appointment?.status} />
      </div>

      {/* Appointment details */}
      <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3">
        <Detail label="Date" value={formatDate(appointment?.date)} />

        {!compact && <Detail label="Time" value={appointment?.time} />}

        <Detail
          label="Type"
          value={appointment?.consultationType.replaceAll("_", " ")}
          valueClassName="capitalize"
        />

        <Detail
          label="Health concern"
          value={appointment?.healthConcern}
          className="col-span-2 sm:col-span-3"
          valueClassName={compact ? "line-clamp-2" : ""}
        />
      </dl>

      {/* Clinical notes */}
      <div
        className={
          compact ? "mt-3" : "mt-4 border-t border-slate-100 pt-4"
        }
      >
        {!compact && (
          <h4 className="text-sm font-semibold text-slate-700">
            Clinical notes
          </h4>
        )}

        <p
          id={notesId}
          className={`whitespace-pre-wrap text-sm leading-6 ${
            compact ? "" : "mt-1.5"
          } ${clinicalNote ? "text-slate-600" : "text-slate-400"} ${
            expanded ? "" : compact ? "line-clamp-2" : "line-clamp-3"
          }`}
        >
          {clinicalNote || "No clinical notes recorded."}
        </p>

        {canExpand && (
          <button
            type="button"
            aria-expanded={expanded}
            aria-controls={notesId}
            onClick={() => setExpanded((previous) => !previous)}
            className={`mt-2 inline-flex items-center gap-1 rounded text-sm font-medium text-emerald-700 hover:text-emerald-800 ${focusRing}`}
          >
            {expanded ? "Show less" : "Read full notes"}
            <Chevron size={16} aria-hidden />
          </button>
        )}
      </div>
    </li>
  );
}