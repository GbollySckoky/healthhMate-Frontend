'use client'
import React, { useState } from 'react'
// import { sideBarData } from '@/components/data'
import Link from 'next/link'
import image from '@/assets/Group 19156.png'
import Image from 'next/image'
import { LogOut } from 'lucide-react'
import { usePathname } from 'next/navigation'
import useGetMe from '@/lib/hooks/useGetMe'
import MeSkeleton from './MeSkeleton'
import { sideBarData } from './data'
import { CapitalizeName } from '@/lib/constant/capitalizeName'

const SideBar = () => {
  const pathname = usePathname()
  const [activeUrl, setActiveUrl] = useState<string>(pathname || '')
  const handleActiveUrl = (url: string) => setActiveUrl(url)
  const {myData:data, isLoading} = useGetMe()

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
                  activeUrl === url
                    ? 'bg-red-100 font-medium text-grey-900 rounded-lg my-3 '
                    : 'text-white'
                } p-4 hover:bg-red-100 hover:text-grey-900 rounded-lg transition-colors duration-200  cursor-pointer`}
                onClick={() => handleActiveUrl(url)}
              >
                <span className="flex-shrink-0">{icon}</span>
                <p className="font-normal text-[14px] font-sans hidden md:block">{text}</p>
              </Link>
            </div>
          ))}
        </div>

        {/* Admin section */}
        {isLoading ? (
          <MeSkeleton />
        ) : (
          <div className="flex items-center justify-center border-t border-white/20 p-2 md:justify-between">
            <div>
              <p className="font-sans font-semibold text-[14px] hidden md:block">{`${CapitalizeName(data?.firstName)} ${CapitalizeName(data?.lastName)}`}</p>
              <p className="font-inter text-[14px] font-normal hidden md:block">{data?.email ?? 'N/A'}</p>
            </div>
            <span className="cursor-pointer">
              <LogOut size={18} />
            </span>
          </div>
        )}
      </div>
    </aside>
  )
}

export default SideBar
