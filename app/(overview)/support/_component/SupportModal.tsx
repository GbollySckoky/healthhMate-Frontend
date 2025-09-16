"use client"
import { Card, CardText, CardTitle } from '@/components/reusable/Reusable'
import React, {useState} from 'react'
import { supportInfo } from '@/components/data'
import Conversation from './Coversation'
import SelectField from '@/components/Inputs/Select'
import image from '@/assets/Image.png'
import Image from 'next/image'

const SupportModal = () => {
    const {updateStatus, priority} = supportInfo
    const [displayValues, setDisplayValues] = useState(false)
    const [selectValue, setSelectValue] = useState('')
    const handleDisplayValues = () => {
        setDisplayValues((prev) => !prev)
    }

    const handleClick = (option: string) => {
        setSelectValue((prev) => (prev === option ? '' : option ))
        handleDisplayValues()
    }
    
  return (
    <div>
        {/* Header */}
        <Card>
            <div className="flex items-center">
                <Image src={image} alt='Image' width={70} height={50} />
                <div className='ml-2'>
                    <CardTitle>Gbolly Sckoky</CardTitle>
                    <p className='text-[16px] font-lato font-medium pt-2 text-red-800 pb-1'>Patient</p>
                    <CardText>2021-11-09</CardText>
                </div>
            </div>
            <div className="flex items-center gap-4 my-5 mb-5">
                <SelectField
                    {...updateStatus}
                    value={selectValue}
                    show={displayValues}
                    onSelect={handleClick}
                    onClick={handleDisplayValues}
                    className='w-[200px]'
                />
                 <SelectField
                    {...priority}
                    value={selectValue}
                    show={displayValues}
                    onSelect={handleClick}
                    onClick={handleDisplayValues}
                    className='w-[200px]'
                />
            </div>
            {/* Chat */}
            <Conversation />
        </Card>
    </div>
  )
}

export default SupportModal