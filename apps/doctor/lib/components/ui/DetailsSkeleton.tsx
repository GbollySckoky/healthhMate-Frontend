const DetailSkeleton = () => {
  return (
    <div className="space-y-4 animate-pulse">
      {[5, 4, 2].map((rows, index) => (
        <div
          key={index}
          className="border border-borderColor p-4 rounded-lg space-y-4"
        >
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <div
              key={rowIndex}
              className="flex items-center justify-between gap-4"
            >
              <div className="h-3.5 w-36 rounded bg-gray-200" />
              <div className="h-3.5 w-44 rounded bg-gray-100" />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default DetailSkeleton