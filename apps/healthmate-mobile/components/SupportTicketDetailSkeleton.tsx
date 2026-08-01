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

const SupportTicketDetailSkeleton = () => {
  return (
    <div>
      {/* Header */}
      <div className="mt-[10px] flex justify-between">
        <div className="flex-1">
          <SkeletonBlock
            width={90}
            height={11}
            className="mb-[6px]"
          />

          <SkeletonBlock
            width="75%"
            height={18}
          />
        </div>
      </div>

      {/* Badges */}
      <div className="mt-3 flex gap-2">
        <SkeletonBlock
          width={70}
          height={22}
          borderRadius={999}
        />

        <SkeletonBlock
          width={70}
          height={22}
          borderRadius={999}
        />
      </div>

      {/* Meta Info */}
      <div className="mt-[18px] flex justify-between rounded-[10px] border border-gray-100 bg-[#FAFBFF] p-[14px]">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="flex-1"
          >
            <SkeletonBlock
              width={60}
              height={11}
              className="mb-[6px]"
            />

            <SkeletonBlock
              width="80%"
              height={13}
            />
          </div>
        ))}
      </div>

      {/* Description */}
      <div className="mt-6">
        <SkeletonBlock
          width={90}
          height={12}
          className="mb-[10px]"
        />

        <SkeletonBlock
          width="100%"
          height={14}
          className="mb-[6px]"
        />

        <SkeletonBlock
          width="90%"
          height={14}
          className="mb-[6px]"
        />

        <SkeletonBlock
          width="60%"
          height={14}
        />
      </div>

      {/* Conversation */}
      <div className="mt-6">
        <SkeletonBlock
          width={110}
          height={12}
          className="mb-[10px]"
        />

        {[1, 2].map((item) => (
          <div
            key={item}
            className="mb-3 rounded-[10px] border border-gray-100 p-[14px]"
          >
            <div className="mb-2 flex items-center justify-between">
              <SkeletonBlock
                width={70}
                height={12}
              />

              <SkeletonBlock
                width={90}
                height={11}
              />
            </div>

            <SkeletonBlock
              width="100%"
              height={13}
              className="mb-1"
            />

            <SkeletonBlock
              width="70%"
              height={13}
            />
          </div>
        ))}
      </div>

      {/* Reply Form */}
      <div className="mt-6">
        <SkeletonBlock
          width={140}
          height={12}
          className="mb-[14px]"
        />

        <SkeletonBlock
          width="100%"
          height={90}
          borderRadius={10}
        />

        <SkeletonBlock
          width="100%"
          height={44}
          borderRadius={10}
          className="mt-[14px]"
        />

        <SkeletonBlock
          width="100%"
          height={44}
          borderRadius={10}
          className="mt-[14px]"
        />

        <SkeletonBlock
          width="100%"
          height={48}
          borderRadius={10}
          className="mt-5"
        />
      </div>
    </div>
  );
};

export default SupportTicketDetailSkeleton;