import { Card, DetailsContainer, PageWrapper } from "./Reusable";

const SkeletonBox = ({
  width,
  height,
  rounded = "rounded-md",
  className = "",
}: {
  width: number | string;
  height: number;
  rounded?: string;
  className?: string;
}) => (
  <div
    className={`bg-gray-200 animate-pulse ${rounded} ${className}`}
    style={{ width: typeof width === "number" ? `${width}px` : width, height: `${height}px` }}
  />
);

const SleepLogSkeletonItem = ({ isLastItem }: { isLastItem: boolean }) => (
  <div className={`pt-[5px] border-b border-[#F2F2F2] ${isLastItem ? "border-b-0" : ""}`}>
    <div className="flex flex-row items-center justify-between py-[18px]">
      <div className="flex flex-row items-center">
        <SkeletonBox width={36} height={36} rounded="rounded-lg" />
        <div className="pl-4">
          <SkeletonBox width={90} height={14} className="mb-1.5" />
          <SkeletonBox width={130} height={12} />
        </div>
      </div>
      <SkeletonBox width={70} height={28} rounded="rounded-full" />
    </div>
  </div>
);

export const SleepSkeleton = () => (
  <PageWrapper>
    <DetailsContainer>
      <SkeletonBox width={48} height={48} rounded="rounded-full" className="mb-2.5" />
      <SkeletonBox width={100} height={12} className="mb-2" />
      <SkeletonBox width={140} height={22} className="mb-2.5" />
      <SkeletonBox width={180} height={12} className="mb-2.5" />
      <SkeletonBox width={70} height={20} rounded="rounded-full" />
    </DetailsContainer>

    <div className="flex flex-col justify-center items-center mb-5 py-[5px] flex-1">
      <div className="bg-white rounded-xl p-[15px] shadow-[0_2px_4px_rgba(0,0,0,0.1)] w-full">
        <SkeletonBox width={130} height={14} className="mb-[15px]" />
        <SkeletonBox width="100%" height={300} rounded="rounded-lg" />
      </div>
    </div>

    <div className="mb-10">
      <Card>
        <SkeletonBox width={160} height={14} className="mb-[15px]" />
        {Array.from({ length: 4 }).map((_, index) => (
          <SleepLogSkeletonItem key={index} isLastItem={index === 3} />
        ))}
      </Card>
    </div>
  </PageWrapper>
);