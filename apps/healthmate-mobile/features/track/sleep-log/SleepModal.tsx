"use client";
import React, { useState } from "react";
import { SubmitButton } from "@/components/Reusable";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Sleep } from "@/lib/interface/sleep";
import { patientService } from "@/service/patientService";
import { sleepData, sleepExperienceData } from "@/constants/data";
import { useModal } from "@/store/Modal";
import DateInput from "@/components/DateInput";
import CustomCalendar from "@/components/CustomCalendar";

interface SleepQuality {
  selectedMood: string;
  selectedEmoji: boolean;
}

interface SleepInputType {
  date?: string;
  sleep?: string;
  hours?: string;
}

const SleepModal = () => {
  const [inputValue, setInputValue] = useState({
    date: new Date().toISOString(),
    sleep: {
      selectedMood: "",
      selectedEmoji: false,
    },
  });
  const [selectDatePicker, setSelectDatePicker] = useState(false);
  const [selectEmojiValue, setSelectEmojiValue] = useState("");
  const { closeModal } = useModal();
  const queryClient = useQueryClient();

  const { date } = sleepData;

  const handleChange = (key: keyof SleepInputType, value: string | SleepQuality) => {
    setInputValue((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSelectDate = (day: any) => {
    const selectedDate = day.dateString;
    handleChange("date", selectedDate);
    setSelectDatePicker(false);
  };

  const handleCloseCalendar = () => {
    setSelectDatePicker(false);
  };

  const handleSelectEmojiValue = (value: string) => {
    setSelectEmojiValue(value);
    // setInputValue((prev) => ({
    //   ...prev,
    //   sleep: value,
    // }));
  };

  const mutation = useMutation({
    mutationFn: (payload: Sleep) => patientService.createSleep(payload),
    onSuccess: async () => {
    //   toast.success("Mood created successfully");
      await queryClient.invalidateQueries({ queryKey: ["getSleep"] });
      closeModal();
    },
    onError: (error: any) => {
    //   toast.error(error?.response?.data?.message || "Unable to save sleep log. Please try again.");
    },
  });

  const handleCreateSleep = async () => {
    const data = {
      sleep: inputValue.sleep || {},
      recordedAt: inputValue.date,
    };
    await mutation.mutateAsync(data);
  };

  return (
    <div>
      {/* <NumberInput
        {...sleep}
        value={inputValue.hours}
        onChangeText={(value) => handleChange('hours', value)}
      /> */}
      <DateInput
        {...date}
        value={inputValue.date ? new Date(inputValue.date).toLocaleDateString() : ""}
        _fn={() => setSelectDatePicker(true)}
      />
      <CustomCalendar
        isOpen={selectDatePicker}
        onChangeText={handleSelectDate}
        onClose={handleCloseCalendar}
      />
      <div className="mt-5">
        <p className="mb-[7px] font-medium text-sm font-inter-medium">
          Sleep Quality (Optional)
        </p>
        <div className="grid grid-cols-3 gap-[10px] mb-2.5">
          {sleepExperienceData.map((sleep) => {
            const { emoji, value, id } = sleep;
            const active = selectEmojiValue === value;
            return (
              <button
                type="button"
                key={id}
                onClick={() => handleSelectEmojiValue(value)}
                className={`h-[100px] flex flex-col items-center justify-center rounded-lg border ${
                  active ? "border-[#C11574] bg-[#FDF2FA]" : "border-[#F1F1F1]"
                }`}
              >
                <span className="text-[38px] pb-1.5">{emoji}</span>
                <span className="text-[#717680] text-sm">{value}</span>
              </button>
            );
          })}
        </div>
      </div>
      <SubmitButton _fn={handleCreateSleep}>
        {mutation.isPending ? "Saving..." : "Save Sleep Log"}
      </SubmitButton>
    </div>
  );
};

export default SleepModal;