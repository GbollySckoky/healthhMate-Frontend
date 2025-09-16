"use client"
import Input from '@/components/Inputs/Input'
import MinSelectField from '@/components/Inputs/MinSelectField'
import { Card, PageWrapper, TableTitle } from '@/components/reusable/Reusable'
import React, { useState } from 'react'
import { selectField } from '@/components/data'
import { SupportTable } from './SupportTable'
import {Search } from 'lucide-react'


const Support = () => {
    const [inputValue, setInputValue] = useState<string>('')
    const {allRoles, allStatus} = selectField;
    const [selectValue, setSelectValue] = useState('')
    const [displayValues, setDisplayValues] = useState(false)

    const handleDisplayValues = () => {
        setDisplayValues((prev) => !prev)
    }
    const handleClick = (option: string) => {
        setSelectValue((prev) => (prev === option ? '' : option ))
        handleDisplayValues()
        
    }
  return (
    <PageWrapper>
        <div className="bg-white rounded-lg w-full border border-borderColor ">
            <TableTitle className='border-b border-borderColor100 p-4'>Ticket</TableTitle>
            <div className="flex space-x-3 mt-4 px-4">
                <Input 
                    value={inputValue}
                    placeholder='Search by Name'
                    onChange={(e) => setInputValue(e.target.value)}
                    icon={<Search size={17} />}
                />
                <MinSelectField 
                    {...allStatus}
                    value={selectValue}
                    show={displayValues}
                    onSelect={handleClick}
                    onClick={handleDisplayValues}
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
                <SupportTable />
            </div>
        </div>
    </PageWrapper>
  )
}

export default Support