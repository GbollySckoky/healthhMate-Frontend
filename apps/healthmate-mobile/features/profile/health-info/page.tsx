"use client";

import { Card, Wrapper } from "@/components/Reusable";

import { healthData } from "@/constants/data";
import HealthOverview from "./HealthOverview";

const HealthDataScreen = () => {;

  return (
    <Wrapper>
        <Card>
        {healthData.map((health, index) => {
            const isLastItem =
            index === healthData.length - 1;

            return (
            <div
                key={health.id}
                className={`flex items-center justify-between p-4 ${
                !isLastItem ? "border-b border-gray-200" : ""
                }`}
            >
                <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-800">
                    {health.title}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                    {health.value}
                </p>
                </div>

                <div className="ml-3 text-xl">
                {health.icon}
                </div>
            </div>
            );
        })}
        </Card>

        {/* Health Overview */}
        <HealthOverview />
    </Wrapper>
  );
};

export default HealthDataScreen;