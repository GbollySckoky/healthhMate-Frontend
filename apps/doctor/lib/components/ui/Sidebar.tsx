'use client'
import React from 'react'
// import { sideBarData } from '@/components/data'
import Link from 'next/link'
import image from '@/assets/Group 19156.png'
import Image from 'next/image'
import { LogOut } from 'lucide-react'
import { useQueryClient } from '@tanstack/react-query'
import { storageService } from '@/lib/constant/storage'
import { ROUTES } from '@/lib/routes'
import { usePathname } from 'next/navigation'
import { sideBarData } from './data'

const SideBar = () => {
  const pathname = usePathname()
  const queryClient = useQueryClient()
  const logout = () => {
    storageService.clearAuthData()
    queryClient.clear()
    window.location.replace(ROUTES.login)
  }
  // const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <aside className="flex h-full w-20 shrink-0 flex-col overflow-y-auto bg-red-900 text-white md:w-[260px]">
      <div className="flex h-16 items-center justify-center px-3 md:justify-start">
        <Image src={image} alt="Healthmate" width={120} className="hidden md:block" priority />
      </div>
      <div className="flex min-h-0 flex-1 flex-col px-2 pb-3">
        <div className="flex min-h-0 flex-1 flex-col">
          {sideBarData.map(({ id, icon, text, url }) => (
            <div key={id}>
              <Link
                href={url}
                className={`flex items-center gap-3 no-underline ${
                  (pathname === url || (url !== '/' && pathname.startsWith(`${url}/`)))
                    ? 'bg-red-100 font-medium text-grey-900 rounded-lg my-3 '
                    : 'text-white'
                } p-4 hover:bg-red-100 hover:text-grey-900 rounded-lg transition-colors duration-200  cursor-pointer`}
                aria-current={pathname === url || (url !== '/' && pathname.startsWith(`${url}/`)) ? 'page' : undefined}
              >
                <span className="flex-shrink-0">{icon}</span>
                <p className="font-normal text-[14px] font-sans hidden md:block">{text}</p>
              </Link>
            </div>
          ))}
        </div>

        <div className="shrink-0 border-t border-[#F1F1F1] p-4">
          <button type="button" aria-label="Log out" onClick={logout}
            className="flex w-full items-center justify-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-red-100 transition-colors hover:bg-[#FEF3F2] hover:text-red-900 md:justify-start">
            <LogOut size={20} className="shrink-0" />
            <span className="hidden md:block">Logout</span>
          </button>
        </div>
      </div>
    </aside>
  )
}

export default SideBar
