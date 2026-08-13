"use client";

import Image from "next/image";
import Link from "next/link";
import { Bell } from "lucide-react";
import useGetMe from "@/hooks/useGetMe";
import { ROUTES } from "@/constants/route";
import { usePathname, useRouter } from "next/navigation";
import profileFallback from "@/assets/Ellipse 165.png";
import useGetUnReadNotification from "@/hooks/useGetUnReadNotification";
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

const HeaderSkeleton = () => (
  <header className="sticky top-0 z-40 flex flex-row items-center justify-between bg-white border-b border-[#F1F1F1] px-5 py-3 shrink-0">
    <div className="flex flex-col gap-1.5">
      <SkeletonBlock width={80} height={10} />
      {/* <SkeletonBlock width={110} height={16} />/ */}
    </div>
    <div className="flex flex-row items-center gap-4">
      <SkeletonBlock width={22} height={22} rounded="rounded-full" />
      <SkeletonBlock width={36} height={36} rounded="rounded-full" />
    </div>
  </header>
);


export default function Header() {
  const { patient, isLoading } = useGetMe();
  const pathname = usePathname()
  const {unReadNotifications} = useGetUnReadNotification()
  const router = useRouter();

  if (isLoading) {
    return <HeaderSkeleton />;
  }

   const getTitle = (pathname: string) => {
      if (pathname === ROUTES.home) return 'Home'
      if (pathname === ROUTES.track) return 'Track'
      if (pathname === ROUTES.appointments) return 'Appointments'
      if (pathname === ROUTES.consultation) return 'Consultations'
      if (pathname === ROUTES.consultation || pathname.startsWith(ROUTES.consultation + '/')) return 'Consultation Details'
      if (pathname === ROUTES.appointments) return 'Appointments'
      if (pathname === ROUTES.appointments || pathname.startsWith(ROUTES.appointments + '/')) return 'Appointment Details'
      // if (pathname === ROUTES.earnings || pathname.startsWith(ROUTES.earnings + '/')) return 'Earnings & Transactions'
      if (pathname === ROUTES.profile) return 'Profile'
      if (pathname === ROUTES.support) return 'Support'
      if (pathname === ROUTES.support || pathname.startsWith(ROUTES.support + '/')) return 'Support Details'
      if (pathname === ROUTES.settings) return 'Settings'
      // if (pathname === ROUTES.message || pathname.startsWith(ROUTES.message + '/')) return 'Messages'
      // if (pathname === ROUTES.availability) return 'Availability'
      if (pathname === ROUTES.notifications) return 'Notification'
      return ''
   }

  const Title = getTitle(pathname)
  return (
    <header className="sticky top-0 z-40 flex flex-row items-center justify-between bg-white border-b border-[#F1F1F1] px-5 py-3 shrink-0">
      <div className="flex flex-col">
        {/* <span className="text-xs font-lato text-[#717680]">Welcome back,</span> */}
        <p className="text-xl font-semibold font-lato text-[#414651{]">{Title}</p>
      </div>
      <div className="flex flex-row items-center gap-4">
        <div className='relative cursor-pointer' onClick={() => router.push(ROUTES.notifications)}>
          <Bell size={22} className="text-gray-600 hover:text-gray-800" />
          <span className='bg-red-800  text-white text-xs rounded-full absolute -top-1 -right-2 px-1.5 py-0.5 min-w-[18px] h-[18px] flex items-center justify-center'>{unReadNotifications ?? 0}</span>
        </div>

        <Link href={"/profile"} aria-label="Profile">
          <Image
            src={patient?.profilePicture || profileFallback}
            alt="Profile"
            width={36}
            height={36}
            className="w-9 h-9 rounded-full object-cover border border-[#F1F1F1]"
          />
        </Link>
      </div>
    </header>
  );
}