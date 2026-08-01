"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Scale, Target } from "lucide-react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import { patientService } from "@/service/patientService";

import {
  Card,
  CardAmount,
  CardText,
  DetailsContainer,
  SubTitle,
  Button,
  PageWrapper
} from "@/components/Reusable";

import WeightSkeleton from "@/components/WeightSkeleton";
import { useModal } from "@/store/Modal";
import WeightModal from "./WeightModal";

type WeightReading = {
  id: number | string;
  weight: number | string;
  createdAt?: string;
  recordedAt?: string;
};

const formatReadingDate = (date?: string) => {
  if (!date) return "No date recorded";

  const readingDate = new Date(date);

  if (Number.isNaN(readingDate.getTime())) {
    return "No date recorded";
  }

  return `${readingDate.toLocaleDateString()} at ${readingDate.toLocaleTimeString()}`;
};

const Weight = () => {
  const { openModal } = useModal();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["weight"],
    queryFn: () => patientService.getWeight(),
  });

  const weightReadings: WeightReading[] = data?.data ?? [];
  const latestWeight = weightReadings[0];

  const [readings] = useState([
    { date: "Jun 20", systolic: 82, diastolic: 62 },
    { date: "Jun 21", systolic: 95, diastolic: 75 },
    { date: "Jun 22", systolic: 118, diastolic: 105 },
    { date: "Jun 23", systolic: 118, diastolic: 95 },
    { date: "Jun 24", systolic: 140, diastolic: 82 },
    { date: "Jun 25", systolic: 140, diastolic: 82 },
    { date: "Jun 26", systolic: 140, diastolic: 82 },
    { date: "Jun 27", systolic: 140, diastolic: 82 },
  ]);

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

              <CardAmount>
                {latestWeight
                  ? `${latestWeight.weight} kg`
                  : "-- kg"}
              </CardAmount>

              <CardText>
                Recorded on{" "}
                {formatReadingDate(
                  latestWeight?.createdAt ??
                    latestWeight?.recordedAt
                )}
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

            {/* Chart */}

            <div className="mt-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

              <SubTitle>Weight Trends</SubTitle>

              <div className="mt-5 h-72 w-full">

                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >
                  <LineChart data={readings}>

                    <CartesianGrid
                      strokeDasharray="5 5"
                    />

                    <XAxis
                      dataKey="date"
                    />

                    <Tooltip />

                    <Line
                      type="monotone"
                      dataKey="systolic"
                      stroke="#ef4444"
                      strokeWidth={3}
                    />

                    <Line
                      type="monotone"
                      dataKey="diastolic"
                      stroke="#3b82f6"
                      strokeWidth={3}
                    />

                  </LineChart>
                </ResponsiveContainer>

              </div>

            </div>

            {/* Weight History */}

            <Card>

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

                          <p className="text-sm font-semibold text-gray-800">
                            {weightReading.weight} kg
                          </p>

                          <p className="mt-1 text-xs text-gray-500">
                            {formatReadingDate(
                              weightReading.createdAt ??
                                weightReading.recordedAt
                            )}
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