"use client"
import { Card, CardText, CardTitle } from '@/components/ui/Reusable'
import React, { useState } from 'react'
import { supportInfo } from '@/components/data'
import Conversation from './Coversation'
import SelectField from '@/components/Inputs/Select'
import image from '@/assets/Image.png'
import Image from 'next/image'

const SupportModal = () => {
  const { updateStatus, priority } = supportInfo

  const [selectState, setSelectState] = useState({
    status: '',
    priority: '',
    showStatus: false,
    showPriority: false,
  })

  const handleSelect = (field: 'status' | 'priority', option: string) => {
    setSelectState((prev) => ({
      ...prev,
      [field]: prev[field] === option ? '' : option,
      showStatus: field === 'status' ? false : prev.showStatus,
      showPriority: field === 'priority' ? false : prev.showPriority,
    }))
  }

  const toggleDropdown = (field: 'showStatus' | 'showPriority') => {
    setSelectState((prev) => ({
      ...prev,
      [field]: !prev[field],
    }))
  }

  return (
    <div>
      <Card>
        {/* Header */}
        <div className="flex items-center">
          <Image src={image} alt='Image' className="w-[80px] h-[80px] rounded-full" />
          <div className='ml-2'>
            <p className='font-libre font-medium text-[#211F1F] text-[20px]'>Uche Abiodun</p>
            <p className='text-[16px] font-lato font-medium pt-2 text-red-800 pb-1'>Patient</p>
            <CardText>2021-11-09</CardText>
          </div>
        </div>

        {/* Select fields */}
        <div className="flex items-center gap-4 my-5 mb-5">
          <SelectField
            {...updateStatus}
            value={selectState.status}
            show={selectState.showStatus}
            onSelect={(option) => handleSelect('status', option)}
            onClick={() => toggleDropdown('showStatus')}
            className='w-[200px]'
          />
          <SelectField
            {...priority}
            value={selectState.priority}
            show={selectState.showPriority}
            onSelect={(option) => handleSelect('priority', option)}
            onClick={() => toggleDropdown('showPriority')}
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
