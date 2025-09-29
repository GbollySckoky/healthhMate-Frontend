import { Card } from '@/components/ui/Reusable'
import React, { useState } from 'react'
import { role } from '@/components/data'
import Input from '@/components/Inputs/Inputs';
import Checkbox from '@/components/Inputs/Checkbox';
import Footer from '@/components/ui/Footer';
import { useFormModal } from '@/components/Modal/FormModal';


const CreateRole = () => {
    const {roleName, permission} = role;
    const {closeModal} = useFormModal()
    const [inputValue, setInputValue] = useState({
        roleName: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputValue((prev) => ({
          ...prev,
          [name]: value,
        }));
    };

  return (
    <form action="">
        <Card>
            <Input
                name="roleName"
                value={inputValue.roleName}
                onChange={handleChange}
                {...roleName}
            />
            <Checkbox 
                {...permission}
            />
        </Card>
        <Footer 
           c
        />
    </form>

  )
}

export default CreateRole