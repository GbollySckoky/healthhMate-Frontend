"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ACTIVE_COLOR, FOOTER_NAV_ITEMS, INACTIVE_COLOR } from "./data";

export default function Footer() {
  const pathname = usePathname();

  return (
    <nav
      className="flex flex-row items-stretch bg-white border-t border-[#E5E7EB] p-3 w-full shrink-0"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      {FOOTER_NAV_ITEMS.map(({ id, label, href, icon: Icon }) => {
        const isActive = pathname === href || pathname?.startsWith(`${href}/`);

        return (
          <Link
            key={id}
            href={href}
            aria-label={label}
            aria-current={isActive ? "page" : undefined}
            className="flex flex-1 flex-col items-center justify-center gap-1 py-1.5"
          >
            <Icon
              size={22}
              color={isActive ? ACTIVE_COLOR : INACTIVE_COLOR}
              strokeWidth={isActive ? 2.4 : 2}
            />
            <span
              className="text-xs font-medium"
              style={{ color: isActive ? ACTIVE_COLOR : INACTIVE_COLOR }}
            >
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}