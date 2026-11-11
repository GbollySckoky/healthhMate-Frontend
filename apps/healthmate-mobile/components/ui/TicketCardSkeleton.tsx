'use client';

interface SkeletonBlockProps {
  width: number | string;
  height: number;
  borderRadius?: number;
  className?: string;
}

const SkeletonBlock = ({
  width,
  height,
  borderRadius = 6,
  className = '',
}: SkeletonBlockProps) => {
  return (
    <div
      className={`animate-pulse bg-gray-200 ${className}`}
      style={{
        width,
        height,
        borderRadius,
      }}
    />
  );
};

const TicketCardSkeleton = () => {
  return (
    <div className="rounded-[10px] border border-borderColor p-[14px]">
      {/* Header */}
      <div className="mb-2 flex items-center justify-between">
        <SkeletonBlock width={70} height={11} />

        <SkeletonBlock
          width={60}
          height={18}
          borderRadius={999}
        />
      </div>

      {/* Subject */}
      <SkeletonBlock
        width="80%"
        height={15}
        className="mb-2"
      />

      {/* Description */}
      <SkeletonBlock
        width="100%"
        height={13}
        className="mb-1"
      />

      <SkeletonBlock
        width="65%"
        height={13}
        className="mb-[10px]"
      />

      {/* Footer */}
      <div className="flex flex-wrap items-center">
        <SkeletonBlock width={50} height={11} />

        <span className="mx-[6px] h-[3px] w-[3px] rounded-full bg-gray-300" />

        <SkeletonBlock width={60} height={11} />

        <span className="mx-[6px] h-[3px] w-[3px] rounded-full bg-gray-300" />

        <SkeletonBlock width={70} height={11} />
      </div>
    </div>
  );
};

export default TicketCardSkeleton;