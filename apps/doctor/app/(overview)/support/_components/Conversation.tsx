import { Card, CardText } from '@/components/ui/Reusable'
import React, { useState } from 'react'
import { CheckCheck } from 'lucide-react';
import Input from '@/components/ui/Input';
import { Send } from 'lucide-react';
import Footer from '@/components/ui/Footer';
import { useFormModal } from '@/components/modal/FormModal';

const Coversation = () => {
    const [inputValue, setInputValue] = useState("")
    const {closeModal} = useFormModal()
    
  return (
    <Card>
        <p className='text-[18px] font-semibold font-libre text-grey-30 mb-2'>Conversation</p>
        {/* In message */}
        <div className='bg-red-50 w-fit p-3 rounded-lg my-3'>
            <CardText className='text-grey-50'>Patient: Hello, I can't start the video call</CardText>
            <div className="flex items-center justify-end">
                <p className='font-extralight text-[12px] font-libre text-[#717680] text-end mt-1'>12:10 pm</p>
                <span className='text-green-900 ml-1'> <CheckCheck size={14} /></span>
            </div>
        </div>
        {/* Out message */}
        <div className="flex justify-end my-3 mb-7">
            <div className='bg-red-900 w-[300px] p-3 rounded-lg justify-end'>
                <CardText className='text-white'>
                    Admin: Hello Janet, please ensure you enabled camera & mic permission on your device
                </CardText>
                <div className="flex items-center justify-end">
                    <p className='font-extralight text-[12px] font-libre text-white text-end mt-1'>12:10 pm</p>
                    <span className='text-green-900 ml-1'> <CheckCheck size={14} /></span>
                </div>
            </div>
        </div>
        <Input 
            placeholder='Reply admin'
            value={inputValue}
            className='w-full mt-3 '
            onChange={(e) => setInputValue(e.target.value)}
            icon={<Send size={18} />}
        />
        <Footer  closeModal={closeModal} cancelText='Cancel' text='Reply'/>
    </Card>
  )
}

export default Coversation