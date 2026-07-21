const MeSkeleton = () => {
  return (
    <div className="animate-pulse">
      {[1].map((rows, index) => (
        <div
          key={index}
          className="mt-5 border-b border-borderColor pb-4 last:border-b-0"
        >
          <div className="mb-1 h-3 w-30 rounded bg-gray-200" />
          <div className="mb-4 h-3 w-30 rounded bg-gray-200" />

          {/* <div className="space-y-3">
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <div
                key={rowIndex}
                className="flex items-center justify-between gap-4"
              >
                <div className="h-3.5 w-32 rounded bg-gray-200" />
                <div className="h-3.5 w-44 rounded bg-gray-100" />
              </div>
            ))}
          </div> */}
        </div>
      ))}
    </div>
  );
};

export default MeSkeleton