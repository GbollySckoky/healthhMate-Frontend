import Image from "next/image";
import { Activity, AlertCircle, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import type { Patient } from "@/lib/interface/medical-records";

import { Detail } from "./Primitives";
import { formatDate, getInitials, isNegativeEntry } from "./Utils";
import { CapitalizeName } from "@/constants/capitalizeName";

function Callout({
  icon: Icon,
  label,
  value,
  warn = false,
}: {
  icon: LucideIcon;
  label: string;
  value?: string | null;
  warn?: boolean;
}) {
  const isWarning = warn && Boolean(value) && !isNegativeEntry(value);

  return (
    <div
      className={`flex items-start gap-3 rounded-xl border p-4 ${
        isWarning
          ? "border-amber-200 bg-amber-50"
          : "border-slate-200 bg-slate-50"
      }`}
    >
      <Icon
        size={18}
        aria-hidden
        className={`mt-0.5 shrink-0 ${
          isWarning ? "text-amber-600" : "text-slate-400"
        }`}
      />

      <div className="min-w-0">
        <p
          className={`text-sm font-semibold ${
            isWarning ? "text-amber-900" : "text-slate-700"
          }`}
        >
          {label}
        </p>

        <p
          className={`mt-0.5 break-words text-sm ${
            isWarning
              ? "text-amber-900"
              : value
                ? "text-slate-700"
                : "text-slate-400"
          }`}
        >
          {value || "Not recorded"}
        </p>
      </div>
    </div>
  );
}

export function PatientOverview({ patient }: { patient: Patient }) {
  const profile = patient?.profile;
  const fullName = `${CapitalizeName(patient?.firstName) ?? ""} ${CapitalizeName(patient?.lastName) ?? ""}`.trim();

  return (
    <section
      aria-label="Patient details"
      className="rounded-2xl border border-slate-200 bg-white"
    >
      {/* Identity */}
      <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="flex items-center gap-4">
          {profile?.profilePicture ? (
            <Image
              src={profile.profilePicture}
              alt={fullName}
              width={64}
              height={64}
              className="size-16 shrink-0 rounded-full object-cover"
            />
          ) : (
            <div
              aria-hidden
              className="flex size-16 shrink-0 items-center justify-center rounded-full bg-red-100 text-lg font-semibold text-red-700"
            >
              {getInitials(patient?.firstName, patient?.lastName)}
            </div>
          )}

          <div className="min-w-0">
            <h2 className="text-sm font-medium text-gray-600">{fullName}</h2>

            <p className="mt-0.5 break-all text-sm text-slate-500">
              {patient?.email}
            </p>
          </div>
        </div>

        <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-red-100 px-3 py-1.5 text-xs font-medium text-red-800">
          <ShieldCheck size={14} aria-hidden />
          Patient record
        </span>
      </div>

      {/* Basic details */}
      <dl className="grid grid-cols-2 gap-x-6 gap-y-5 border-t border-slate-100 p-5 sm:grid-cols-4 sm:p-6">
        <Detail label="Date of birth" value={formatDate(profile?.dateOfBirth)} />
        <Detail
          label="Gender"
          value={profile?.gender}
          valueClassName="capitalize"
        />
        <Detail label="Blood group" value={profile?.bloodGroup} />
        <Detail label="Phone number" value={patient?.phoneNumber} />
      </dl>

      {/* Clinical flags */}
      <div className="grid gap-3 border-t border-slate-100 p-5 sm:grid-cols-2 sm:p-6">
        <Callout
          icon={Activity}
          label="Health condition"
          value={profile?.healthCondition}
        />

        <Callout
          icon={AlertCircle}
          label="Allergies"
          value={profile?.allergies}
          warn
        />
      </div>
    </section>
  );
}