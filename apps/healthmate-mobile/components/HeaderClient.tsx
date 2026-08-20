"use client";

import Image from "next/image";
import Link from "next/link";
import { Bell, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { ROUTES } from "@/constants/route";
import { useRouter } from "next/navigation";
import profileFallback from "@/assets/Ellipse 165.png";
import { usePageTitle } from "./Title";
import { patientService } from "@/service/patientService";

interface HeaderClientProps {
  onMenuClick?: () => void;
}

// interface PatientSummary {
//   profilePicture?: string | null;
// }

export default function HeaderClient({
  onMenuClick,
}: HeaderClientProps) {
  const [patient, setPatient] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [unReadNotifications, setUnReadNotifications] =
    useState<number | null>(0);

  const router = useRouter();
  const pageTitle = usePageTitle();

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const p = await patientService.getMe();

        if (mounted) {
          setPatient(p?.data ?? p ?? null);
        }
      } catch (e: unknown) {
        console.error(e);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    async function loadUnread() {
      try {
        const count = await patientService.unReadNotifications();

        if (mounted) {
          setUnReadNotifications(count ?? 0);
        }
      } catch (e: unknown) {
        console.error(e);
      }
    }

    load();
    loadUnread();

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <header className="sticky top-0 z-40 flex items-center justify-between bg-white border-b border-[#F1F1F1] px-5 py-3 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-gray-200 rounded animate-pulse md:hidden" />
          <div className="w-20 h-3 bg-gray-200 animate-pulse rounded" />
        </div>

        <div className="flex items-center gap-4">
          <div className="w-6 h-6 bg-gray-200 rounded-full animate-pulse" />
          <div className="w-9 h-9 bg-gray-200 rounded-full animate-pulse" />
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between bg-white border-b border-[#F1F1F1] px-5 py-3 shrink-0 ">
      {/* Left */}
      <div className="flex items-center gap-3">
        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={onMenuClick ?? (() => undefined)}
          className="md:hidden p-1.5 rounded-lg hover:bg-gray-100"
          aria-label="Open menu"
        >
          <Menu size={22} className="text-gray-600" />
        </button>

        <h1 className="font-semibold text-base text-[#414651] font-libre">
          {pageTitle}
        </h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        <div
          className="relative cursor-pointer"
          onClick={() => router.push(ROUTES.notifications)}
        >
          <Bell
            size={22}
            className="text-gray-600 hover:text-gray-800"
          />

          {unReadNotifications !== null &&
            unReadNotifications > 0 && (
              <span className="bg-red-800 text-white text-xs rounded-full absolute -top-1 -right-2 px-1.5 py-0.5 min-w-[18px] h-[18px] flex items-center justify-center">
                {unReadNotifications > 99
                  ? "99+"
                  : unReadNotifications}
              </span>
            )}
        </div>

        <Link href={ROUTES.profile} aria-label="Profile">
          <Image
            src={patient?.profilePicture || profileFallback}
            alt="Profile"
            width={36}
            height={36}
            className="w-9 h-9 rounded-full object-cover border border-[#F1F1F1]"
            loading="lazy"
          />
        </Link>
      </div>
    </header>
  );
}