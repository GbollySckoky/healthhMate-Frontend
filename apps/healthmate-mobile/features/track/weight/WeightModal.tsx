"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitButton } from "@/components/Reusable";

import { Weight } from "@/lib/interface/weight";

import { patientService } from "@/service/patientService";
import { weightData } from "@/constants/data";
import { useModal } from "@/store/Modal";
import DateInput from "@/components/DateInput";
import CustomCalendar from "@/components/CustomCalendar";
import Input from "@/components/Input";

type WeightInputType = {
  weight: string;
  date: string;
};

type CalendarDay = {
  dateString: string;
};

const WeightModal = () => {
  const { date, weight } = weightData;

  const queryClient = useQueryClient();
  const { closeModal } = useModal();

  const [showDatePicker, setShowDatePicker] = useState(false);

  const [inputValue, setInputValue] = useState<WeightInputType>({
    weight: "",
    date: new Date().toISOString(),
  });
    const handleChange = (
    key: keyof WeightInputType,
    value: string
  ) => {
    setInputValue((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleDateSelect = (day: CalendarDay) => {
    handleChange("date", day.dateString);
    setShowDatePicker(false);
  };

  const mutation = useMutation({
    mutationFn: (payload: Weight) =>
      patientService.createWeight(payload),

    onSuccess: async () => {
    //   toast.success("Weight created successfully");

      await queryClient.invalidateQueries({
        queryKey: ["weight"],
      });

      closeModal();
    },

    onError: (error: any) => {
    //   toast.error(
    //     error?.response?.data?.message ??
    //       "Unable to save weight"
    //   );
    },
  });

  const handleCreateWeight = async () => {
    await mutation.mutateAsync({
      weight: inputValue.weight,
      recordedAt: inputValue.date,
    });
  };

    return (
    <div className="space-y-5">

      <Input
        {...weight}
        value={inputValue.weight}
        onChangeText={(value) =>
          handleChange("weight", value)
        }
      />

      <DateInput
        {...date}
        value={
          inputValue.date
            ? new Date(inputValue.date).toLocaleDateString()
            : ""
        }
        _fn={() => setShowDatePicker(true)}
      />

      <CustomCalendar
        isOpen={showDatePicker}
        onChangeText={handleDateSelect}
        onClose={() => setShowDatePicker(false)}
      />

      <SubmitButton
        _fn={handleCreateWeight}
        disabled={mutation.isPending || !inputValue.weight || !inputValue.date}
      >
        {mutation.isPending
          ? "Saving..."
          : "Save Weight Log"}
      </SubmitButton>

    </div>
  );
};

export default WeightModal;