import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import CustomCalendar from '@/components/CustomCalendar';
import DateInput from '@/components/DateInput';
import NumberInput from '@/components/NumberInput';
import { SubmitButton } from '@/components/Reusable';
import { bloodSugarData } from '@/constants/data';
import { BLOOD_SUGAR } from '@/lib/interface/blood_sugar';
import { patientService } from '@/service/patientService';
import { useModal } from '@/store/Modal';
import { MEAL_TYPE_OPTIONS, SELECT_CLASS, SUGAR_TIMING_OPTIONS, UNIT_OPTIONS } from '@/constants/selectOptions';

type BloodSugarInputType = {
  measuredAt: string;
  value: string;
  unit: string;
  timing: string;
  meal: string;
  notes: string;
};

type CalendarDay = {
  dateString: string;
};

const BloodSugarModal = () => {
  const { date, unit, timing, value, notes, meal } = bloodSugarData;
  const { closeModal } = useModal();
  const queryClient = useQueryClient();

  const [inputValue, setInputValue] = useState<BloodSugarInputType>({
    measuredAt: new Date().toISOString(),
    value: '',
    unit: '',
    timing: '',
    meal: '',
    notes: '',
  });
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  const handleChange = (key: keyof BloodSugarInputType, newValue: string) => {
    setInputValue((prev) => ({
      ...prev,
      [key]: newValue,
    }));
  };

  const handleDateSelect = (day: CalendarDay) => {
    handleChange('measuredAt', day.dateString);
    setShowDatePicker(false);
  };

  const mutation = useMutation({
    mutationFn: (payload: BLOOD_SUGAR) => patientService.createBloodSugar(payload),
    onSuccess: async (response) => {
      toast.success(response.data?.message || 'Blood sugar reading saved successfully');
      await queryClient.invalidateQueries({ queryKey: ['bloodSugar'] });
      closeModal();
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message || 'Failed to save blood sugar reading');
    },
  });

  const handleCreateBloodSugar = async () => {
    const payload: BLOOD_SUGAR = {
      value: Number(inputValue.value),
      unit: inputValue.unit.trim() || 'mmol/L',
      timing: inputValue.timing.trim(),
      meal: inputValue.meal.trim(),
      notes: inputValue.notes.trim(),
      measuredAt: inputValue.measuredAt,
    };

    await mutation.mutateAsync(payload);
  };

  return (
    <div className="flex flex-col gap-1">
      <NumberInput
        {...value}
        value={inputValue.value}
        onChangeText={(newValue) => handleChange('value', newValue)}
      />
     <div className="py-[7px]">
      <p className="font-medium text-sm pb-1.5 text-[#414651]">{unit.label}</p>
        <select
          id="unit"
          name="unit"
          value={inputValue.unit}
            onChange={(event) => handleChange('unit', event.target.value)}
          className={`${SELECT_CLASS} bg-white text-gray-900 px-3`}>
          {UNIT_OPTIONS.map(({ value, label }) => (
            <option key={value} value={value} disabled={value === ''}>
              {label}
            </option>
          ))}
        </select>
      </div>
      <div className="py-[7px]">
      <p className="font-medium text-sm pb-1.5 text-[#414651]">{timing.label}</p>
        <select
          id="timing"
          name="timing"
          value={inputValue.timing}
            onChange={(event) => handleChange('timing', event.target.value)}
          className={`${SELECT_CLASS} bg-white text-gray-900 px-3`}>
          {SUGAR_TIMING_OPTIONS.map(({ value, label }) => (
            <option key={value} value={value} disabled={value === ''}>
              {label}
            </option>
          ))}
        </select>
      </div>
      <div className="py-[7px]">
        <p className="font-medium text-sm pb-1.5 text-[#414651]">{meal.label}</p>
        <select
          id="meal"
          name="meal"
          value={inputValue.meal}
            onChange={(event) => handleChange('meal', event.target.value)}
          className={`${SELECT_CLASS} bg-white text-gray-900 px-3`}>
          {MEAL_TYPE_OPTIONS.map(({ value, label }) => (
            <option key={value} value={value} disabled={value === ''}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <DateInput
        {...date}
        value={inputValue.measuredAt ? inputValue.measuredAt.slice(0, 10) : ''}
        _fn={() => setShowDatePicker(true)}
      />

      <CustomCalendar
        isOpen={showDatePicker}
        onChangeText={handleDateSelect}
        onClose={() => setShowDatePicker(false)}
      />

      <div className="py-[7px]">
        <p className="font-medium text-sm pb-1.5 text-[#414651]">{notes.label}</p>
        <textarea
          className="w-full p-[10px] border border-[#D6D7DA] rounded-[5px] text-sm font-normal focus:outline-none focus:ring-1 focus:ring-[#D6D7DA] min-h-[88px]"
          value={inputValue.notes}
          onChange={(event) => handleChange('notes', event.target.value)}
          placeholder={notes.placeholder}
        />
      </div>

      <SubmitButton
        _fn={handleCreateBloodSugar}
        disabled={
          mutation.isPending ||
          !inputValue.value.trim() ||
          !inputValue.unit ||
          !inputValue.timing ||
          !inputValue.meal ||
          !inputValue.measuredAt
        }
      >
        {mutation.isPending ? 'Saving...' : 'Save Reading'}
      </SubmitButton>
    </div>
  );
};

export default BloodSugarModal;