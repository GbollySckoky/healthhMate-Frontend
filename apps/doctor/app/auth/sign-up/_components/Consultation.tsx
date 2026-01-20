"use client"
import { useState, useEffect } from 'react'
import { STEP } from '@/lib/step'
import { ArrowLeft } from 'lucide-react'
import AuthNumber from '@/components/ui/AuthNumber'
import { useDoctorForm } from '@/lib/context/DoctorFormContext'

const Consultation = ({handleNextStep, handlePreviousStep, isEditing = false}: 
    {
        handleNextStep: (value: number) => void, 
        handlePreviousStep: () => void,
        isEditing?: boolean
    }) => {
    const {
        doctorFormData, 
        updateDoctorData, 
        updateAvailableDays, 
        updateAvailableTime,
        toggleAvailableDay,
        toggleAvailableTime
    } = useDoctorForm() 

    console.log(doctorFormData)
    
    const disabled = !doctorFormData.signup.fee 
    
    const availableDays = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
    const timeSlots = ['8:00am','9:00am','10:00am','11:00am','12:00pm','1:00pm','2:00pm','3:00pm','4:00pm','5:00pm']

    return(
        <div className='w-full max-w-md'>
            <div className="flex items-center space-x-2 mb-4">
                <span onClick={handlePreviousStep} className='cursor-pointer'>
                    <ArrowLeft size={15} />
                </span>
                <p className='text-[11px] font-normal text-[#535862]'>Back</p>
            </div>
            
            <h1 className='font-semibold text-2xl sm:text-2xl text-[#1B1818] mb-3 font-lato'>
              Consultation Setup
            </h1>
            
            <form className='space-y-4'>
                <AuthNumber
                    label='Consultation Fee'
                    placeholder='15,000'
                    value={doctorFormData.signup.fee ? String(doctorFormData.signup.fee) : ""}
                    name='fee'
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateDoctorData({fee: e.target.value})}
                />
                
                <div>
                    <p className='text-[#414651] font-inter font-medium text-[12px] mb-2'>
                        Consultation Types
                    </p>

                    <label 
                        className="flex items-center gap-2 cursor-pointer text-sm"
                    >
                        <input 
                            type="checkbox"
                            checked={doctorFormData.signup.inPerson ? Boolean(doctorFormData.signup.inPerson) : false}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateDoctorData({inPerson: e.target.checked})}
                            className="w-4 h-4 cursor-pointer"
                        />
                        In Person
                    </label>
                    <label 
                        className="flex items-center gap-2 cursor-pointer text-sm"
                    >
                        <input 
                            type="checkbox"
                            checked={doctorFormData.signup.audio ? Boolean(doctorFormData.signup.audio) : false}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateDoctorData({audio: e.target.checked})}
                            className="w-4 h-4 cursor-pointer"
                        />
                        Audio
                    </label>
                    <label  
                        className="flex items-center gap-2 cursor-pointer text-sm"
                    >
                        <input 
                            type="checkbox"
                            checked={doctorFormData.signup.video ? Boolean(doctorFormData.signup.video) : false}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateDoctorData({video: e.target.checked})}
                            className="w-4 h-4 cursor-pointer"
                        />
                        Video
                    </label>
                </div>
                
                <div>
                    <p className='text-[#414651] font-inter font-medium text-[12px] mb-2'>
                        Availability Days
                    </p>
                    <div className="flex gap-3">
                        {availableDays.map((day, index) => (
                            <p 
                                key={index}
                                onClick={() => toggleAvailableDay(day)}
                                className={`text-[14px] cursor-pointer rounded-lg p-2 w-fit font-normal transition-colors ${
                                    doctorFormData.availableDays.includes(day)
                                        ? 'bg-pink-600 text-white'
                                        : 'bg-red-50 text-grey-50'
                                }`}
                            >
                                {day}
                            </p>
                        ))}
                    </div>
                </div>
                
                <div className='pb-4'>
                    <p className='text-[#414651] font-inter font-medium text-[12px] mb-2'>
                        Time Slots
                    </p>
                    <div className="grid grid-cols-5 gap-3">
                        {timeSlots.map((slot, index) => (
                            <p 
                                key={index}
                                onClick={() => toggleAvailableTime(slot)}
                                className={`text-[14px] cursor-pointer rounded-lg p-2 w-fit font-normal transition-colors ${
                                    doctorFormData.availableTime.includes(slot)
                                        ? 'bg-pink-600 text-white'
                                        : 'bg-red-50 text-grey-50'
                                }`}
                            >
                                {slot}
                            </p>
                        ))}
                    </div>
                </div>

                <button 
                    type='button'
                    disabled={disabled}
                    onClick={() => handleNextStep(STEP.FOUR)}
                    className='w-full bg-pink-600 disabled:bg-[#F670C7] disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg transition-colors duration-200 mt-8 font-inter'
                >
                   Next
                </button>
                
                <p 
                    onClick={() => handleNextStep(STEP.FOUR)}
                    className='font-inter text-[14px] font-semibold text-center cursor-pointer mt-4 text-[#535862]'
                >
                    Skip for now
                </p>
            </form>
        </div>
    )
}

export default Consultation