import { BtnFlex, Card } from "./Reusable";

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

const AppointmentDetailsSkeleton = () => (
  <>
    <div className="mb-5 flex flex-row bg-white p-4 rounded-[10px] border border-[#F2F2F2]">
      <SkeletonBlock width={80} height={80} rounded="rounded-full" />
      <div className="ml-4 flex-1 flex flex-col justify-center">
        <SkeletonBlock width="70%" height={18} />
        <SkeletonBlock width="45%" height={13} className="mt-2.5" />
        <SkeletonBlock width="60%" height={13} className="mt-2.5" />
      </div>
    </div>

    <Card>
      <div className="flex flex-col items-start gap-2 py-2">
        <SkeletonBlock width={60} height={13} className="mb-1.5" />
        <SkeletonBlock width={80} height={22} rounded="rounded-full" />
      </div>
      <div className="h-px bg-[#F5F5F5] mt-3" />
      {[1, 2, 3, 4].map((key) => (
        <div key={key} className="py-2">
          <div className="flex flex-col gap-0.5">
            <SkeletonBlock width={90} height={13} className="mb-2" />
            <SkeletonBlock width="80%" height={13} />
          </div>
          {key !== 4 && <div className="h-px bg-[#F5F5F5] mt-3" />}
        </div>
      ))}
    </Card>

    <Card>
      {[1, 2, 3].map((key) => (
        <div key={key}>
          <div className="flex flex-row items-center justify-between py-2">
            <div className="flex flex-col gap-1.5">
              <SkeletonBlock width={120} height={14} />
              <SkeletonBlock width={160} height={12} />
            </div>
            <SkeletonBlock width={18} height={18} rounded="rounded-full" />
          </div>
          {key !== 3 && <div className="h-px bg-[#F5F5F5] mt-3" />}
        </div>
      ))}
    </Card>

    <BtnFlex>
      <SkeletonBlock width="47%" height={44} rounded="rounded-lg" />
      <SkeletonBlock width="47%" height={44} rounded="rounded-lg" />
    </BtnFlex>
  </>
);

export default AppointmentDetailsSkeleton;