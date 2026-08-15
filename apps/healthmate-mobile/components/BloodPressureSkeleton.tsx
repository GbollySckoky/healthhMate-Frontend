import { SkeletonBoxProps } from "@/lib/interface/blood-pressure";
import { Card, DetailsContainer, SubTitle } from "./Reusable";

const SkeletonBox = ({
  // width,
  // height,
  borderRadius = 6,
  className = '',
}: SkeletonBoxProps) => (
  <div
    className={`bg-gray-200 animate-pulse ${className}`}
    style={{
      // width,
      // height,
      borderRadius,
    }}
  />
);

const ReadingSkeletonItem = ({ isLastItem }: { isLastItem: boolean }) => (
  <div
    className={`pt-[5px] border-[#F2F2F2] ${
      isLastItem ? 'border-b-0' : 'border-b'
    }`}
  >
    <div className="flex items-center justify-between py-[18px]">
      <div className="flex items-center">
        <SkeletonBox width={38} height={38} borderRadius={8} />
        <div className="pl-4">
          <SkeletonBox width={100} height={14} className="mb-1.5" />
          <SkeletonBox width={130} height={12} />
        </div>
      </div>
    </div>
  </div>
);

export const BloodPressureSkeleton = () => (
  <div className="self-center w-[92%] mx-auto pt-[10px] pb-[110px]">
    <DetailsContainer>
      <SkeletonBox width={48} height={48} borderRadius={100} className="mb-2.5" />
      <SkeletonBox width={110} height={12} className="mb-2" />
      <SkeletonBox width={130} height={22} className="mb-2.5" />
      <SkeletonBox width={180} height={12} className="mb-2.5" />
      <SkeletonBox width={70} height={20} borderRadius={50} />
    </DetailsContainer>

    {/* Chart placeholder */}
    {/* <div className="bg-white mb-[26px] rounded-xl p-3 shadow-sm border border-[#f2f2f2]">
      <SubTitle>BP Trends</SubTitle>
      <SkeletonBox
        width={chartWidth}
        height={chartHeight}
        borderRadius={8}
        className="my-2 mx-auto"
      />
      <div className="flex justify-center mt-[15px] gap-[30px]">
        <div className="flex items-center">
          <SkeletonBox width={12} height={12} borderRadius={6} className="mr-2" />
          <SkeletonBox width={50} height={12} />
        </div>
        <div className="flex items-center">
          <SkeletonBox width={12} height={12} borderRadius={6} className="mr-2" />
          <SkeletonBox width={60} height={12} />
        </div>
      </div>
    </div> */}

    {/* Recent readings placeholder */}
    <div className="mb-10">
      <Card>
        <SubTitle>Recent Readings</SubTitle>
        {Array.from({ length: 4 }).map((_, index) => (
          <ReadingSkeletonItem key={index} isLastItem={index === 3} />
        ))}
      </Card>
    </div>
  </div>
);
