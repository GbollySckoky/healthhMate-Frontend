'use client'
import React, { useState } from 'react'
import { sideBarData } from '@/lib/components/ui/data'
import Link from 'next/link'
import image from '@/assets/Group 19156.png'
import Image from 'next/image'
import { LogOut } from 'lucide-react'
import { usePathname } from 'next/navigation'
import useGetMe from '@/lib/hooks/useGetMe'
import MeSkeleton from './MeSkeleton'

const SideBar = () => {
  const pathname = usePathname()
  const [activeUrl, setActiveUrl] = useState<string>(pathname || '')

  const handleActiveUrl = (url: string) => setActiveUrl(url)
  const {myData:data, isLoading} = useGetMe()

  return (
    <div className="bg-red-900 md:w-[260px] w-20 h-screen overflow-y-auto text-white z-30 fixed ">
      <div className="mx-2">
        <div className="flex items-center mt-3 pl-3">
          <Image src={image} alt="Logo" width={120}  priority />
        </div>

        <div className="flex flex-col justify-between h-[75vh] mt-3">
          {/* First 7 links */}
          <div>
            {sideBarData.slice(0, 8).map(({ id, icon, text, url }) => (
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
                  <p className="font-normal text-[14px] font-sans md:block hidden">{text}</p>
                </Link>
              </div>
            ))}
          </div>

          {/* Last 2 links */}
          <div>
            {sideBarData.slice(8, 10).map(({ id, icon, text, url }) => (
              <div key={id}>
                <Link
                  href={url}
                  className={`flex items-center gap-3 no-underline ${
                    activeUrl === url
                      ? 'bg-red-100 font-medium text-grey-900 rounded-lg mb-3 '
                      : 'text-white'
                  } p-4 hover:bg-red-100 hover:text-grey-900 rounded-lg transition-colors duration-200 cursor-pointer`}
                  onClick={() => handleActiveUrl(url)}
                >
                  <span className="flex-shrink-0">{icon}</span>
                  <p className="font-normal text-[14px] font-sans hidden md:block">{text}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>


        {isLoading ? (
          <MeSkeleton />
        ) : (
          <div className="flex items-center justify-center md:justify-between mt-4 p-2">
            <div>
              <p className="font-sans font-semibold text-[14px] hidden md:block">{data?.profile?.specialization ?? 'N/A'}</p>
              <p className="font-inter text-[14px] font-normal hidden md:block">{data?.email ?? 'N/A'}</p>
            </div>
            <span className="cursor-pointer">
              <LogOut size={18} />
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

export default SideBar
