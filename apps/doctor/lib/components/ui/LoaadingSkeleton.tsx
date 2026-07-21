import React from "react";

const SkeletonRow = () => {
  return (
    <div className="flex items-center justify-between gap-4 py-2">
      <div className="h-3.5 w-28 rounded bg-gray-200" />
      <div className="h-3.5 w-40 rounded bg-gray-200" />
    </div>
  );
};

const SkeletonSection = ({ rows = 4 }: { rows?: number }) => {
  return (
    <div className="mt-5 border-b border-borderColor pb-4">
      <div className="mb-4 h-5 w-44 rounded bg-gray-200" />

      <div className="space-y-2">
        {Array.from({ length: rows }).map((_, index) => (
          <SkeletonRow key={index} />
        ))}
      </div>
    </div>
  );
};

const LoaadingSkeleton = () => {
  return (
    <div className="animate-pulse">
      <SkeletonSection rows={3} />
      <SkeletonSection rows={6} />

      <div className="mt-5">
        <div className="mb-4 h-5 w-40 rounded bg-gray-200" />

        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <SkeletonRow key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoaadingSkeleton;