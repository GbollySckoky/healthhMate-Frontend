import React from 'react'

const Calendar = () => {
  return (
    <div>
        <div className="flex items-center border border-borderColor100 rounded-lg p-2 cursor-pointer">
            <p className='font-semibold font-inter text-[14px]'>Date Range</p>
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" 
            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" 
            stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-calendar-icon lucide-calendar ml-3"><path d="M8 2v4"/><path 
            d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
        </div>
    </div>
  )
}

export default Calendar