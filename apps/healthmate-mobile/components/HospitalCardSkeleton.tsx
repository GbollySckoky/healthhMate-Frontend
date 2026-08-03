import React from 'react';

const SkeletonBlock = ({
  width,
  height,
  borderRadius = 6,
  className = '',
}: {
  width: number | string;
  height: number;
  borderRadius?: number;
  className?: string;
}) => (
  <div
    className={`bg-gray-200 animate-pulse ${className}`}
    style={{ width, height, borderRadius }}
  />
);

const HospitalCardSkeleton = () => (
  <div className="w-[300px] shrink-0 bg-[#FAFAFA] rounded-xl p-2.5 border border-[#F2F2F2]">
    {/* Image area with heart button */}
    <div className="relative w-full h-[180px]">
      <SkeletonBlock width="100%" height={180} borderRadius={10} />
      <div className="absolute right-2.5 top-2.5">
        <SkeletonBlock width={34} height={34} borderRadius={100} className="bg-gray-300" />
      </div>
    </div>

    {/* Details */}
    <div className="p-1.5 mt-2.5">
      <div className="mb-2">
        <SkeletonBlock width="60%" height={14} />
        <SkeletonBlock width="70%" height={12} className="mt-2" />
        <SkeletonBlock width="45%" height={12} className="mt-1.5" />
      </div>

      {/* View Doctors button */}
      <SkeletonBlock width="100%" height={44} borderRadius={10} />
    </div>
  </div>
);

export default HospitalCardSkeleton;