"use client";
import { useQuery } from "@tanstack/react-query";
import { Scale, Target } from "lucide-react";

import { patientService } from "@/service/patientService";

import {
  Card,
  // CardAmount,
  CardText,
  DetailsContainer,
  SubTitle,
  Button,
  PageWrapper,
  Reading
} from "@/components/Reusable";

import WeightSkeleton from "@/components/WeightSkeleton";
import { useModal } from "@/store/Modal";
import WeightModal from "./WeightModal";
import useDate from "@/hooks/useDate";

type WeightReading = {
  id: number | string;
  weight: number | string;
  createdAt?: string;
  recordedAt?: string;
};

const Weight = () => {
  const { openModal } = useModal();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["weight"],
    queryFn: () => patientService.getWeight(),
  });

  const {getReadableDate, formatTime} = useDate()

  const weightReadings: WeightReading[] = data?.data ?? [];
  const latestWeight = weightReadings[0];

  if (isError) {
    return (
      <div className="flex h-screen items-center justify-center text-red-500">
        {(error as Error).message}
      </div>
    );
  }

  return (
    <>
      <div>
        {isLoading ? (
          <WeightSkeleton />
        ) : (
          <PageWrapper>

            {/* Current Weight */}

            <DetailsContainer>

              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-pink-100">
                <Scale className="h-6 w-6 text-pink-600" />
              </div>

              <CardText>Current Weight</CardText>

              <Reading>
                {latestWeight
                  ? `${latestWeight.weight} kg`
                  : "-- kg"}
              </Reading>

              <CardText>
                Recorded on{" "}
                {getReadableDate(latestWeight?.createdAt || 'N/A')} {" "} at {" "}
                {formatTime(latestWeight?.createdAt || 'N/A')}
              </CardText>

            </DetailsContainer>

            {/* Goal Card */}

            <Card>
              <div className="mb-4 flex items-center">

                <Target className="mr-2 h-5 w-5 text-green-600" />

                <SubTitle>Goal Weight: 60 Kg</SubTitle>

              </div>

              <div className="mb-2 flex items-center justify-between text-sm text-gray-500">

                <span>Progress to Goal</span>

                <span>70%</span>

              </div>

              <div className="h-3 w-full rounded-full bg-green-100">

                <div className="h-3 w-[70%] rounded-full bg-green-600" />

              </div>

            </Card>

            <Card className="mt-6">

              <SubTitle>Weight History</SubTitle>

              {weightReadings.map(
                (weightReading, index) => {
                  const isLast =
                    index ===
                    weightReadings.length - 1;

                  return (
                    <div
                      key={weightReading.id}
                      className={`flex items-center justify-between py-5 ${
                        !isLast &&
                        "border-b border-gray-100"
                      }`}
                    >
                      <div className="flex items-center">

                        <div className="rounded-lg border border-gray-200 p-3">

                          <Scale className="h-5 w-5 text-pink-600" />

                        </div>

                        <div className="ml-4">

                          <p className="text-sm font-semibold text-[#717680]">
                            {weightReading.weight} kg
                          </p>

                          <p className="mt-1 text-xs text-gray-500">
                            {getReadableDate(weightReading.createdAt || 'N/A')} {" "} at {" "}
                            {formatTime(weightReading.createdAt || 'N/A')}
                          </p>

                        </div>

                      </div>
                    </div>
                  );
                }
              )}

            </Card>

          </PageWrapper>
        )}
      </div>

      <Button
        _fn={() =>
          openModal(<WeightModal />, {
            title: "Log New Weight",
            description: "",
            onClose: () => {},
          })
        }
      >
        Log New Weight
      </Button>
    </>
  );
};

export default Weight;