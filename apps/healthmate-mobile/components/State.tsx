import { AlertCircle } from "lucide-react";

function Skeleton({ className }: { className: string }) {
  return (
    <div
      className={`rounded-2xl bg-slate-200/70 motion-safe:animate-pulse ${className}`}
    />
  );
}

/** Mirrors the overview layout so the page doesn't jump when data arrives. */
export function MedicalRecordsSkeleton() {
  return (
    <div role="status" aria-busy="true" className="space-y-6">
      <span className="sr-only">Loading medical records</span>

      <Skeleton className="h-10 w-full max-w-md rounded-lg" />
      <Skeleton className="h-64" />

      <div className="grid gap-6 lg:grid-cols-2">
        <Skeleton className="h-72" />
        <Skeleton className="h-72" />
      </div>
    </div>
  );
}

export function ErrorState() {
  return (
    <div
      role="alert"
      className="mx-auto max-w-md rounded-2xl border border-red-100 bg-white px-6 py-8 text-center"
    >
      <AlertCircle className="mx-auto text-red-500" size={28} aria-hidden />

      <p className="mt-3 text-sm font-semibold text-red-600">
        We couldn&apos;t load your medical records
      </p>

      <p className="mt-1 text-sm text-slate-500">
        Check your connection and refresh the page. If it keeps happening,
        contact support.
      </p>
    </div>
  );
}