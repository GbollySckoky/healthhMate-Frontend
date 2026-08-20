"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Pencil, User, Mail, Phone, Calendar, ChevronRight, LogOut, AlertCircle, Transgender, BeanOff } from "lucide-react";
import { ROUTES } from "@/constants/route";
import { otherMenuItems } from "@/constants/data";
import useGetMe from "@/hooks/useGetMe";
import { useAuth } from "@/hooks/useAuthWeb";
import { colors } from "@/constants/colors";


function getAge(dateOfBirth?: string) {
  if (!dateOfBirth) return null;
  const dob = new Date(dateOfBirth);
  if (isNaN(dob.getTime())) return null;
  const diff = Date.now() - dob.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
}

const capitalize = (value?: string) =>
  value ? value.charAt(0).toUpperCase() + value.slice(1).toLowerCase() : "-";

/* ---------- Skeleton ---------- */

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
    style={{ width: typeof width === "number" ? `${width}px` : width, height: `${height}px` }}
  />
);

const ProfileSkeleton = () => (
  <div className="p-5">
    <div className="flex flex-col items-center">
      <SkeletonBlock width={100} height={100} rounded="rounded-full" className="mb-3" />
      <SkeletonBlock width={140} height={18} className="mb-2" />
      <SkeletonBlock width={60} height={12} />
    </div>
    <div className="mt-8 space-y-3">
      {[1, 2, 3, 4, 5, 6].map((key) => (
        <SkeletonBlock key={key} width="100%" height={40} />
      ))}
    </div>
  </div>
);

/* ---------- Account info row ---------- */

const AccountInfoRow = ({
  icon,
  title,
  value,
  subValue,
  next,
  isLast,
}: {
  icon: React.ReactNode;
  title: string;
  value?: string | null;
  subValue?: string | null;
  next?: React.ReactNode;
  isLast?: boolean;
}) => (
  <div
    className={`flex flex-row items-center justify-between py-3.5 ${
      isLast ? "" : "border-b border-[#F1F1F1]"
    }`}
  >
    <div className="flex flex-row items-center gap-3">
      <span className="shrink-0">{icon}</span>
      <div className="flex flex-col">
        <span className="text-sm font-normal" style={{ color: colors.lightBlack }}>
          {title}
        </span>
        <span className="text-xs mt-1 font-normal text-[#717680]">
          {value || "-"} {subValue ? subValue : ""}
        </span>
      </div>
    </div>
    {next}
  </div>
);

const LogoutModal = ({
  icon,
  title,
  text,
  isOpen,
  closeModal,
  onConfirm,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
  isOpen: boolean;
  closeModal: () => void;
  onConfirm: () => void;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-center">
        <div className="flex justify-center mb-3 ">{icon}</div>
        <p className="text-base font-semibold text-[#181D27] mb-1.5">{title}</p>
        <p className="text-sm text-[#717680] mb-6">{text}</p>
        <div className="flex flex-row gap-3">
          <button
            type="button"
            onClick={closeModal}
            className="flex-1 py-2.5 rounded-lg border border-[#D6D7DA] text-sm font-semibold text-[#252B37]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 py-2.5 rounded-lg bg-[#D92D20] text-sm font-semibold text-white"
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};

const Profile = () => {
  const router = useRouter();
  const { patient, isLoading, isError, error } = useGetMe();
  const { logout } = useAuth();
  const [openModal, setOpenModal] = useState(false);

  const handleDisplay = () => setOpenModal((v) => !v);
  const navigate = () => router.push(ROUTES.editProfileName);
  const handleMenuNavigation = (route: string) => router.push(route);
  const handleConfirmLogout = () => {
    setOpenModal(false);
    logout();
  };

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  if (isError) {
    const errorMessage = error instanceof Error ? error.message : "Something went wrong";
    return (
      <div className="h-full flex items-center justify-center">
        <span className="text-sm text-gray-500">{errorMessage}</span>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="h-full flex items-center justify-center">
        <span className="text-sm text-[#717680]">No profile data found.</span>
      </div>
    );
  }

  const age = getAge(patient.dateOfBirth);

  return (
    <div className="max-w-md mx-auto px-4 py-5">
      <div className="flex flex-col items-center justify-center">
        <div className="relative">
          <Image
            src={patient.profilePicture || "/images/profile-placeholder.png"}
            alt="Profile"
            width={100}
            height={100}
            className="w-[100px] h-[100px] rounded-full object-cover mb-1.5 border border-[#D6D7DA]"
            priority
          />
          <button
            type="button"
            onClick={navigate}
            aria-label="Edit profile picture"
            className="absolute right-0 bottom-0 bg-white rounded-full p-1.5 shadow"
          >
            <Pencil size={18} color="black" />
          </button>
        </div>
        <span className="text-sm font-libre font-semibold text-[#414651] mt-2">
          {patient.firstName || "-"} {patient.lastName || "-"}
        </span>
        {age !== null && (
          <span className="text-xs font-normal mt-1" style={{ color: colors.purple }}>
            {age} years
          </span>
        )}
      </div>

      {/* Account Info */}
      <div className="mt-8">
        <span className="text-sm font-lato text-[#717680]">Account Information</span>
        <div className="mt-2 rounded-2xl border border-[#F1F1F1] bg-white px-4">
          <AccountInfoRow
            icon={<User size={18} color={colors.lightRed} />}
            title="Name"
            value={patient.firstName}
            subValue={patient.lastName}
            next={<ChevronRight size={22} color="#A4A7AE" />}
          />
          <AccountInfoRow icon={<Mail size={18} color={colors.lightRed} />} title="Email" value={patient.email} />
          <AccountInfoRow
            icon={<Phone size={18} color={colors.lightRed} />}
            title="Phone Number"
            value={patient?.profile?.phoneNumber}
          />
          <AccountInfoRow
            icon={<Calendar size={18} color={colors.lightRed} />}
            title="Date of birth"
            value={patient?.profile?.dateOfBirth}
          />
          <AccountInfoRow
            icon={<Transgender size={18} color={colors.lightRed}/>}
            title="Gender"
            value={capitalize(patient?.profile?.gender)}
          />
          <AccountInfoRow
            icon={<BeanOff size={18} color={colors.lightRed} />}
            title="Allergies"
            value={patient?.profile?.allergies}
            isLast
          />
        </div>
      </div>

      {/* Other */}
      <div className="mt-8">
        <span className="text-sm font-lato text-[#717680]">Other</span>
        <div className="mt-2 rounded-2xl border border-[#F1F1F1] bg-white px-4">
          {otherMenuItems.map((item, index) => {
            const { title, id, icon, route } = item;
            const isLastItem = index === otherMenuItems.length - 1;
            return (
              <button
                type="button"
                key={id}
                onClick={() => handleMenuNavigation(route)}
                className={`w-full text-left flex flex-row items-center py-3.5 ${
                  isLastItem ? "" : "border-b border-[#F1F1F1]"
                }`}
              >
                <span className="shrink-0">{icon}</span>
                <span className="ml-2.5 text-sm font-lato text-[#252B37]">
                  {title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Log out */}
      <button
        type="button"
        onClick={handleDisplay}
        className="w-full flex flex-row items-center p-[15px] border border-[#E5E7EB] rounded-lg my-5"
      >
        <LogOut size={17} color={colors.lightRed} />
        <span className="ml-2.5 text-sm font-bold" style={{ color: colors.lightRed }}>
          Log out
        </span>
      </button>

      <LogoutModal
        icon={<AlertCircle size={24} color="#D92D20" />}
        title="Are you sure you want to log out?"
        text="You'll need to sign in again to access your health dashboard."
        closeModal={handleDisplay}
        isOpen={openModal}
        onConfirm={handleConfirmLogout}
      />
    </div>
  );
};

export default Profile;