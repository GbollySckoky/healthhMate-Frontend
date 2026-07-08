import { DoctorOverviewSkeleton } from "@/components/ui/DoctorDetailsSkeleton";
import { Infos } from "@/components/ui/Reusable";
import { Data } from "@/lib/interface/doctor_details.interface";
import React from "react";

const Overview = ({
  doctorDetails,
  isLoading,
}: {
  doctorDetails: Data;
  isLoading: boolean;
}) => {
  if (isLoading) {
    return <DoctorOverviewSkeleton />;
  }

  return (
    <div>
      <div className="mt-5 border-b border-borderColor pb-4">
        <p className="font-semibold text-[18px] font-libre mb-3">
          Account Details
        </p>

        <Infos
          label="Name:"
          value={`${doctorDetails?.firstName || ""} ${
            doctorDetails?.lastName || ""
          }`.trim() || "-"}
        />
        <Infos label="Email:" value={doctorDetails?.email || "-"} />
        <Infos label="Phone Number:" value={doctorDetails?.phoneNumber || "-"} />
      </div>

      <div className="mt-5 border-b border-borderColor pb-4">
        <p className="font-semibold text-[18px] font-libre mb-3">
          Personal Information
        </p>

        <Infos label="Gender:" value={doctorDetails?.gender || "-"} />
        {/* <Infos label="Date of Birth:" value={doctorDetails?.dateOfBirth || "-"} /> */}
        {/* <Infos label="Branch:" value={doctorDetails?.branch?.branchName || "-"} /> */}
        <Infos
          label="Department:"
          value={doctorDetails?.profile?.specialization || "-"}
        />
        <Infos
          label="License Number:"
          value={doctorDetails?.profile?.licenseNumber || "-"}
        />
      </div>

      <div className="mt-5">
        <p className="font-semibold text-[18px] font-libre mb-3">
          Account Activity
        </p>

        {/* <Infos
          label="Total Consultations:"
          value={doctorDetails?.appointments?.length || "0"}
        /> */}
        <Infos label="Avg Rating:" value="⭐ 4.0 (29 reviews)" />
        <Infos label="Status:" value="Active" />
        <Infos label="Last Login:" value="-" />
        <Infos
          label="Date Joined:"
          value={
            doctorDetails?.createdAt
              ? new Date(doctorDetails.createdAt).toLocaleDateString()
              : "-"
          }
        />
      </div>
    </div>
  );
};

export default Overview;