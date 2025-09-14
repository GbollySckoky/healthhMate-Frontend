'use client'
import React, { useState } from 'react'
import { sideBarData } from './data'
import Link from 'next/link'
import image from '../../assets/Group 19156.png'
import Image from 'next/image'
import { LogOut } from 'lucide-react';



const SideBar = () => {
    const [activeUrl, setActiveUrl] = useState<string>('');

    const handleActiveUrl = (url: string) => setActiveUrl(url)
    
    return (
        <div className="bg-red-900 lg:w-[260px] w-64 h-screen overflow-y-auto text-white z-30 fixed ">
            <div className="mx-2">
                <div className="flex items-center mt-3">
                    <Image src={image} alt="Logo" width={"120"} className='h-fit' priority/>
                </div>
                <div className="flex flex-col justify-between h-[75vh] mt-3">
                    {/* 0,7 */}
                    <div>
                        {sideBarData.slice(0,7).map((sidebar) => {
                            const { id, icon, text, url } = sidebar;
                            return (
                                <div key={id}>
                                    <Link
                                        href={url}
                                        className={`flex items-center gap-3 no-underline ${activeUrl === url ? "bg-red-100 font-medium text-grey-900 rounded-lg mb-3 " : "text-white"} p-4 hover:bg-red-100 hover:text-grey-900 rounded-lg transition-colors duration-200 cursor-pointer`}
                                        onClick={() => handleActiveUrl(url)}
                                    >
                                        <span className="flex-shrink-0">{icon}</span>
                                        <p className='font-normal text-[14px] font-sans'>{text}</p>
                                    </Link>
                                </div>
                            )
                        })}
                    </div>
                    {/* 7, .... */}
                    <div>
                        {sideBarData.slice(7,9).map((sidebar) => {
                            const { id, icon, text, url } = sidebar;
                            return (
                                <div key={id}>
                                    <Link
                                        href={url}
                                        className={`flex items-center gap-3 no-underline ${activeUrl === url ? "bg-red-100 font-medium text-grey-900 rounded-lg mb-3 " : "text-white"} p-4 hover:bg-red-100 hover:text-grey-900 rounded-lg transition-colors duration-200 cursor-pointer`}
                                        onClick={() => handleActiveUrl(url)}
                                    >
                                        <span className="flex-shrink-0">{icon}</span>
                                        <p className='font-normal text-[14px] font-sans'>{text}</p>
                                    </Link>
                                </div>
                            )
                        })}
                    </div>   
                </div>
               {/* admin */}
               <div className="flex items-center justify-between mt-4 p-2">
                    <div>
                        <p className='font-sans font-semibold text-[14px]'>Admin</p>
                        <p className='font-inter text-[14px] font-normal'>admin@evercare.com</p>
                    </div>
                    <span className='cursor-pointer'> <LogOut size={18}/> </span>
                </div>
            </div>
        </div>
    )
}

export default SideBar