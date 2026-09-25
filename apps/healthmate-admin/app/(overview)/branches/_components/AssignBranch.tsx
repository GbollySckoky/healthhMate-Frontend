import React, { useState } from 'react'
import Footer from '@/lib/components/ui/Footer';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Hospital_Admin } from '@/lib/service/service';
import { ASSIGN_BRANCH } from '@/lib/interface/branch.interface';
import { AxiosError } from 'axios';
import { useModal } from '@/components/Modal/Modal';
import { toast } from 'react-toastify';

const SELECT_CLASS =
  'border border-gray-300 rounded-md py-2 focus:outline-none focus:ring-1  w-full text-sm'

const LABEL_CLASS = 'font-medium text-[12px] font-inter text-[#414651]'

interface Branch {
  branchId: string;
  doctorIds: string[];
} 
const AssignBranch = () => {
    const { closeModal} = useModal()

    const [inputValue, setInputValue] = useState<Branch>({
        branchId: "",
        doctorIds: [],
    });

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setInputValue((prev) => ({
          ...prev,
          [name]: value
        }));
      };

    const handleChanges = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const {name, value } = e.target;
        setInputValue((prev) => ({
          ...prev,
          [name]: [...prev.doctorIds, value]
        }));
      };
    
    const isDisabled = Object.values(inputValue).some((v) => v === '')

    const { data, isLoading } = useQuery({
        queryKey: ['branch', inputValue],
        queryFn: () => Hospital_Admin.getBranch(),
    })

    const { data: doc, isLoading: docLoading } = useQuery({
        queryKey: ['getAllDoctor'],
        queryFn: () => Hospital_Admin.getAllDoctor(),
        // enabled: !!hospitalId
    });

    const mutation = useMutation({
        mutationFn: (payload: ASSIGN_BRANCH) => Hospital_Admin.assignBranch(payload),
        onSuccess: (response) => {
            toast.success( response.data.message)
            closeModal()
        },
        onError: (error: AxiosError<{ message: string }>) => {
          toast.error(error.response?.data?.message)
        },
    })

     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const data = {
            branchId: inputValue.branchId,
            doctorIds: inputValue.doctorIds,
        };
        mutation.mutate(data)

    }
  return (
    <form className=" " onSubmit={handleSubmit}>
        <div className="block w-full mb-2">
            <label htmlFor="branchId" className={LABEL_CLASS}>
                Branch
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

                {data && data.data.map((branch: { id: number; branchName: string }) => (
                    <option key={branch.id} value={branch.id} className="text-gray-900 bg-white">
                    {branch.branchName}
                    </option>
                ))}
            </select>
        </div>
        <div className="block w-full mb-2">
            <label htmlFor="doctorIds" className={LABEL_CLASS}>
                Doctor
            </label>
            <select
                id="doctorIds"
                name="doctorIds"
                value={inputValue.doctorIds}
                onChange={handleChanges}
                className={SELECT_CLASS}
                disabled={docLoading}
                >
                <option value="" className="text-sm">
                    {isLoading ? 'Loading doctors...' : 'Select a Doctor'}
                </option>

                {doc?.data && doc.data.map((doctor: { id: number; firstName: string; lastName: string }) => (
                    <option key={doctor.id} value={doctor.id} className="text-gray-900 bg-white">
                    {doctor.firstName} {" "} {doctor.lastName}
                    </option>
                ))}
            </select>
        </div>
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