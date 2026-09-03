"use client";

import Image from "next/image";
import Link from "next/link";
import { Bell, Menu, ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { ROUTES } from "@/constants/route";
import { usePageTitle } from "./NavTitle";
import { patientService } from "@/service/patientService";
import useGetMe from "@/hooks/useGetMe";
import defaultImage from "@/assets/default.jpg";

interface HeaderClientProps {
  onMenuClick?: () => void;
  /** Fallback route for the back button when there's no usable browser history. */
  backFallbackHref?: string;
}

export default function HeaderClient({
  onMenuClick,
  backFallbackHref = ROUTES.home,
}: HeaderClientProps) {
  const [loading, setLoading] = useState(true);
  const [unReadNotifications, setUnReadNotifications] = useState<number | null>(0);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);

  const { patient: me } = useGetMe();
  const router = useRouter();
  const pathname = usePathname();
  const pageTitle = usePageTitle();

  // Any segment after the first counts as a "detail" page — not just ID-shaped
  // ones. /track -> hamburger, /track/medication -> back button.
  const segments = pathname.split("/").filter(Boolean);
  const isDetailRoute = segments.length > 1;

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const p = await patientService.getMe();
        const data = p?.data ?? p ?? null;
        if (mounted) setProfilePicture(data?.profile?.profilePicture ?? null);
      } catch (e: unknown) {
        console.error(e);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    async function loadUnread() {
      try {
        const count = await patientService.unReadNotifications();
        if (mounted) setUnReadNotifications(count ?? 0);
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

  function handleBack() {
    // No meaningful history (deep link, refresh, new tab) -> go to a known
    // fallback instead of leaving the app or doing nothing.
    if (window.history.length > 2) {
      router.back();
    } else {
      router.push(backFallbackHref);
    }
  }

  function handleMenuClick() {
    if (!onMenuClick) {
      console.warn("HeaderClient: onMenuClick was not provided");
      return;
    }
    onMenuClick();
  }

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
    <header className="sticky top-0 z-40 flex items-center justify-between bg-white border-b border-[#F1F1F1] px-5 py-3 shrink-0">
      {/* Left */}
      <div className="flex items-center gap-3">
        {isDetailRoute ? (
          <button
            type="button"
            onClick={handleBack}
            className="p-1.5 rounded-lg hover:bg-gray-100"
            aria-label="Go back"
          >
            <ChevronLeft size={20} className="text-gray-600" />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleMenuClick}
            className="md:hidden p-1.5 rounded-lg hover:bg-gray-100"
            aria-label="Open menu"
          >
            <Menu size={22} className="text-gray-600" />
          </button>
        )}

        <h1 className="font-semibold text-base text-[#414651] font-libre">
          {pageTitle}
        </h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button
          type="button"
          className="relative cursor-pointer"
          onClick={() => router.push(ROUTES.notifications)}
          aria-label="Notifications"
        >
          <Bell size={22} className="text-gray-600 hover:text-gray-800" />

          {unReadNotifications !== null && unReadNotifications > 0 && (
            <span className="bg-red-800 text-white text-xs rounded-full absolute -top-1 -right-2 px-1.5 py-0.5 min-w-[18px] h-[18px] flex items-center justify-center">
              {unReadNotifications > 99 ? "99+" : unReadNotifications}
            </span>
          )}
        </button>

        {/* Profile */}
        <Link href={ROUTES.profile} aria-label="Profile">
          <Image
            src={me?.profile?.profilePicture || profilePicture || defaultImage}
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