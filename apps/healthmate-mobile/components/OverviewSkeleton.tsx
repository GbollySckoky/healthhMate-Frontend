import { MinCard } from "./Reusable";

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

export const OverviewCardSkeleton = () => (
  <MinCard className="p-[15px] border border-[#F1F1F1] rounded-[10px] bg-white mb-[10px] w-[200px] shrink-0">
    <SkeletonBlock width={24} height={24} rounded="rounded-full" className="mb-[15px]" />
    <SkeletonBlock width="70%" height={13} />
    <div className="pt-1">
      <SkeletonBlock width="50%" height={20} className="mb-2" />
      <SkeletonBlock width="40%" height={12} />
    </div>
  </MinCard>
);