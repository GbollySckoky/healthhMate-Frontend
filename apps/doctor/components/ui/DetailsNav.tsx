"use client"
import React from 'react'
import { ChevronRight, ChevronLeft } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation';


const DetailsNav = ({text, detailsText,}: {text: string, detailsText: string}) => {
    const pathname = usePathname()
    const router = useRouter()

    const handlePreviousPage = () => {
        const pathSegments = pathname
          .split("/")
          .filter((segment) => segment !== "");
        pathSegments.pop();
        const previousPath =
          pathSegments.length > 0 ? `/${pathSegments.join("/")}` : "/";
        router.push(previousPath);
      };

  return (
    <div className="flex items-center space-x-1 border-b border-borderColor pb-3  text-[12px] text-[#717680]">
        <ChevronLeft size={15} className='cursor-pointer' onClick={() => handlePreviousPage()} />
        <p>{text}</p>
        <ChevronRight size={15} />
        <p className='text-red-800'>{detailsText}</p>
    </div>
  )
}

export default DetailsNav