"use client"
import { Card} from '@/lib/components/ui/Reusable'
import React, { useState } from 'react'
import SelectField from '@/lib/components/ui/SelectField'
import InputField from '@/lib/components/ui/InputField'
import TextArea from '@/lib/components/ui/TextArea'
import Footer from '@/lib/components/ui/Footer'
import { useFormModal } from '@/lib/components/modal/FormModal'

const SupportModal = () => {
  const {closeModal} = useFormModal()
  const [selectState, setSelectState] = useState({
    status: '',
    subject: '',
    priority: '',
    text: '',
    showStatus: false,
  })

  const handleSelect = (field: 'status' | 'priority', option: string) => {
    setSelectState((prev) => ({
      ...prev,
      [field]: prev[field] === option ? '' : option,
      showStatus: field === 'status' ? false : prev.showStatus,

    }))
  }

  const toggleDropdown = (field: 'showStatus') => {
    setSelectState((prev) => ({
      ...prev,
      [field]: !prev[field],
    }))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSelectState((prev) => ({
      ...prev,
      [name]: value
    }));
  };
 const paymentType = {
    paymentType:{
    title: 'Type',
    label: 'Payment',
    options: [
        'Payment',
        'In Progress',
        'Refunded'
    ]
}
}
  return (
    <form action="">
        <Card>
        <InputField 
            label='Subject'
            placeholder='Payout not recieved'
            value={selectState.subject}
            onChange={handleChange}
            name='subject'
            className='text-[14px]'
        />
        <SelectField
            {...paymentType.paymentType}
            value={selectState.status}
            show={selectState.showStatus}
            onSelect={(option) => handleSelect('status', option)}
            onClick={() => toggleDropdown('showStatus')}
            className='w-full mb-3 text-[14px]'
        />
        <TextArea 
            placeholder='Describe your issue'
            value={selectState.text}
            onChange={handleChange}
            name='text'
        />
        </Card>
        <Footer 
        cancelText='Cancel'
        text='Submit Ticket'
        closeModal={closeModal}/>
    </form>
  )
}

export default SupportModal
