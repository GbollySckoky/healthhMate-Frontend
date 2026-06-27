"use client"
import { Button, PageWrapper, TableTitle } from '@/components/ui/Reusable'
import React from 'react'
import { SupportTable } from './_components/SupportTable'
import { useFormModal } from '@/components/modal/FormModal'
import SupportModal from './_components/SupportModal'


const Support = () => {
    const {openModal} = useFormModal()
  return (
    <PageWrapper>
        <div className="bg-white rounded-lg w-full border border-borderColor ">
            <div className="flex items-center justify-between pr-4">
                <TableTitle className='border-b border-borderColor100 p-4'>Ticket</TableTitle>
                <Button onClick={() =>
                openModal(<SupportModal />, {
                title:
                    'Add New Admin',
                className: 'max-w-lg',
                onClose: () => {},
                // confirmDelete() {},
                })
            }>Add Ticket</Button>
            </div>
            

                <SupportTable />

        </div>
    </PageWrapper>
  )
}

export default Support