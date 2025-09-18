import { Card } from '@/components/reusable/Reusable'
import React, { useState } from 'react'
import { role } from '@/components/data'
import Input from '@/components/Inputs/Inputs';
import Checkbox from '@/components/Inputs/Checkbox';


const CreateRole = () => {
    const {roleName, permission} = role;
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
    <Card>
        <form action="">
            <Input
                name="roleName"
                value={inputValue.roleName}
                onChange={handleChange}
                {...roleName}
            />
            <Checkbox 
                {...permission}
            />
        </form>
    </Card>
  )
}

export default CreateRole