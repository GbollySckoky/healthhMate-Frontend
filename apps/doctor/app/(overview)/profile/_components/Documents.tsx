"use client";

import { MediumTitle, TableTitle } from '@/lib/components/ui/Reusable'
import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { Doctor } from '@/lib/constant/service';

import { FileText } from 'lucide-react';



const Documents = () => {
    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ['doctor-documents'],
        queryFn: Doctor.getDocuments,
    });
    const result = data?.data ?? [];
    console.log(result)

  return (
    <div className="bg-white rounded-lg w-full border border-borderColor">
            {/* Header */}
        <div className='border-b border-borderColor100 p-4 flex items-center justify-between'>
            <TableTitle>Documents</TableTitle>
        </div>
        {isLoading ? (
            <p className="p-4 text-sm text-gray-500" role="status">Loading documents...</p>
        ) : isError ? (
            <div className="p-4" role="alert">
                <p>Unable to load documents.</p>
                <button type="button" onClick={() => refetch()} className="mt-2 underline">Try again</button>
            </div>
        ) : result.length === 0 ? (
            <p className="p-4 text-sm text-gray-500">No documents found.</p>
        ) : null}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 my-4 gap-4 p-4">
            {result?.document?.map((data: any, index: number) => {
                const {title, date, size} = data;
                return(
                    <div className="bg-[#FAFAFAFA] rounded-lg p-5 border border-borderColor " key={index}>
                        <div className="rounded-lg mb-3">
                            <FileText className="h-12 w-12 text-gray-400" />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <MediumTitle>{title || data.name || `Document ${index + 1}`}</MediumTitle>
                                <div className="flex space-x-2 items-center">
                                    <p className="font-lato text-[#98A2B3] font-normal text-[14px] ">{date}</p>
                                    {size && <p className='text-[#98A2B3] font-medium font-inter text-[14px]'>{size}</p>}
                                </div>
                            </div>

                        </div>
                    </div>

                )
            })}
        </div>
    </div>

  )
}

export default Documents