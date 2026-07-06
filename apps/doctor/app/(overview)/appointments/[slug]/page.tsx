'use client'
import { FlexWrapper, Infos, PageWrapper } from '@/components/ui/Reusable'
import React, { FormEvent, useState } from 'react'
import Image from 'next/image'
import image from '@/assets/Image.png'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Doctor } from '@/lib/constant/service'
import { useParams } from 'next/navigation'
import InputField from '@/components/ui/InputField'
import { useModal } from '@/components/modal/Modal'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { AxiosError } from 'axios'
import { AppointmentDetails } from '@/lib/interface/appointment-details'
import { STATUS } from '@/types/status'




const Page = () => {
  const {openModal} = useModal()
  const params = useParams();
  console.log(params.slug)
  const id = Number(params.slug);
  console.log(id)
  const {data, isLoading, error, isError} = useQuery({
    queryKey: ['getAppointment'],
    queryFn: () => Doctor.getAppointment()
  })
  const appointmentData = data?.data ?? []
  console.log("appointmnt", appointmentData)
  const appointment = appointmentData?.find((appointment: AppointmentDetails) => appointment.id === id)
  console.log(appointment)

  if(isLoading){
    return(
      <div className="flex items-center justify-center py-8 min-h-screen"> 
        <LoadingSpinner />
      </div>
    )
  }

  if(isError){
    <div className="text-center py-20 text-gray-500 flex items-center justify-center min-h-screen">
      {error.message}
    </div>
  }
 
  return (
    <PageWrapper>
      <FlexWrapper>
      <div className='bg-white p-6 border border-borderColor rounded-lg mt-5'>
        <div className="flex justify-between">
            <div className="flex items-center">
              <Image src={image} alt='Image' className="w-[80px] h-[80px] rounded-full" />
              <div className='ml-2'>
                  <p className='font-medium font-libre text-[20px] text-[#211F1F]'>{appointment?.user?.firstName || "N/A"} {appointment?.user?.lastName}</p>
                  <p className='text-[14px] font-inter text-grey-20  py-1'>34 y/o  Female</p>
                  <p className='text-[14px] font-inter text-grey-20  py-1'>{appointment?.user?.email || "N/A"}</p>
              </div>
            </div>
            <p className='text-[#414651] bg-[#f5f5f5] font-medium font-inter text-[14px] rounded-full px-5 py-1 h-fit '>{appointment.status || "N/A"}</p>
        </div>
      </div>
      {/* Type */}
      <div className='mt-5 border border-borderColor p-4 rounded-lg'>
          <Infos label='Type' value={appointment?.consultationType}/>
          <Infos label='Date' value={appointment?.date}/>
          <Infos label='Time:' value={appointment?.time}/>
      </div>
      <Info label='Health Concern' value={appointment?.healthConcern} />
      {/* <Info label='Consultation Notes' value='Possible Pelvic inflammation. Perform a Abdomino-Pelvic scan to check for any infection,' />
      <Info label='Prescription' value='None' /> */}
      <div className="flex justify-between items-center mt-7">
       {appointment.status === STATUS.PENDING && (
          <button className='px-4 py-2 bg-red-800 rounded-lg font-inter text-white text-[14px]' 
            onClick={() =>
            openModal(<ApproveAppointment 
            appointment={appointment}
            />, {
            title:
              'Approve Appointment',
            className: 'max-w-lg',
            onClose: () => {},
          })
        }>Update Appointment Status
        </button>
       )} 
      </div>
      </FlexWrapper>
    </PageWrapper>
  )
}

export default Page

const Info = ({label, value}:{label:string, value: string}) => {
  return(
      <div className='flex flex-col space-y-1 border border-borderColor rounded-lg p-3 mt-5'>
          <p className='text-[#535862] text-[16px] font-lato font-normal'>{label}</p>
          <p className='font-lato text-[16px] font-medium text-[#181D27]'>{value}</p>
      </div>
  )
}

type ApprovePayload = {
  appointment_id: number;
  payload: {
    note: string;
    status: string
  };
};

const ApproveAppointment = ({appointment}:{appointment: AppointmentDetails}) => {
  const [inputValue, setInputValue] = useState("");
  const params = useParams()
  const appointment_id = Number(params.slug) 
  const  {closeModal} = useModal()

  const mutation = useMutation({
    mutationFn: ({ appointment_id, payload }: ApprovePayload) =>
      Doctor.approveAppointment(appointment_id, payload),
    onSuccess: (response) => {
      console.log("Approved successfully:", response);
      closeModal()
    },
    onError: (error: AxiosError) => {
      console.error("Approval failed:", error?.response?.data || error);
    },
  });
  
  const rejectMutation = useMutation({
    mutationFn: ({ appointment_id, payload }: ApprovePayload) =>
      Doctor.rejectAppointment(appointment_id, payload),
    onSuccess: (response) => {
      console.log("Approved successfully:", response);
      closeModal()
    },
    onError: (error: AxiosError) => {
      console.error("Approval failed:", error?.response?.data || error);
    },
  });


  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!appointment_id) return;
    
    const payload = {
      note: String(inputValue),
      status: appointment.status
    };
    
    mutation.mutate({
      appointment_id,
      payload,
    });
  };

  const handleSubmitRejection = (e: FormEvent) => {
    e.preventDefault();
    if (!appointment_id) return;
    
    const payload = {
      note: String(inputValue),
      status: appointment.status
    };
    
    rejectMutation.mutate({
      appointment_id,
      payload,
    });
  };

  const isDisabled = inputValue === ''
  const isApproving = mutation.isPending;
  const isRejecting = rejectMutation.isPending;
  return (
    <div>
      <InputField
        placeholder="I will have a proper discussion with you"
        label="Consultation Note"
        value={inputValue ?? ""}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setInputValue( e.target.value)
        }
        name="note"
      />
  {/* ${isLoading || disabled ? 'bg-pink-300 cursor-not-allowed' : 'bg-pink-600'} */}
     <div className="flex items-center justify-between mt-7">
      {!isApproving && (
        <button
          className={`px-5 py-2 rounded-lg font-inter text-white text-[14px] ${
            isDisabled || isApproving
              ? "bg-pink-300 cursor-not-allowed"
              : "bg-red-800"
          }`}
          onClick={handleSubmitRejection}
          disabled={isDisabled}
        >
          {isRejecting ? "Rejecting..." : "Reject Appointment"}
        </button>
      )}

      {!isRejecting && (
        <button
          className={`px-5 py-2 rounded-lg font-inter text-white text-[14px] ${
            isDisabled || isRejecting
              ? "bg-pink-300 cursor-not-allowed"
              : "bg-red-800"
          }`}
          onClick={handleSubmit}
          disabled={isDisabled}
        >
          {isApproving ? "Approving..." : "Approve Appointment"}
        </button>
      )}
    </div>
    </div>
  );
};
