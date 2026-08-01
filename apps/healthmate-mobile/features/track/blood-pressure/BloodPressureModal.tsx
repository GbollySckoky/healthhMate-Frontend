import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import CustomCalendar from '@/components/CustomCalendar';
import DateInput from '@/components/DateInput';
import NumberInput from '@/components/NumberInput';
import { BloodPressure } from '@/lib/interface/blood-pressure';
import { patientService } from '@/service/patientService';
import { bloodPressureData } from '@/constants/data';
import { useModal } from '@/store/Modal';
import { SubmitButton } from '@/components/Reusable';

type BloodPressureInputType = {
  date: string;
  systolic: string;
  diastolic: string;
};

type CalendarDay = {
  dateString: string;
};

const BloodPressureModal = () => {
  const { date, topNumber, lastNumber } = bloodPressureData;
  const { closeModal } = useModal();
  const queryClient = useQueryClient();
  const [inputValue, setInputValue] = useState<BloodPressureInputType>({
    date: new Date().toISOString(),
    systolic: '',
    diastolic: '',
  });
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  const handleChange = (key: keyof BloodPressureInputType, value: string) => {
    setInputValue((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleDateSelect = (day: CalendarDay) => {
    handleChange('date', day.dateString);
    setShowDatePicker(false);
  };

  const mutation = useMutation({
    mutationFn: (payload: BloodPressure) =>
      patientService.createBloodPressue(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['bloodPressure'] });
      closeModal();
    },
    onError: (error: any) => {
      console.log('Error!!', error);
    },
  });

  const handleCreatePressure = async () => {
    const payload: BloodPressure = {
      systolic: inputValue.systolic.trim(),
      diastolic: inputValue.diastolic.trim(),
      recordedAt: inputValue.date,
    };

    await mutation.mutateAsync(payload);
  };

  return (
    <div className="flex flex-col gap-4 py-2">
      <NumberInput
        {...topNumber}
        value={inputValue.systolic}
        onChangeText={(value) => handleChange('systolic', value)}
      />
      <NumberInput
        {...lastNumber}
        value={inputValue.diastolic}
        onChangeText={(value) => handleChange('diastolic', value)}
      />
      <DateInput
        {...date}
        value={
          inputValue.date ? new Date(inputValue.date).toLocaleDateString() : ''
        }
        _fn={() => setShowDatePicker(true)}
      />
      <CustomCalendar
        isOpen={showDatePicker}
        onChangeText={handleDateSelect}
        onClose={() => setShowDatePicker(false)}
      />
      <SubmitButton _fn={handleCreatePressure} disabled={mutation.isPending}>
        {mutation.isPending ? 'Saving...' : 'Save Reading'}
      </SubmitButton>
    </div>
  );
};

export default BloodPressureModal;