"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Card } from "@/components/Reusable";
import { ROUTES } from "@/constants/route";
import { healthOverviews } from "@/constants/data";

const HealthOverview = () => {
  return (
    <div className="mt-8">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-normal text-gray-900">
          Recent Logs Snapshot
        </h3>

        <Link
          href={ROUTES.track}
          className="flex items-center gap-1 text-sm font-medium text-pink-600 hover:text-pink-700"
        >
          View All
          <ArrowRight size={16} />
        </Link>
      </div>

      {/* Card */}
      <Card>
        {healthOverviews.map((health, index) => {
          const isLastItem =
            index === healthOverviews.length - 1;

          return (
            <div
              key={health.id}
              className={`flex items-center border-gray-200 py-4 ${
                !isLastItem ? "border-b" : ""
              }`}
            >
              <div className="mr-3 text-xl">
                {health.icon}
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-800">
                  {health.title}
                </h4>

                <p className="mt-1 text-sm text-gray-500">
                  {health.value}
                </p>
              </div>
            </div>
          );
        })}
      </Card>
    </div>
  );
};

export default HealthOverview;