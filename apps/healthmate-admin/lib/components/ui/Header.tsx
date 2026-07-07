"use client"
import React from 'react'
import { Bell} from 'lucide-react';
import logo from '../../../assets/3d.png'
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ROUTES } from '@/lib/constant/Routes';

const pageTitles: Record<string, string> = {
  [ROUTES.dashboard]: "Dashboard",
  [ROUTES.patients]: "Patients",
  [ROUTES.appointment]: "Appointments",
  [ROUTES.earnings]: "Earnings & Transactions",
  [ROUTES.report]: "Reports & Analytics",
  [ROUTES.support]: "Support",
  [ROUTES.settings]: "Settings",
  [ROUTES.doctors]: "Doctors",
  [ROUTES.branches]: "Branches",
};
const Header = () => {
    const pathname = usePathname()
    
    let title = pageTitles[pathname] ?? "";

    // Handle dynamic routes
    if (pathname.startsWith("/appointments/")) {
        title = "Appointment Details";
    }

    if (pathname.startsWith("/patients/")) {
        title = "Patient Details";
    }

    if (pathname.startsWith("/doctors/")) {
        title = "Doctor Details";
    }

  return (
    <header className="sticky top-0 z-50 flex py-5 items-center justify-between border-b border-slate-200 bg-white px-4 shadow-sm md:px-8">
        <div className="flex w-full items-center justify-between">
            <p className='font-bold text-[20px] text-health-black font-libre'>{title}</p>
            <div className='flex items-center space-x-4'>
                <div className='mr-5 h-8 w-[1px] bg-slate-300'/>
                <div className='relative cursor-pointer'>
                    <Bell size={22} className="text-gray-600 hover:text-gray-800" />
                    <span className='absolute -right-2 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-red-800 px-1.5 py-0.5 text-xs text-white'>4</span>
                </div>
                <div className="flex items-center gap-4 pl-3">
                    <div className='cursor-pointer rounded-full bg-red-100 p-2 transition-colors hover:bg-red-200'>
                        <Image src={logo} alt="Logo" priority /> 
                    </div>
                    <div>
                        <p className='font-lato font-bold text-[14px]'>Ever Care General Hospital</p>
                        <p className='font-medium text-[12px] text-red-800 font-lato'>Admin</p>
                    </div>
                </div>
            </div>
        </div>
    </header>
  )
}

export default Header