"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, Settings, X } from "lucide-react";
import Image from 'next/image'
import logo from '@/assets/Group 19156 copy.png'

import {
  PATIENT_NAV_ITEMS,
  ACTIVE_COLOR,
  // INACTIVE_COLOR,
} from "@/constants/data";

import { ROUTES } from "@/constants/route";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({
  open,
  onClose,
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      <div
        onClick={onClose}
        className={`
          fixed inset-0 z-40 bg-black/40
          transition-opacity duration-300
          md:hidden
          ${
            open
              ? "visible opacity-100"
              : "invisible opacity-0"
          }
        `}
      />

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          flex w-[280px] flex-col
          bg-red-900 text-white
          border-r border-[#E5E7EB]
          shadow-xl

          transform
          transition-transform
          duration-300
          ease-in-out

          ${
            open
              ? "translate-x-0"
              : "-translate-x-full"
          }

          md:translate-x-0
          md:w-[250px]
          md:z-30
          md:shadow-none
        `}
      >
        {/* Logo / Close */}
        <div className="flex h-[62px] shrink-0 items-center justify-between border-b border-[#F1F1F1] px-5">
          <Link
            href={ROUTES.home}
            onClick={onClose}
            className="text-xl font-bold text-[#147D5A]"
          >
            <Image 
                src={logo}
                alt='Logo'
            />
          </Link>

          {/* Close button only on mobile */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation"
            className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-gray-100 md:hidden"
          >
            <X
              size={21}
              className="text-[#667085]"
            />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-6">
          <div className="space-y-1">
            {PATIENT_NAV_ITEMS.map(
              ({ id, label, href, icon: Icon }) => {
                const isActive =
                  pathname === href ||
                  pathname?.startsWith(`${href}/`);

                return (
                  <Link
                    key={id}
                    href={href}
                    onClick={onClose}
                    aria-current={
                      isActive ? "page" : undefined
                    }
                    className={`
                      flex items-center gap-3
                      rounded-lg
                      px-3 py-3
                      transition-colors

                      ${
                        isActive
                          ? "bg-[#EAF6F1]"
                          : "hover:bg-[#F7F9F8]"
                      }
                    `}
                  >
                    <Icon
                      size={20}
                      strokeWidth={
                        isActive ? 2.4 : 2
                      }
                      color={
                        isActive
                          ? ACTIVE_COLOR
                          : "#FFFFFF"
                      }
                    />

                    <span
                      className={`
                        text-sm font-medium
                        ${
                          isActive
                            ? "text-red-900"
                            : "text-white"
                        }
                      `}
                    >
                      {label}
                    </span>
                  </Link>
                );
              }
            )}
          </div>

          {/* Account */}
          <div className="mt-8">
            <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-wider text-white">
              Account
            </p>

            <Link
              href={ROUTES.settings}
              onClick={onClose}
              className={`
                flex items-center gap-3
                rounded-lg
                px-3 py-3
                transition-colors

                ${
                  pathname === ROUTES.settings
                    ? "bg-[#EAF6F1] text-red-100"
                    : "text-white"
                }
              `}
            >
              <Settings
                size={20}
                color={
                  pathname === ROUTES.settings
                    ? ACTIVE_COLOR
                    : "#FFFFFF"
                }
              />

              <span className="text-sm font-medium">
                Settings
              </span>
            </Link>
          </div>
        </nav>

        {/* Logout */}
        <div className="shrink-0 border-t border-[#F1F1F1] p-4">
          <button
            type="button"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-red-100 transition-colors hover:bg-[#FEF3F2]"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}