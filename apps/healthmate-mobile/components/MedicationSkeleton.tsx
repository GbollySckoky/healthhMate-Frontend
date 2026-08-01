import { Card, DetailsContainer, PageWrapper, SubTitle } from "./Reusable";

type SkeletonBoxProps = {
  width: number | string;
  height: number;
  borderRadius?: number;
  className?: string;
};

const SkeletonBox = ({
  width,
  height,
  borderRadius = 6,
  className = '',
}: SkeletonBoxProps) => (
  <div
    className={`bg-gray-200 animate-pulse ${className}`}
    style={{ width, height, borderRadius }}
  />
);

const MedicationHistorySkeletonItem = ({ isLastItem }: { isLastItem: boolean }) => (
  <div
    className={`pt-[5px] border-[#F2F2F2] ${
      isLastItem ? 'border-b-0' : 'border-b'
    }`}
  >
    <div className="flex items-center justify-between py-[18px]">
      <div className="flex items-center">
        <SkeletonBox width={38} height={38} borderRadius={8} />
        <div className="pl-4">
          <SkeletonBox width={90} height={14} className="mb-1.5" />
          <SkeletonBox width={120} height={12} />
        </div>
      </div>
      <SkeletonBox width={60} height={28} borderRadius={30} />
      <SkeletonBox width={50} height={28} borderRadius={30} />
    </div>
  </div>
);

const MedicationSkeleton = () => (
  <PageWrapper>
    <DetailsContainer>
      <SkeletonBox width={48} height={48} borderRadius={100} className="mb-2.5" />
      <SkeletonBox width={100} height={12} className="mb-2" />
      <SkeletonBox width={80} height={22} className="mb-2.5" />
      <SkeletonBox width={180} height={12} className="mb-2.5" />
      <SkeletonBox width={70} height={20} borderRadius={50} />
    </DetailsContainer>
    <div className="mb-10">
      <Card>
        <SubTitle>Medication History</SubTitle>
        {Array.from({ length: 4 }).map((_, index) => (
          <MedicationHistorySkeletonItem key={index} isLastItem={index === 3} />
        ))}
      </Card>
    </div>
  </PageWrapper>
);

export default MedicationSkeleton