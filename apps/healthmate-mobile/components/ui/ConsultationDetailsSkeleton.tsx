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

const ConsultationDetailsSkeleton = () => (
  <div>
    <div className="relative w-full h-[180px]">
      <SkeletonBlock width="100%" height={180} borderRadius={10} />
      <div className="absolute -bottom-[30px] left-[25px] w-20 h-20 rounded-full">
        <SkeletonBlock width={80} height={80} borderRadius={40} />
      </div>
    </div>

    <div className="flex justify-between mt-10 gap-2.5">
      <div className="flex-1">
        <SkeletonBlock width="55%" height={17} />
        <SkeletonBlock width="40%" height={12} className="mt-2" />
        <SkeletonBlock width="50%" height={12} className="mt-2" />
      </div>
      <SkeletonBlock width={50} height={12} />
    </div>

    <div className="mt-[30px] border-t border-[#F2F2F2] pt-5 mb-[50px]">
      {/* About / bio */}
      <SkeletonBlock width={60} height={16} />
      <SkeletonBlock width="100%" height={13} className="mt-2.5" />
      <SkeletonBlock width="100%" height={13} className="mt-1.5" />
      <SkeletonBlock width="65%" height={13} className="mt-1.5" />

      {/* Availability */}
      <div className="mt-7">
        <SkeletonBlock width={90} height={16} />

        <div className="mt-3 flex flex-col gap-3.5">
          {[1, 2].map((key) => (
            <div
              key={key}
              className="bg-white border border-[#D6D7DA] rounded-2xl p-3.5"
            >
              <SkeletonBlock width={100} height={15} className="mb-3" />

              <SkeletonBlock width={70} height={13} className="mb-2" />
              <div className="flex flex-wrap gap-2">
                <SkeletonBlock width={60} height={28} borderRadius={20} />
                <SkeletonBlock width={60} height={28} borderRadius={20} />
                <SkeletonBlock width={60} height={28} borderRadius={20} />
              </div>

              <SkeletonBlock
                width={130}
                height={13}
                className="mb-2 mt-3.5"
              />
              <div className="flex flex-wrap gap-2">
                <SkeletonBlock width={90} height={28} borderRadius={20} />
                <SkeletonBlock width={90} height={28} borderRadius={20} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Consultation fee */}
      <div className="mt-7">
        <SkeletonBlock width={130} height={16} />
        <SkeletonBlock width={70} height={20} className="mt-2" />
      </div>

      {/* Book button */}
      <SkeletonBlock width="100%" height={48} borderRadius={12} className="mt-7" />
    </div>
  </div>
);

export default ConsultationDetailsSkeleton;