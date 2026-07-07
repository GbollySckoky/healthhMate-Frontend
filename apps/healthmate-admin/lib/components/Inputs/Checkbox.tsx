import React from 'react'

const Checkbox = ({options, label}:{options: string[], label: string}) => {
  return (
    <div>
        <p className='font-medium text-[14px] font-inter text-[#414651]'>{label}</p>
        
        {options.map((option, index) => (
            <div className='flex items-center my-2' key={index}>
                <input type="checkbox" />
                <p className='font-normal text-[16px] text-[#414651] font-libre ml-2'>{option}</p>
            </div>
        ))}
    </div>
  )
}

export default Checkbox