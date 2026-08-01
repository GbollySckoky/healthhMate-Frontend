"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitButton } from "@/components/Reusable";
import { patientService } from "@/service/patientService";
import { Mood } from "@/lib/interface/mood";
import { MoodData } from "@/constants/data";
import DateInput from "@/components/DateInput";
import CustomCalendar from "@/components/CustomCalendar";
import TextAreaInput from "@/components/TextAreaInput";

type MoodInput = {
  description: string;
  mood: {
    selectedMood: string;
    selectedEmoji: boolean;
  };
  date: string;
};

type CalendarDay = {
  dateString: string;
};

const MoodModal = ({ onClose }: { onClose?: () => void }) => {
  const queryClient = useQueryClient();

  const [inputValue, setInputValue] = useState<MoodInput>({
    description: "",
    mood: {
      selectedMood: "",
      selectedEmoji: false,
    },
    date: new Date().toISOString(),
  });

  const [selectedMood, setSelectedMood] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleChange = (
    key: "description" | "date",
    value: string
  ) => {
    setInputValue((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSelectMood = (value: string) => {
    setSelectedMood(value);

    setInputValue((prev) => ({
      ...prev,
      mood: {
        selectedMood: value,
        selectedEmoji: true,
      },
    }));
  };

  const handleDateSelect = (day: CalendarDay) => {
    handleChange("date", day.dateString);
    setShowDatePicker(false);
  };

  const mutation = useMutation({
    mutationFn: (payload: Mood) => patientService.createMood(payload),

    onSuccess: async () => {
    //   Toast.success("Mood created successfully");

      await queryClient.invalidateQueries({
        queryKey: ["getmood"],
      });

      onClose?.();
    },

    onError: (error: any) => {
    //   Toast.error(error?.response?.data?.message || "Something went wrong");
    },
  });

  const handleCreateMood = async () => {
    const payload = {
      notes: inputValue.description,
      mood: inputValue.mood,
      recordedAt: inputValue.date,
    };

    console.log(payload);

    await mutation.mutateAsync(payload);
  };

  return (
    <div className="w-full">
      <h2 className="mb-4 text-sm font-semibold text-[#414651]">
        Select your Mood
      </h2>

      {/* Mood Grid */}
      <div className="mb-4 grid grid-cols-3 gap-3">
        {MoodData.map(({ id, emoji, value }) => (
          <button
            key={id}
            type="button"
            onClick={() => handleSelectMood(value)}
            className={`flex h-28 flex-col items-center justify-center rounded-lg border transition
              ${
                selectedMood === value
                  ? "border-[#C11574] bg-[#FDF2FA]"
                  : "border-[#F1F1F1]"
              }`}
          >
            <span className="mb-2 text-4xl">{emoji}</span>

            <span className="text-sm text-[#717680]">
              {value}
            </span>
          </button>
        ))}
      </div>

      <TextAreaInput
        label="What's making you feel this way?"
        placeholder="Enter a description..."
        value={inputValue.description}
        onChangeText={(value) => handleChange("description", value)}
    />

      <div className="mt-4">
        <DateInput
          label="Date"
          placeholder="10/05/1997"
          value={
            inputValue.date
              ? new Date(inputValue.date).toLocaleDateString()
              : ""
          }
          _fn={() => setShowDatePicker(true)}
        />
      </div>

      <CustomCalendar
        isOpen={showDatePicker}
        onChangeText={handleDateSelect}
        onClose={() => setShowDatePicker(false)}
      />

      <div className="mt-6">
        <SubmitButton
          _fn={handleCreateMood}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Saving..." : "Save Mood"}
        </SubmitButton>
      </div>
    </div>
  );
};

export default MoodModal;