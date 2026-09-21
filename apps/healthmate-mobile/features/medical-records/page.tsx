"use client";
import useGetMedicalRecords from "@/hooks/useGetMedicalRecords";

// import { ErrorState, MedicalRecordsSkeleton } from "./_components/page-states";
// import { RecordsContent } from "./_components/records-content";
import { ErrorState, MedicalRecordsSkeleton } from "@/components/State";
import RecordsContent from "./RecordsContent";

const MedicalRecordsPage = () => {
  const { medicalRecords, isLoading, isError } = useGetMedicalRecords();

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="mt-2 max-w-2xl text-sm text-slate-500">
          Your healthcare history, consultations, and prescriptions in one
          place.
        </p>

        {isLoading ? (
          <MedicalRecordsSkeleton />
        ) : isError || !medicalRecords ? (
          <ErrorState />
        ) : (
          <RecordsContent records={medicalRecords} />
        )}
      </div>
    </main>
  );
}

export default MedicalRecordsPage