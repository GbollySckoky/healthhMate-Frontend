'use client'
import { Infos, PageWrapper } from '@/components/ui/Reusable'
import React, { FormEvent, useState } from 'react'
import Image from 'next/image'
import image from '@/assets/Image.png'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Doctor } from '@/lib/constant/service'
import { useParams } from 'next/navigation'
import InputField from '@/components/ui/InputField'
import { useModal } from '@/components/modal/Modal'
import SelectField from '@/components/ui/SelectField'




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
  const appointmentData = data?.data
  console.log("appointmnt", appointmentData)
  const appointment = appointmentData?.find((appointment: any) => appointment.id === id)
  console.log(appointment)
  return (
    <PageWrapper>
      <div className='bg-white p-6 border border-borderColor rounded-lg mt-5'>
        <div className="flex justify-between">
            <div className="flex items-center">
              <Image src={image} alt='Image' className="w-[80px] h-[80px] rounded-full" />
              <div className='ml-2'>
                  <p className='font-medium font-libre text-[20px] text-[#211F1F]'>{appointment?.user?.firstName || "N/A"} {appointment?.user?.lastName || "N/A"}</p>
                  <p className='text-[14px] font-inter text-grey-20  py-1'>34 y/o  Female</p>
                  <p className='text-[14px] font-inter text-grey-20  py-1'>{appointment?.user?.email || "N/A"}</p>
              </div>
            </div>
            <p className='text-[#414651] bg-[#f5f5f5] font-medium font-inter text-[14px] rounded-full px-5 py-1 h-fit '>{"Upcoming"}</p>
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
        <button className='px-4 py-2 bg-red-800 rounded-lg font-inter text-white text-[14px]' 
        onClick={() =>
          openModal(<ApproveAppointment
            />, {
            title:
              'Approve Appointment',
            className: 'max-w-lg',
            onClose: () => {},
          })
        }>Approve Appointment</button>
      </div>

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

type FormState = {
  note?: string;
  approved?: boolean;
  status?: string;
};

type ApproveAppointmentVariables = {
  appointment_id: string;
  payload: {
    status: string;
    note: string;
    approved: boolean;
  };
};

// true should be approved and false should be decline

const ApproveAppointment = () => {
  const [inputValue, setInputValue] = useState<FormState>({});
  const [display, setDisplay] = useState({
    approved: false,
    status: false
  });
  const params = useParams()
  const appointment_id = params.slug as string
  const  {closeModal} = useModal()
  const handleDisplay = (key: keyof typeof display) => {
    setDisplay(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
  
  const updateInputValue = (
    key: keyof FormState,
    value: string | boolean
  ) => {
    setInputValue(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  const mutation = useMutation({
    mutationFn: ({appointment_id, payload }: ApproveAppointmentVariables) =>
      Doctor.approveAppointment(appointment_id, payload),
    onSuccess: (response) => {
      console.log("Approved successfully:", response);
      closeModal()
      // show toast
      // invalidate appointments query
    },
    onError: (error: any) => {
      console.error("Approval failed:", error?.response?.data || error);
    },
  });
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!appointment_id) return;
    
    const payload = {
      status: String(inputValue.status),
      note: String(inputValue.note),
      approved: Boolean(inputValue.approved),
    };
    
    mutation.mutate({
      appointment_id,
      payload,
    });
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <InputField
        placeholder="I will have a proper discussion with you"
        label="Consultation Note"
        value={inputValue.note ?? ""}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          updateInputValue("note", e.target.value)
        }
        name="note"
      />
      <SelectField
        label="Approved"
        title="Approved"
        options={["true", "false"]}
        value={String(inputValue.approved ?? "")}
        onClick={() => handleDisplay("approved")}
        onSelect={(value: string) => {
          updateInputValue("approved", value === "true")
          handleDisplay("approved") // Close dropdown after selection
        }}
        show={display.approved}
        className="mb-3"
      />
      <SelectField
        label="Status"
        title="Status"
        options={["waiting for approval", "false"]}
        value={String(inputValue.status ?? "")}
        onClick={() => handleDisplay("status")}
        onSelect={(value: string) => {
          updateInputValue("status", value)
          handleDisplay("status") // Close dropdown after selection
        }}
        show={display.status}
      />
      <div className="flex items-center justify-end mt-7">
        <button 
          className='px-5 py-1 bg-red-800 rounded-lg font-inter text-white text-[14px]' 
          type='submit' // Changed from 'button' to 'submit'
          disabled={mutation.isPending} // Added disabled state
        >
          {mutation.isPending ? "Submitting..." : 'Submit'} 
        </button>
      </div>
    </form>
  );
};
