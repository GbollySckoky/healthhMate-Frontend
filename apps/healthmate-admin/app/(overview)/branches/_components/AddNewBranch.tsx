import Input from '@/components/Inputs/Inputs';
import { Branch } from '@/types/branch.schema';
import React, { useState } from 'react'
import { newBranch } from '@/components/data';
import Footer from '@/components/ui/Footer';
// import { useFormModal } from '@/components/Modal/FormModal';
import { useMutation } from '@tanstack/react-query';
import { Hospital_Admin } from '@/lib/service/service';
import { BRANCH_INTERFACE } from '@/lib/interface/branch.interface';
import { AxiosError } from 'axios';
import { useModal } from '@/components/Modal/Modal';

const AddNewBranch = () => {
    const {branchName,branchAddress, number, city} = newBranch;
    const { closeModal} = useModal()

    const [inputValue, setInputValue] = useState<Branch>({
        branchName: "",
        branchAddress: "",
        phoneNumber: "",
        city: "",
    });
    console.log(inputValue)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputValue((prev) => ({
          ...prev,
          [name]: value
        }));
      };
    
      const isDisabled = Object.values(inputValue).some((v) => v === '')

    const mutation = useMutation({
        mutationFn: (payload: BRANCH_INTERFACE) => Hospital_Admin.createBranch(payload),
        onSuccess: (response) => {
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
            branchAddress: String(inputValue.branchAddress),
            branchName: inputValue.branchName,
            state: inputValue.city,
            phoneNumber: inputValue.phoneNumber,
        };
        console.log("DATA!!", data)
        await mutation.mutateAsync(data)
    }
  return (
    <form className=" pt-5" onSubmit={handleSubmit}>
        <Input
            name="branchName"
            value={String(inputValue.branchName)}
            onChange={handleChange}
            {...branchName}
        />
        <Input
            name="branchAddress"
            value={inputValue.branchAddress}
            onChange={handleChange}
            {...branchAddress}
        />
        <Input
            name="phoneNumber"
            value={inputValue.phoneNumber}
            onChange={handleChange}
            {...number}
        />
        <Input
            name="city"
            value={inputValue.city}
            onChange={handleChange}
            {...city}
        />
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

export default AddNewBranch