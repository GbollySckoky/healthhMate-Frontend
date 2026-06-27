"use client"
import MinSelectField from '@/components/Inputs/MinSelectField'
import { Button, PageWrapper, TableTitle } from '@/components/ui/Reusable'
import React, { useState } from 'react'
import {Search } from 'lucide-react'
import Input from '@/components/Inputs/Input'
import BranchTable from './BranchTable'
import useToggle from '@/hooks/useToggle'
import AddNewBranch from './AddNewBranch'
import { useFormModal } from '@/components/Modal/FormModal'
import AssignBranch from './AssignBranch'


const Branch = () => {
    const [inputValue, setInputValue] = useState<string>('')
    const {isToggle, handleToggle} = useToggle()
    const [selectValue, setSelectValue] = useState('')
    const {openModal} = useFormModal()
    const handleSelect = (option: string) => {
        setSelectValue((prev) => (prev === option ? '' : option ))
        handleToggle
    }

    const allStatus ={
        label: 'Status',
        options: [
            'Active',
            'In Active',
            'Open'
        ]
    }
    
  return (
    <PageWrapper>
        <div className="bg-white rounded-lg w-full border border-borderColor ">
            <div className="flex justify-between border-b border-borderColor100 p-4">
                <TableTitle >All Branches</TableTitle>
                <div className="flex items-center gap-3">
                    <Button onClick={() =>
                        openModal(<AddNewBranch />, {
                        title:
                            'Create Branch',
                        className: 'max-w-lg',
                        onClose: () => {},
                        // confirmDelete() {},
                        })
                    }>Add New Branch</Button>
                    <Button onClick={() =>
                        openModal(<AssignBranch />, {
                        title:
                            'Assign Branch To Doctor',
                        className: 'max-w-lg',
                        onClose: () => {},
                        // confirmDelete() {},
                        })
                    }>Assign Branch</Button>
                </div>
            </div>
            <div className="flex space-x-3 mt-4 px-4">
                <Input 
                    value={inputValue}
                    placeholder='Search by Name'
                    onChange={(e) => setInputValue(e.target.value)}
                    icon={<Search size={17} color="#C11574" />}
                />
                <MinSelectField 
                    {...allStatus}
                    value={selectValue}
                    show={isToggle}
                    onSelect={handleSelect}
                    onClick={handleToggle}
                    className='w-fit'
                />
                 {/* <MinSelectField 
                    {...allRoles}
                    value={selectValue}
                    show={displayValues}
                    onSelect={handleClick}
                    onClick={handleDisplayValues}
                /> */}
            </div>
            <div className="p-4">
                <BranchTable />
            </div>
        </div>
    </PageWrapper>
  )
}

export default Branch