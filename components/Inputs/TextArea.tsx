import React from 'react'

interface TextAreaProps{
    placeholder: string;
    value: string;
    onChange: (e: any) => void
}
const TextArea = ({placeholder,value, onChange}: TextAreaProps) => {
  return (
    <textarea 
        name="" 
        id="" 
        placeholder={placeholder} 
        value={value} 
        onChange={onChange} 
        rows={5} 
        className='w-full outline-none border border-borderColor100 font-normal text-[16px] rounded-lg p-3'
    />
  )
}

export default TextArea