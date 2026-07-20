// @/components/CreateSupport.tsx

import SelectField from '@/components/Inputs/Select'
import { supportInfo } from '@/components/data'
import Input from '@/lib/components/Inputs/Inputs';
import { ChangeEvent, useState } from 'react';
import Footer from '@/components/ui/Footer';
import { useModal } from '@/components/Modal/Modal';
import { useMutation } from '@tanstack/react-query';
import { Hospital_Admin } from '@/lib/service/service';
import { AxiosError } from 'axios';
import { SUPPORT_TICKET } from '@/lib/interface/supportTicket';
import { APPOINTMENT_DETAILS } from '@/lib/interface/appointment';

type InputValue = {
  subject: string;
  description: string;
  category: string;
  message: string;
};

const CreateSupport = ({ appointment }: { appointment: APPOINTMENT_DETAILS }) => {
  const { priority } = supportInfo;
  const [open, setOpen] = useState(false);
  const { closeModal } = useModal();

  const [inputValue, setInputValue] = useState<InputValue>({
    subject: '',
    description: '',
    category: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelect = (key: keyof InputValue, option: string) => {
    setInputValue((prev) => ({
      ...prev,
      [key]: prev[key] === option ? '' : option,
    }));
  };

  const mutation = useMutation({
    mutationFn: (payload: SUPPORT_TICKET) =>
      Hospital_Admin.createSupportTicket(payload),
    onSuccess: (response) => {
      console.log('Support ticket created successfully:', response);
      closeModal();
    },
    onError: (error: AxiosError<{ message: string }>) => {
      console.error('Error creating support ticket:', error.response?.data?.message);
    },
  });

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();

    const payload: SUPPORT_TICKET = {
      subject: inputValue.subject,
      category: inputValue.category,
      description: inputValue.description,
      message: "Hello",
      patientId: appointment.user.id,
      appointmentId: appointment.id,
      doctorId: appointment.doctor.id,
      attachmentUrl: "https://example.com/attachments/report.pdf",
      attachmentName: "medical-report.pdf",
    };

   await mutation.mutateAsync(payload);
  };

  const isDisabled = Object.values(inputValue).some((v) => v === '');

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Subject"
        name="subject"
        placeholder="Felt Disappointed"
        value={inputValue.subject}
        onChange={handleChange}
      />

      <Input
        label="Description"
        name="description"
        placeholder=""
        className=""
        value={inputValue.description}
        onChange={handleChange}
      />

      <div>
        <label htmlFor="message">Message</label>
        <textarea
          name="message"
          id="message"
          className="w-full focus:outline-none border border-border p-2 rounded-lg"
          rows={5}
          value={inputValue.message}
          onChange={handleChange}
        />
      </div>

      <SelectField
        {...priority}
        value={inputValue.category}
        show={open}
        onSelect={(option) => handleSelect('category', option)}
        onClick={() => setOpen((prev) => !prev)}
        className="w-full"
      />

      <Footer
        cancelText="Cancel"
        text="Save"
        closeModal={closeModal}
        isLoading={mutation.isPending}
        disabled={isDisabled}
      />
    </form>
  );
};

export default CreateSupport;