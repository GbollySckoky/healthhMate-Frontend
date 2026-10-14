"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { PageWrapper, FlexWrapper, Infos } from "@/lib/components/ui/Reusable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/lib/components/ui/tabs";
import { Hospital_Admin } from "@/lib/service/service";
import defaultImage from "@/assets/default.jpg";
import { HospitalProfileData } from "./HospitalProfile";

type AdminProfile = {
  hospitalName: string;
  email: string;
  phoneNumber: string;
  dateOfEstablishment: string;
  createdAt: string;
  profile: HospitalProfileData | null;
};

const Settings = () => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["me"],
    queryFn: (): Promise<{ data: AdminProfile }> => Hospital_Admin.getMe(),
  });
  const hospital = data?.data;
  const profile = hospital?.profile;

  return (
    <PageWrapper>
      <FlexWrapper>
        {isLoading ? (
          <div role="status" className="mt-5 animate-pulse rounded-lg border border-borderColor bg-white p-6">
            <span className="sr-only">Loading hospital profile</span>
            <div className="mb-6 h-14 w-60 rounded bg-gray-100" />
            <div className="h-64 rounded bg-gray-100" />
          </div>
        ) : isError || !hospital ? (
          <div role="alert" className="py-10 text-center text-sm text-red-600">
            <p>Failed to load hospital profile. Please try again.</p>
            <button type="button" onClick={() => void refetch()} className="mt-3 underline">Try again</button>
          </div>
        ) : (
          <div className="mt-5 rounded-lg border border-borderColor bg-white p-6">
            <div className="mb-3 border-b border-borderColor pb-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Image src={profile?.profilePicture || defaultImage} alt={`${hospital.hospitalName || "Hospital"} logo`} width={50} height={50} className="h-[50px] w-[50px] rounded-full border border-borderColor object-cover" />
                  <p className="font-libre text-[20px] font-medium text-grey-800">{hospital.hospitalName || "N/A"}</p>
                </div>
                {/* <button
                  type="button"
                  className="flex items-center gap-2 rounded-lg border border-red-800 p-2 font-inter text-sm font-semibold text-red-800"
                  onClick={() => openModal(
                    <HospitalProfile profile={profile} onSaved={closeModal} onCancel={closeModal} />,
                    { title: profile ? "Edit Profile" : "Create Profile", className: "max-w-lg" },
                  )}
                >
                  {profile && <PencilLine size={15} />}
                  {profile ? "Edit Profile" : "Create Profile"}
                </button> */}
              </div>
              <div className="mt-3">
                <p className="pb-1 font-libre text-sm font-semibold text-[#414651]">About us</p>
                <p className="font-inter text-sm text-[#717680]">{profile?.bio || "N/A"}</p>
              </div>
            </div>
            <Tabs defaultValue="overview" className="mt-4">
              <TabsList className="mb-5"><TabsTrigger value="overview">Overview</TabsTrigger></TabsList>
              <TabsContent value="overview">
                <div className="border-b border-borderColor pb-4">
                  <p className="mb-3 font-libre text-lg font-semibold">Account Details</p>
                  <Infos label="Hospital Name:" value={hospital.hospitalName || "N/A"} />
                  <Infos label="Email:" value={hospital.email || "N/A"} />
                  <Infos label="Phone Number:" value={hospital.phoneNumber || "N/A"} />
                  <Infos label="Date of Establishment:" value={hospital.dateOfEstablishment || "N/A"} />
                </div>
                <div className="mt-5 border-b border-borderColor pb-4">
                  <p className="mb-3 font-libre text-lg font-semibold">Hospital Information</p>
                  <Infos label="Specializations:" value={profile?.specializations || "N/A"} />
                  <Infos label="License Number:" value={profile?.licenseNumber || "N/A"} />
                  <Infos label="Address:" value={profile?.address || "N/A"} />
                  <Infos label="State:" value={profile?.state || "N/A"} />
                  <Infos label="Website:" value={profile?.website || "N/A"} />
                </div>
                <div className="mt-5">
                  <p className="mb-3 font-libre text-lg font-semibold">Account Activity</p>
                  <Infos label="Date Joined:" value={hospital.createdAt ? new Date(hospital.createdAt).toLocaleDateString() : "N/A"} />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </FlexWrapper>
    </PageWrapper>
  );
};

export default Settings;
