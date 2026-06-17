import Input from '@/components/Inputs/Inputs';
// import { Branch } from '@/types/branch.schema';
import React, { useState } from 'react'
import { newBranch } from '@/components/data';
import Footer from '@/components/ui/Footer';
import { useFormModal } from '@/components/Modal/FormModal';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Hospital_Admin } from '@/lib/service/service';
import { ASSIGN_BRANCH } from '@/lib/interface/branch.interface';
import { AxiosError } from 'axios';

const SELECT_CLASS =
  'border border-gray-300 rounded-md py-2 focus:outline-none focus:ring-1  w-full text-sm'

const LABEL_CLASS = 'font-medium text-[12px] font-inter text-[#414651]'


const AssignBranch = () => {
    const {branchName,branchAddress, number, city} = newBranch;
    const { closeModal} = useFormModal()

    const [inputValue, setInputValue] = useState({
        branchId: "",
        doctorIds: "",
    });
    console.log(inputValue)
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setInputValue((prev) => ({
          ...prev,
          [name]: value
        }));
      };
    
    const isDisabled = Object.values(inputValue).some((v) => v === '')

    const { data, isLoading } = useQuery({
        queryKey: ['branch'],
        queryFn: () => Hospital_Admin.getBranch(),
    })
        console.log('DATA!!', data)

    const hospitalId = 1;
        const { data: doc, isLoading: docLoading, isError, error } = useQuery({
        queryKey: ['getAllDoctor', hospitalId],
        queryFn: () => Hospital_Admin.getAllDoctor(hospitalId),
        enabled: !!hospitalId
    });
    console.log(doc)
    const mutation = useMutation({
        mutationFn: (payload: ASSIGN_BRANCH) => Hospital_Admin.assignBranch(payload),
        onSuccess: (response: any) => {
            console.log('Doctor created successfully:', response)
            closeModal()
        },
        onError: (error: AxiosError<{ message: string }>) => {
          console.error('Error creating doctor:', error.response?.data?.message)
        },
    })

     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const data = {
            branchId: inputValue.branchId,
            doctorIds: inputValue.doctorIds,
        };
        console.log("DATA!!", data)
        await mutation.mutateAsync(data) 
    }
  return (
    <form className=" pt-5" onSubmit={handleSubmit}>
        <Input
            name="doctorIds"
            value={inputValue.doctorIds}
            onChange={handleChange}
            {...branchAddress}
        />
        <div className="block w-full mb-2">
            <label htmlFor="doctorIds" className={LABEL_CLASS}>
                Doctor
            </label>
            <select
                id="doctorIds"
                name="doctorIds"
                value={inputValue.doctorIds}
                onChange={handleChange}
                className={SELECT_CLASS}
                disabled={isLoading}
                >
                <option value="" className="text-sm">
                    {isLoading ? 'Loading doctors...' : 'Select a Doctor'}
                </option>

                {doc?.data && doc.data.map((doctor: any) => (
                    <option key={doctor.id} value={doctor.id} className="text-gray-900 bg-white">
                    {doctor.firstName} {" "} {doctor.lastName}
                    </option>
                ))}
            </select>
        </div>
        {/* <div className="block w-full mb-2">
            <label htmlFor="branchId" className={LABEL_CLASS}>
            Hospital
            </label>
            <select
            id="branchId"
            name="branchId"
            value={inputValue.branchId}
            onChange={handleChange}
            className={SELECT_CLASS}
            disabled={isLoading}
            >
            <option value="" className="text-sm">
                {isLoading ? 'Loading branches...' : 'Select a Branch'}
            </option>

            {hospitals && hospitals.data.map((hospital: any) => (
                <option key={hospital.id} value={hospital.id} className="text-gray-900 bg-white">
                {hospital.email}
                </option>
            ))}
            </select>
        </div> */}

        <Footer 
            cancelText='Cancel'
            text='Save'
            closeModal={closeModal}
            isLoading={mutation.isPending}
            disabled={isDisabled}
        />
    </form>
  )
}

export default AssignBranch