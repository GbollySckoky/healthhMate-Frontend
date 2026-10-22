'use client'
import React from 'react'
import { sideBarData } from '@/components/data'
import Link from 'next/link'
import image from '../../assets/Group 19156(1).svg'
import Image from 'next/image'
import { LogOut } from 'lucide-react'
import { useQueryClient } from '@tanstack/react-query'
import { clearAuthSession } from '@/lib/service/auth-session'
import { ROUTES } from '@/lib/constant/Routes'
import { usePathname } from 'next/navigation'

const SideBar = () => {
  const queryClient = useQueryClient()
  const logout = () => {
    clearAuthSession()
    queryClient.clear()
    window.location.replace(ROUTES.login)
  }
  const pathname = usePathname()

  return (
    <div className="bg-red-900 md:w-[260px] w-[64px] h-screen overflow-y-auto text-white z-30 fixed ">
      <div className="mx-2">
        <div className="flex items-center mt-3 pl-3">
          <Image src={image} alt="Logo" width={120} className="" priority />
        </div>

        <div className="flex flex-col justify-between h-[75vh] mt-3">
          {/* First 7 links */}
          <div>
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
        </div>

        <div className="shrink-0 border-t border-[#F1F1F1] p-4">
          <button type="button" aria-label="Log out" onClick={logout}
            className="flex w-full items-center justify-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-red-100 transition-colors hover:bg-[#FEF3F2] hover:text-red-900 md:justify-start">
            <LogOut size={20} className="shrink-0" />
            <span className="hidden md:block">Logout</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default SideBar
