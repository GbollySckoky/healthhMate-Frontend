"use client"
import React from 'react'
import { Bell} from 'lucide-react';
import logo from '../../assets/3d.png'
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ROUTES } from '@/lib/routes';

const Header = () => {
    const pathname = usePathname()
    const Title = pathname === ROUTES.dashboard && 'Dashboard' || pathname === ROUTES.patients && 'Patients' || 
    pathname === ROUTES.appointment && 'Appointments' || pathname === ROUTES.earnings && 'Earnings & Transactions' || 
    pathname === ROUTES.report && 'Reports & Analytics' || pathname === ROUTES.support && 'Support' || 
    pathname === ROUTES.settings && 'Settings' || pathname === ROUTES.doctors && 'Doctors' || 
    pathname === ROUTES.branches && 'Branches'
  return (
    <div className='flex items-center justify-between bg-white shadow-sm  z-20 fixed top-0 left-2 right-0 pr-10 h-16 px-8 ml-[250px]'>
        <div className="flex items-center justify-between w-full">
            <p className='font-bold text-[20px] text-health-black font-libre'>{Title}</p>
            <div className='flex items-center space-x-4'>
                <div className='h-8 w-[1px] bg-slate-300 mr-5'/>
                <div className='relative cursor-pointer'>
                    <Bell size={22} className="text-gray-600 hover:text-gray-800" />
                    <span className='bg-red-800  text-white text-xs rounded-full absolute -top-1 -right-2 px-1.5 py-0.5 min-w-[18px] h-[18px] flex items-center justify-center'>4</span>
                </div>
                <div className="flex items-center gap-4 pl-3">
                    <div className='bg-red-100 rounded-full p-2 cursor-pointer hover:bg-red-200 transition-colors'>
                        <Image src={logo} alt="Logo" priority /> 
                    </div>
                    <div>
                        <p className='font-lato font-bold text-[14px]'>Ever Care General Hospital</p>
                        <p className='font-medium text-[12px] text-red-800 font-lato'>Admin</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Header