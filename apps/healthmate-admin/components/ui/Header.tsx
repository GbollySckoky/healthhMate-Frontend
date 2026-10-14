"use client"
import React from 'react'
import { Bell, ChevronLeft } from 'lucide-react';
import logo from '../../assets/default.jpg'
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import useGetMe from '@/lib/hooks/useGetMe';
import MeSkeleton from './MeSkeleton';
import useGetUnReadNotification from '@/lib/hooks/useGetUnReadNotification';
const Header = () => {
    const pathname = usePathname()
    const routeTitles: Record<string, [string, string]> = {
      'patients': ['Patients', 'Patient Details'],
      'support': ['Support', 'Support Details'],
      'earnings': ['Earnings & Transactions', 'Transaction Details'],
      'profile': ['Profile', 'Profile Details'],
      'settings': ['Settings', 'Settings'],
      'notifications': ['Notifications', 'Notification Details'],
      'appointment': ['Appointments', 'Appointment Details'],
      'doctors': ['Doctors', 'Doctor Details'],
      'branches': ['Branches', 'Branch Details'],
      'report': ['Reports & Analytics', 'Report Details'],
    }
    const segments = pathname.split('/').filter(Boolean)
    const isDetailPage = segments.length > 1
    const titles = routeTitles[segments[0] ?? '']
    const Title = pathname === '/' ? 'Dashboard' : (titles?.[isDetailPage ? 1 : 0] ?? 'Details')
    const parentRoute = `/${segments[0] ?? ''}`

    const router = useRouter()
    const {myData:data, isLoading} = useGetMe()
    const {unReadNotifications} = useGetUnReadNotification()

  return (
    <div className='flex items-center justify-between bg-white shadow-sm  z-20 fixed top-0 left-2 right-0 pr-10 h-16 px-8 ml-[50px] md:ml-[250px]'>
        <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
                {isDetailPage && (<button type="button" aria-label={`Back to ${titles?.[0] ?? "overview"}`} onClick={() => router.push(parentRoute)}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-800">
                    <ChevronLeft size={20} />
                </button>)}
                <p className='font-bold text-[20px] text-health-black font-libre'>{Title}</p>
            </div>
            <div className='flex items-center space-x-4'>
                <div className='h-8 w-[1px] bg-slate-300 mr-5'/>
                <div className='relative cursor-pointer'>
                    <Bell size={22} className="text-gray-600 hover:text-gray-800" />
                    <span className='bg-red-800  text-white text-xs rounded-full absolute -top-1 -right-2 px-1.5 py-0.5 min-w-[18px] h-[18px] flex items-center justify-center'>{unReadNotifications > 99 ? '99+' : unReadNotifications}</span>
                </div>
                 {isLoading ? (
                    <MeSkeleton />
                ) : (
                    <div className="flex items-center gap-4 pl-3">
                        <div className='border border-border cursor-pointer rounded-full w-30 h-30'>
                            <Image src={data?.profile?.profilePicture || logo} alt="Logo" priority  width={35} height={35} className='object-cover' /> 
                        </div>
                        <div>
                            <p className='font-lato font-bold text-[14px]'>{data?.hospitalName ?? '-'}</p>
                            <p className='font-medium text-[12px] text-red-800 font-lato'>{data?.email ?? '-'}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    </div>
  )
}

export default Header