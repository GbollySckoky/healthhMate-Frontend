"use client"
import { FlexWrapper, PageWrapper, TableTitle } from '@/lib/components/ui/Reusable'
import React from 'react'
import { SupportTable } from './_components/SupportTable'



const Support = () => {
  return (
    <PageWrapper>
        <FlexWrapper>
            <div className="bg-white rounded-lg w-full border border-borderColor ">
                <TableTitle className='border-b border-borderColor100 p-4'>Ticket</TableTitle>
                <SupportTable />
            </div>
        </FlexWrapper>
    </PageWrapper>
  )
}

export default Support