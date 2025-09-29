import React from 'react'

const Calendar = () => {
  return (
    <div>
        <div className="flex items-center border border-borderColor100 rounded-lg px-[6px] py-[6px] cursor-pointer">
            <p className='font-medium text-[#414651] font-inter text-[14px]'>Date Range</p>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" 
            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" 
            strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar-icon lucide-calendar ml-3 text-[#414651]"><path d="M8 2v4"/><path 
            d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
        </div>
    </div>
  )
}

export default Calendar