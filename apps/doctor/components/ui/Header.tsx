"use client"
import React from 'react'
import { Bell, ChevronLeft} from 'lucide-react';
import profile from '@/assets/Image.png'
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ROUTES } from '@/lib/routes';
import { useRouter } from 'next/navigation';

const Header = () => {
    const pathname = usePathname()
    const router = useRouter()
    const isDetailPage = pathname.split('/').length > 2


    const getTitle = (pathname: string) => {
  if (pathname === ROUTES.dashboard) return 'Dashboard'
  if (pathname === ROUTES.patients || pathname.startsWith(ROUTES.patients + '/')) return 'Patients'
  if (pathname === ROUTES.appointment || pathname.startsWith(ROUTES.appointment + '/')) return 'Appointments'
  if (pathname === ROUTES.earnings || pathname.startsWith(ROUTES.earnings + '/')) return 'Earnings & Transactions'
  if (pathname === ROUTES.profile) return 'Profile'
  if (pathname === ROUTES.support) return 'Support'
  if (pathname === ROUTES.settings) return 'Settings'
  if (pathname === ROUTES.message || pathname.startsWith(ROUTES.message + '/')) return 'Messages'
  if (pathname === ROUTES.availability) return 'Availability'
  return ''
}

const Title = getTitle(pathname)
  return (
    <div className='flex items-center justify-between bg-white shadow-sm  z-20 fixed top-0 left-2 right-0 pr-10 h-16 px-8 ml-[50px] md:ml-[250px]'>
        <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
                {isDetailPage && (
                <ChevronLeft size={20} className='cursor-pointer' onClick={() => router.back()} />
                )} 
                <p className='font-semibold text-[20px] text-health-black font-libre'>{Title}</p>
            </div>
            <div className='flex items-center space-x-4'>
                <div className='h-8 w-[1px] bg-slate-300 mr-5'/>
                <div className='relative cursor-pointer'>
                    <Bell size={22} className="text-gray-600 hover:text-gray-800" />
                    <span className='bg-red-800  text-white text-xs rounded-full absolute -top-1 -right-2 px-1.5 py-0.5 min-w-[18px] h-[18px] flex items-center justify-center'>4</span>
                </div>
                <div className="flex items-center gap-4 pl-3">
                        <Image src={profile} alt="Logo" priority width={35} className='rounded-full' /> 
                    <div>
                        <p className='font-lato font-bold text-[14px]'>Dr Uche Okoro</p>
                        <p className='font-medium text-[12px] text-red-800 font-lato'>Dermatologist</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Header