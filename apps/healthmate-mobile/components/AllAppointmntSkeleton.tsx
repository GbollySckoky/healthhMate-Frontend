const SkeletonBlock = ({
  width,
  height,
  rounded = "rounded-md",
  className = "",
}: {
  width: number | `${number}%`;
  height: number;
  rounded?: string;
  className?: string;
}) => (
  <div
    className={`bg-gray-200 animate-pulse ${rounded} ${className}`}
    style={{
      width: typeof width === "number" ? `${width}px` : width,
      height: `${height}px`,
    }}
  />
);

const AppointmentCardSkeleton = () => (
  <div className="p-[15px] border border-[#F2F2F2] rounded-[10px] bg-white mb-5 mt-2.5">
    <div className="flex flex-row mt-[5px] mb-[2px]">
      <div className="w-[50px] shrink-0">
        <SkeletonBlock width={50} height={50} rounded="rounded-full" />
      </div>
      <div className="flex flex-row flex-1 justify-between">
        <div className="ml-[5px] flex-1">
          <SkeletonBlock width="60%" height={16} />
          <div className="flex flex-row mt-2.5">
            <SkeletonBlock width={90} height={12} />
          </div>
          <div className="flex flex-row mt-2">
            <SkeletonBlock width={110} height={12} />
          </div>
        </div>
        <SkeletonBlock width={70} height={22} rounded="rounded-full" />
      </div>
    </div>
    <div className="flex flex-row justify-between gap-[10px] border-t-2 border-t-[#F8F8F8] mt-[15px]">
      <SkeletonBlock width={100} height={34} rounded="rounded-lg" className="mt-[14px]" />
      <SkeletonBlock width={100} height={34} rounded="rounded-lg" className="mt-[14px]" />
    </div>
  </div>
);

export default AppointmentCardSkeleton;