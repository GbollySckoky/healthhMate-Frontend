"use client"
import MinSelectField from '@/components/inputs/MinSelectField'
import { Button, PageWrapper, TableTitle } from '@/components/ui/Primitives'
import React, { useState } from 'react'
import {Search } from 'lucide-react'
import Input from '@/components/inputs/Input'
import useToggle from '@/lib/hooks/useToggle'
import AddNewBranch from '@/features/branches/components/AddNewBranch'
import { useFormModal } from '@/components/modal/FormModal'
import DoctorTable from '@/features/branches/[slug]/components/DoctorTable'


const Doctor = () => {
    const [inputValue, setInputValue] = useState<string>('')
    const {isToggle, handleToggle} = useToggle()
    const [selectValue, setSelectValue] = useState('')
    const {openModal} = useFormModal()
    const handleSelect = (option: string) => {
        setSelectValue((prev) => (prev === option ? '' : option ))
        handleToggle
    }

    const data = {
        specialty:{
            label: 'All Specialty',
            options: [
                'Active',
                'In Active',
                'Open'
            ]
        },
        availability:{
            label: 'Availability',
            options: [
                'Active',
                'In Active',
                'Open'
            ]
        }
    }
    const {specialty,availability } = data
  return (
    <div className="bg-white rounded-lg w-full border border-borderColor ">
        <div className="flex items-center justify-between border-b border-borderColor100 p-4">
            <TableTitle >Doctors</TableTitle>
            <Button onClick={() =>
                openModal(<AddNewBranch />, {
                title:
                    'Add New Admin',
                className: 'max-w-lg',
                onClose: () => {},
                // confirmDelete() {},
                })
            }>Add Doctor</Button>
        </div>
        <div className="flex space-x-3 mt-4 px-4">
            <Input 
                value={inputValue}
                placeholder='Search by Name'
                onChange={(e) => setInputValue(e.target.value)}
                icon={<Search size={17} color="#C11574" />}
            />
            <MinSelectField 
                {...specialty}
                value={selectValue}
                show={isToggle}
                onSelect={handleSelect}
                onClick={handleToggle}
                className='w-fit'
            />
            <MinSelectField 
                {...availability}
                value={selectValue}
                show={isToggle}
                onSelect={handleSelect}
                onClick={handleToggle}
                className='w-fit'
            />
        </div>
        <div className="p-4">
            <DoctorTable />
        </div>
    </div>
  )
}

export default Doctor