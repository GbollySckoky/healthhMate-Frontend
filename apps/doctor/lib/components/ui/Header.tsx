"use client"
import React from 'react'
import { Bell, ChevronLeft} from 'lucide-react';
import profile from '@/assets/default.jpg'
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ROUTES } from '@/lib/routes';
import { useRouter } from 'next/navigation';
import useGetMe from '@/lib/hooks/useGetMe';
import MeSkeleton from './MeSkeleton';
import useGetUnReadNotification from '@/lib/hooks/useGetUnReadNotification';
import { CapitalizeName } from '@/lib/constant/capitalizeName';

const Header = () => {
    const pathname = usePathname()
    const routeTitles: Record<string, [string, string]> = {
      'patients': ['Patients', 'Patient Details'],
      'support': ['Support', 'Support Details'],
      'earnings': ['Earnings', 'Transaction Details'],
      'profile': ['Profile', 'Profile Details'],
      'settings': ['Settings', 'Settings'],
      'notifications': ['Notifications', 'Notification Details'],
      'appointments': ['Appointments', 'Appointment Details'],
      'messages': ['Messages', 'Conversation Details'],
      'availability': ['Availability', 'Availability Details'],
    }
    const segments = pathname.split('/').filter(Boolean)
    const isDetailPage = segments.length > 1
    const titles = routeTitles[segments[0] ?? '']
    const Title = pathname === '/' ? 'Dashboard' : (titles?.[isDetailPage ? 1 : 0] ?? 'Details')
    const parentRoute = `/${segments[0] ?? ''}`
    const headerTitle = pathname.startsWith('/patients/communication/') ? 'Patient Consultation' : Title

    const router = useRouter()
    const {unReadNotifications} = useGetUnReadNotification()
    const {myData:data, isLoading} = useGetMe() 


  return (
    <header className='z-20 flex h-16 shrink-0 items-center justify-between border-b border-slate-100 bg-white px-4 shadow-sm sm:px-8'>
        <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
                {isDetailPage && (
                <button type="button" aria-label={`Back to ${titles?.[0] ?? "overview"}`} onClick={() => router.push(parentRoute)}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-800">
                    <ChevronLeft size={20} />
                </button>
                )} 
                <p className='font-semibold text-[20px] text-health-black font-libre'>{headerTitle}</p>
            </div>
            <div className='flex items-center space-x-4'>
                <div className='h-8 w-[1px] bg-slate-300 mr-5'/>
                <div className='relative cursor-pointer' onClick={() => router.push(ROUTES.notifications)}>
                    <Bell size={22} className="text-gray-600 hover:text-gray-800" />
                    <span className='bg-red-800  text-white text-xs rounded-full absolute -top-1 -right-2 px-1.5 py-1 min-w-[18px] h-[18px] flex items-center justify-center'>{unReadNotifications > 99 ? '99+' : unReadNotifications}</span>
                </div>
                {isLoading ? (
                    <MeSkeleton />
                ) : (
                    <div className="flex items-center gap-4 pl-3">
                        <div className='border border-border rounded-full cursor-pointer'>
                            <Image 
                                src={data?.profile?.profilePicture || profile} 
                                alt={CapitalizeName(data?.firstName)} 
                                width={10} 
                                height={10} 
                                className='rounded-full w-10 h-10' 
                            /> 
                        </div>
                        <div className="hidden sm:block">
                            <p className='font-lato font-bold text-[14px]'>Dr. {' '}
                                {CapitalizeName(data?.firstName)} {' '} 
                                {CapitalizeName(data?.lastName)}</p>
                            <p className='font-medium text-[12px] text-red-800 font-lato'>{data?.profile?.specialization ?? '-'}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    </header>
  )
}

export default Header
