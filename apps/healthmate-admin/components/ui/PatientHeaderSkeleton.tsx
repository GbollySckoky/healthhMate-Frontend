const PatientHeaderSkeleton = () => {
  return (
    <div className="mb-3 flex items-center justify-between border-b border-borderColor pb-6 animate-pulse">
      <div className="flex items-center">
        <div className="h-[50px] w-[50px] rounded-full bg-gray-200" />

        <div className="ml-3 space-y-2">
          <div className="h-4 w-36 rounded bg-gray-200" />
          <div className="h-3.5 w-48 rounded bg-gray-100" />
        </div>
      </div>

      <div className="h-9 w-32 rounded-lg bg-gray-200" />
    </div>
  );
};

export default PatientHeaderSkeleton