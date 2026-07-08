import OverviewSkeleton from "@/components/ui/OverviewSkeleton";
import { Infos } from "@/lib/components/ui/Reusable";
import React from "react";

const Overview = ({
  patient,
  isLoading,
}: {
  patient: any;
  isLoading: boolean;
}) => {
  if (isLoading) {
    return <OverviewSkeleton/>;
  }

  return (
    <div>
      <div className="mt-5 border-b border-borderColor pb-4">
        <p className="mb-3 font-libre text-[18px] font-semibold">
          Account Details
        </p>

        <Infos
          label="Name:"
          value={`${patient?.user?.firstName || ""} ${
            patient?.user?.lastName || ""
          }`.trim() || "-"}
        />
        <Infos label="Email:" value={patient?.user?.email || "-"} />
        <Infos label="Phone Number:" value={patient?.user?.phone || "-"} />
      </div>

      <div className="mt-5 border-b border-borderColor pb-4">
        <p className="mb-3 font-libre text-[18px] font-semibold">
          Patient Information
        </p>

        <Infos label="Gender:" value={patient?.user?.gender || "-"} />
        <Infos label="Date of Birth:" value={patient?.user?.dateOfBirth || "-"} />
      </div>

      <div className="mt-5">
        <p className="mb-3 font-libre text-[18px] font-semibold">
          Account Activity
        </p>

        <Infos label="Total Appointments:" value="1" />
        <Infos label="Status:" value={patient?.status || "Not specified"} />
        <Infos label="Last Visit:" value={patient?.date || "Not specified"} />
      </div>
    </div>
  );
};

export default Overview;