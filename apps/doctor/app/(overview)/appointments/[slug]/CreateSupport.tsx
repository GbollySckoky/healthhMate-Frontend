import { ChangeEvent, useState } from 'react';
import Footer from '@/components/ui/Footer';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useModal } from '@/components/modal/Modal';
import { APPOINTMENT_DETAILS } from '@/lib/interface/appointment-details';
import { SUPPORT_TICKET } from '@/lib/interface/support';
import { Doctor } from '@/lib/constant/service';
import InputField from '@/components/ui/InputField';
import SelectField from '@/components/ui/SelectField';

type InputValue = {
  subject: string;
  description: string;
  category: string;
  message: string;
};

const priority = {
    title: 'Category',
    label: 'Category',
    options: [
        'ACCOUNT',
        'APPOINTMENT',
        'BILLING',
        'TECHNICAL',
        'MEDICAL',
        'OTHER'
    ]
}

const CreateSupport = ({ appointmentDetails }: { appointmentDetails: APPOINTMENT_DETAILS }) => {
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
      Doctor.createSupportTicket(payload),
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
      patientId: appointmentDetails.user.id,
      appointmentId: appointmentDetails.id,
      hospitalId: appointmentDetails.hospital.id,
      attachmentUrl: "https://example.com/attachments/report.pdf",
      attachmentName: "medical-report.pdf",
    };

   await mutation.mutateAsync(payload);
  };

  const isDisabled = Object.values(inputValue).some((v) => v === '');

  return (
    <form onSubmit={handleSubmit}>
      <InputField
        label="Subject"
        name="subject"
        placeholder="Felt Disappointed"
        value={inputValue.subject}
        onChange={handleChange}
      />

      <InputField
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
        onSelect={(option: string) => handleSelect('category', option)}
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