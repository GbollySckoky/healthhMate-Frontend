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

const DoctorCardSkeleton = () => (
  <div className="p-[15px] border border-[#F2F2F2] rounded-[10px] bg-white mb-5">
    <div className="flex items-start mt-[5px] mb-0.5">
      <div className="w-[50px] shrink-0">
        <SkeletonBlock width={50} height={50} borderRadius={100} />
      </div>
      <div className="flex flex-1 justify-between">
        <div className="ml-2.5 flex-1">
          <SkeletonBlock width="60%" height={16} />
          <SkeletonBlock width="70%" height={12} className="mt-2" />
          <SkeletonBlock width="45%" height={12} className="mt-1.5" />
        </div>
        <SkeletonBlock width={50} height={12} />
      </div>
    </div>
    <div className="flex items-center justify-between border-t-2 border-[#F8F8F8] mt-[15px] pt-[15px]">
      <SkeletonBlock width={60} height={16} />
      <SkeletonBlock width={110} height={34} borderRadius={8} />
    </div>
  </div>
);

export default DoctorCardSkeleton;