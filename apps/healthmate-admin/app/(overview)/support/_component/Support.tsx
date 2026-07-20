"use client"
import Input from '@/components/Inputs/Input'
import MinSelectField from '@/components/Inputs/MinSelectField'
import { PageWrapper, TableTitle } from '@/components/ui/Reusable'
import React, { useState } from 'react'
import { selectField } from '@/components/data'
import { SupportTable } from './SupportTable'
import {Search } from 'lucide-react'
import useToggle from '@/hooks/useToggle'
import { FlexWrapper } from '@/lib/components/ui/Reusable'


const Support = () => {
    const [inputValue, setInputValue] = useState<string>('')
    const {allRoles, allStatus} = selectField;
    const [selectValue, setSelectValue] = useState('')
    const {isToggle, handleToggle} = useToggle()

 
    const handleSelect = (option: string) => {
        setSelectValue((prev) => (prev === option ? '' : option ))
        handleToggle()
    }
  return (
    <PageWrapper>
        <FlexWrapper>
            <div className="bg-white rounded-lg w-full border border-borderColor ">
                <TableTitle className='border-b border-borderColor100 p-4'>Ticket</TableTitle>
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
                    <SupportTable />
                </div>
            </div>
        </FlexWrapper>
    </PageWrapper>
  )
}

export default Support