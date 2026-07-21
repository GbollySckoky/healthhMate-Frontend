import LoaadingSkeleton from "@/lib/components/ui/LoaadingSkeleton";
import { Infos } from "@/lib/components/ui/Reusable";
// import { DOCTOR_PROFILE } from "@/lib/interface/get-doctor-profile.interface";
import React from "react";

const Overview = ({
  profileData,
  isLoading,
  isError,
  error,
}: {
  profileData: any;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}) => {

  if (isLoading) {
    return <LoaadingSkeleton />;
  }

  if (isError) {
    return (
      <div className="text-center py-10 text-red-600 text-sm">
        Failed to load doctor profile. Please try again. {error?.message}
      </div>
    );
  }

  return (
    <div>
      {/* ACCOUNT DETAILS */}
      <div className="mt-5 border-b border-borderColor pb-4">
        <p className="font-semibold text-[18px] font-libre mb-3">
          Account Details
        </p>

        <Infos
          label="Name:"
          value={`${profileData?.firstName.charAt(0).toUpperCase() + profileData?.firstName.slice(1) || ""} ${
            profileData?.lastName.charAt(0).toUpperCase() + profileData?.lastName.slice(1) || ""
          }`.trim() || "N/A"}
        />
        <Infos label="Email:" value={profileData?.email || "N/A"} />
        <Infos label="Phone Number:" value={profileData?.phoneNumber || "N/A"} />
      </div>

      {/* DOCTOR INFORMATION */}
      <div className="mt-5 border-b border-borderColor pb-4">
        <p className="font-semibold text-[18px] font-libre mb-3">
          Personal Information
        </p>

        <Infos label="Gender:" value={profileData?.gender || "N/A"} />
        <Infos
          label="Consultation Fee:"
          value={profileData?.profile?.consultationFee.toLocaleString() || "N/A"}
        />
        <Infos
          label="Years Of Experience:"
          value={
            profileData?.profile?.yearsOfExperience
              ? profileData.profile.yearsOfExperience > 1
                ? `${profileData.profile.yearsOfExperience} Years`
                : `${profileData.profile.yearsOfExperience} Year`
              : "N/A"
          }
        />
        <Infos
          label="Specialization:"
          value={profileData?.profile?.specialization || "N/A"}
        />
        <Infos
          label="License Number:"
          value={profileData?.profile?.licenseNumber || "N/A"}
        />
        <Infos
          label="Hospital:"
          value={profileData?.hospital?.hospitalName || "N/A"}
        />
      </div>

      {/* ACCOUNT ACTIVITY */}
      <div className="mt-5">
        <p className="font-semibold text-[18px] font-libre mb-3">
          Account Activity
        </p>

        <Infos label="Total Consultations:" value={profileData?.appointments.length ?? 0} />
        <Infos label="Avg Rating:" value="⭐ 4.0 (29 reviews)" />
        <Infos label="Status:" value="Active" />
        <Infos label="Last Login:" value="Today, 2:30 PM" />
        <Infos
          label="Date Joined:"
          value={
            profileData?.createdAt
              ? new Date(profileData.createdAt).toLocaleDateString()
              : "N/A"
          }
        />
      </div>
    </div>
  );
};

export default Overview;