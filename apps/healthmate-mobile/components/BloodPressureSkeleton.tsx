import { SkeletonBoxProps } from "@/lib/interface/blood-pressure"
import {
  Card,
  DetailsContainer,
  SubTitle,
} from "./Reusable"

const SkeletonBox = ({
  width,
  height,
  borderRadius = 6,
  className = "",
}: SkeletonBoxProps) => (
  <div
    className={`bg-gray-200 animate-pulse ${className}`}
    style={{
      width,
      height,
      borderRadius,
    }}
  />
)

const ReadingSkeletonItem = ({
  isLastItem,
}: {
  isLastItem: boolean
}) => {
  return (
    <div
      className={`pt-[5px] border-[#F2F2F2] ${
        isLastItem ? "border-b-0" : "border-b"
      }`}
    >
      <div className="flex items-center justify-between py-[18px]">
        <div className="flex items-center">
          {/* Stethoscope icon */}
          <SkeletonBox
            width={38}
            height={38}
            borderRadius={8}
          />

          {/* Reading details */}
          <div className="pl-4">
            {/* Blood pressure value */}
            <SkeletonBox
              width={100}
              height={14}
              borderRadius={4}
              className="mb-2"
            />

            {/* Date and time */}
            <SkeletonBox
              width={145}
              height={12}
              borderRadius={4}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export const BloodPressureSkeleton = () => {
  return (
    <div className="self-center w-[92%] mx-auto pt-[10px] pb-[110px]">
      {/* Today's Reading */}
      <DetailsContainer>
        {/* Heart icon */}
        <SkeletonBox
          width={48}
          height={48}
          borderRadius={999}
          className="mb-2.5"
        />

        {/* Today's Readings */}
        <SkeletonBox
          width={110}
          height={14}
          borderRadius={4}
          className="mb-2"
        />

        {/* Blood pressure */}
        <SkeletonBox
          width={140}
          height={28}
          borderRadius={5}
          className="mb-2.5"
        />

        {/* Recorded date */}
        <SkeletonBox
          width={200}
          height={13}
          borderRadius={4}
          className="mb-2.5"
        />

        {/* Normal status */}
        <SkeletonBox
          width={70}
          height={24}
          borderRadius={999}
        />
      </DetailsContainer>

      {/* Recent Readings */}
      <div className="mb-10">
        <Card>
          <SubTitle>
            Recent Readings
          </SubTitle>

          {Array.from({ length: 4 }).map(
            (_, index) => (
              <ReadingSkeletonItem
                key={index}
                isLastItem={index === 3}
              />
            )
          )}
        </Card>
      </div>
    </div>
  )
}
