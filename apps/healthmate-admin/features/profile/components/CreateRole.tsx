import { Card } from '@/components/ui/Primitives'
import React, { useState } from 'react'
import { role } from '@/components/data'
import Input from '@/components/inputs/Inputs';
import Checkbox from '@/components/inputs/Checkbox';
import Footer from '@/components/ui/Footer';
import { useFormModal } from '@/components/modal/FormModal';


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
            closeModal={closeModal}
            cancelText="Cancel"
            text="Create Role"
        />
    </form>

  )
}

export default CreateRole