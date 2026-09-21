import { Pill } from "lucide-react";

import type { Prescription } from "@/lib/interface/medical-records";

import { Detail } from "./Primitives";
import { formatDate, getFullName } from "./Utils";
import { CapitalizeName } from "@/constants/capitalizeName";

export function PrescriptionItem({
  prescription,
  compact = false,
}: {
  prescription: Prescription;
  /** Shorter layout for the overview tab. */
  compact?: boolean;
}) {
  const doctorName = prescription?.doctor
    ? getFullName(prescription.doctor)
    : prescription?.prescribedBy || "Unknown doctor";

  const prescribedOn = formatDate(prescription?.createdAt);

  return (
    <li className="p-5 sm:p-6">
      {/* Medication and prescriber */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
            <Pill size={20} aria-hidden />
          </span>

          <div className="min-w-0">
            <h3 className="break-words font-medium text-gray-600">
              {CapitalizeName(prescription?.prescription) || "N/A"}
            </h3>

            <p className="mt-0.5 text-sm text-slate-500">
              Prescribed by {doctorName}
            </p>
          </div>
        </div>

        {prescribedOn && (
          <p className="shrink-0 text-xs text-slate-500">{prescribedOn}</p>
        )}
      </div>

      {/* Instructions */}
      <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3">
        <Detail label="Dosage" value={prescription?.dosage} />
        <Detail label="Frequency" value={prescription?.frequency} />
        <Detail label="Duration" value={prescription?.duration} />

        {!compact && (
          <Detail
            label="Hospital"
            value={prescription?.hospital?.hospitalName}
            className="col-span-2 sm:col-span-3"
          />
        )}
      </dl>
    </li>
  );
}