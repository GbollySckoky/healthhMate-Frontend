import Input from '@/components/Inputs/Inputs';
import { Branch } from '@/types/branch.schema';
import React, { FormEvent, useState } from 'react'
import { newBranch } from '@/components/data';
import Footer from '@/components/ui/Footer';
import { useFormModal } from '@/components/Modal/FormModal';

const AddNewBranch = () => {
    const {branchName,branchAddress, number, city} = newBranch;
    const { closeModal} = useFormModal()
    const [inputValue, setInputValue] = useState<Branch>({
        branchName: "",
        branchAddress: "",
        phoneNumber: "",
        city: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputValue((prev) => ({
          ...prev,
          [name]: value
        }));
      };
    
    const handleSubmit = (e: FormEvent) =>{
        console.log(inputValue)
        e.preventDefault()
      }
  return (
    <form className=" pt-5" onSubmit={handleSubmit}>
        <Input
            name="brancName"
            value={inputValue.branchName}
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
        />
    </form>
  )
}

export default AddNewBranch