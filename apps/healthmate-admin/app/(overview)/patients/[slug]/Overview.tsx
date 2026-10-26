import OverviewSkeleton from "@/components/ui/OverviewSkeleton";
import { APPOINTMENT_DETAILS } from "@/lib/interface/appointment";

export const formatDate = (value?: string) => {
  if (!value) return "Not provided";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString("en-US", {
    day: "numeric", month: "short", year: "numeric", timeZone: "UTC",
  });
};

export const displayText = (value?: string) => value?.replaceAll("_", " ") || "Not provided";

const Overview = ({ patient, isLoading }: {
  patient?: APPOINTMENT_DETAILS;
  isLoading: boolean;
}) => {
  if (isLoading) return <OverviewSkeleton />;
  if (!patient) return null;

  const sections = [
    { title: "Account Details", rows: [
      ["Patient ID", patient.user?.id],
      ["Name", `${patient.user?.firstName || ""} ${patient.user?.lastName || ""}`.trim()],
      ["Email", patient.user?.email],
      ["Phone Number", patient.user?.phone],
      ["Gender", displayText(patient.user?.gender)],
      ["Date of Birth", formatDate(patient.user?.dateOfBirth)],
      ["Account Status", typeof patient.user?.isActive === "boolean" ? (patient.user.isActive ? "Active" : "Inactive") : undefined],
    ] },
    { title: "Appointment Details", rows: [
      ["Appointment ID", patient.id],
      ["Date", formatDate(patient.date)],
      ["Time", patient.time],
      ["Consultation Type", displayText(patient.consultationType)],
      ["Status", displayText(patient.status)],
      ["Health Concern", patient.healthConcern],
      ["Consultation Fee", patient.amount != null ? `₦${Number(patient.amount).toLocaleString("en-NG")}` : undefined],
      ["Booked On", formatDate(patient.createdAt)],
    ] },
    { title: "Doctor Details", rows: [
      ["Name", `${patient.doctor?.firstName || ""} ${patient.doctor?.lastName || ""}`.trim()],
      ["Email", patient.doctor?.email],
      ["Specialization", displayText(patient.doctor?.profile?.specialization)],
    ] },
    { title: "Hospital Details", rows: [
      ["Hospital", patient.hospital?.hospitalName],
      ["Email", patient.hospital?.email],
    ] },
  ];

  return (
    <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
      {sections.map(({ title, rows }) => (
        <section key={title} className="min-w-0 rounded-lg border border-borderColor p-5">
          <h2 className="mb-4 font-libre text-[18px] font-semibold">{title}</h2>
          <dl className="space-y-4">
            {rows.map(([label, value]) => (
              <div key={label} className="grid grid-cols-1 gap-1 sm:grid-cols-2 sm:gap-4">
                <dt className="text-sm text-grey-20">{label}</dt>
                <dd className="break-words text-sm font-medium text-grey-800">{value || "Not provided"}</dd>
              </div>
            ))}
          </dl>
        </section>
      ))}
    </div>
  );
};

export default Overview;
