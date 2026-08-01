import { Card, DetailsContainer, PageWrapper } from "./Reusable";

type SkeletonBoxProps = {
  className?: string;
};

const SkeletonBox = ({ className = "" }: SkeletonBoxProps) => {
  return (
    <div
      className={`animate-pulse rounded-md bg-gray-200 ${className}`}
    />
  );
};

const WeightHistorySkeletonItem = ({
  isLastItem,
}: {
  isLastItem: boolean;
}) => {
  return (
    <div
      className={`py-5 ${
        !isLastItem && "border-b border-gray-100"
      }`}
    >
      <div className="flex items-center">
        <SkeletonBox className="h-8 w-8 rounded-lg" />

        <div className="ml-4">
          <SkeletonBox className="mb-2 h-3 w-20" />
          <SkeletonBox className="h-3 w-36" />
        </div>
      </div>
    </div>
  );
};

const WeightSkeleton = () => {
  return (
    <PageWrapper>

      <DetailsContainer>

        <SkeletonBox className="mb-3 h-12 w-12 rounded-full" />

        <SkeletonBox className="mb-3 h-3 w-28" />

        <SkeletonBox className="mb-3 h-6 w-24" />

        <SkeletonBox className="h-3 w-44" />

      </DetailsContainer>

      <Card>

        <div className="mb-4 flex items-center">

          <SkeletonBox className="mr-2 h-5 w-5" />

          <SkeletonBox className="h-3 w-32" />

        </div>

        <div className="mb-3 flex justify-between">

          <SkeletonBox className="h-3 w-20" />

          <SkeletonBox className="h-3 w-10" />

        </div>

        <SkeletonBox className="h-3 w-full rounded-full" />

      </Card>

      <div className="my-6 rounded-xl border border-gray-200 p-4">

        <SkeletonBox className="mb-4 h-4 w-32" />

        <SkeletonBox className="h-56 w-full rounded-lg" />

      </div>

      <Card>

        <SkeletonBox className="mb-5 h-4 w-36" />

        {Array.from({ length: 4 }).map((_, index) => (
          <WeightHistorySkeletonItem
            key={index}
            isLastItem={index === 3}
          />
        ))}

      </Card>

    </PageWrapper>
  );
};

export default WeightSkeleton