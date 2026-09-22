import React, { useState } from 'react';
// import Input from '@/components/Input/Input';
import { SubmitButton } from '@/components/Reusable';
import { Medication } from '@/lib/interface/medication';
import { patientService } from '@/service/patientService';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import NumberInput from '@/components/NumberInput';
import { useModal } from '@/store/Modal';
import { MedicationData } from '@/constants/data';
import DateInput from '@/components/DateInput';
import CustomCalendar from '@/components/CustomCalendar';
import Input from '@/components/Input';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

type MedicationInputType = Record<string, string>;
const date = {
  label: 'Date',
  placeholder: '10/05/1997',
}

// { label: 'YES', value: true}
const MedicationModal = () => {
  const [inputValue, setInputValue] = useState<MedicationInputType>({});
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { closeModal } = useModal();
  const { name, dosage } = MedicationData;
  const queryClient = useQueryClient();
  const handleChange = (key: string, value: string) => {
    setInputValue((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleDateSelect = (day: any) => {
    const selectedDate = day.dateString; // This will be in YYYY-MM-DD format
    handleChange('date', selectedDate);
    setShowDatePicker(false); // Close calendar after selection
  };

  const handleCloseCalendar = () => {
    setShowDatePicker(false);
  };

   const mutation = useMutation({
      mutationFn: (payload: Medication) => patientService.createMedication(payload),
      onSuccess: async (response) => {
        toast.success(response.data.message)
       await queryClient.invalidateQueries({ queryKey: ['getmedication'] });
        closeModal();
      },
      onError: (error: AxiosError<{message: string | undefined}>) => {
        toast.error(error.response?.data.message || 'Failed to save medication reading');
        // Toast.show({
        //   type: 'error',
        //   text1: error.response.data.message,
        // });
      },
    })
  
    const handleCreateMedication = async () => {
      const data ={
        name: inputValue.name,
        dosage: inputValue.dosage,
        recordedAt: inputValue.date,
        // time: inputValue.time,
      }
      console.log("PAYLOAD:", data);
      await mutation.mutateAsync(data)
    }

  return (
    <div>
      <Input
        {...name}
        value={inputValue.name || ''} // Safe fallback
        onChangeText={(value) => handleChange('name', value)}
      />
      <NumberInput
        {...dosage}
        value={inputValue.dosage || ''} // Safe fallback
        onChangeText={(value) => handleChange('dosage', value)}
      />
       <DateInput
          {...date}
          value={
            inputValue.date ? inputValue.date.slice(0, 10) : ''
          } // Show formatted date safely
          _fn={() => setShowDatePicker(true)} // Open calendar directly
        />

        <CustomCalendar
          isOpen={showDatePicker}
          onChangeText={handleDateSelect}
          onClose={handleCloseCalendar}
        />
      <SubmitButton
        _fn={handleCreateMedication}
        disabled={
          mutation.isPending ||
          !inputValue.name?.trim() ||
          !inputValue.dosage?.trim() ||
          !inputValue.date
        }
      >
        {mutation.isPending ? "Saving..." : "Save Medication Log"}
      </SubmitButton>
    </div>
  );
};

export default MedicationModal;

