"use client";

import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { Check } from "lucide-react";

import Input from "@/components/Input";

import useDisplay from "@/hooks/useDisplay";
import { reminderData } from "@/constants/data";
// import { ROUTES } from "@/constants/route";
import { PageWrapper, SubmitButton } from "@/components/Reusable";
import SelectInput from "@/components/SelectInput";

export type ReminderInputType = Record<string, string>;

const AddReminderPage = () => {
  // const router = useRouter();

  const { title, frequency, type } = reminderData;
  const { openModal, handleDisplay } = useDisplay();

  const [inputValue, setInputValue] =
    useState<ReminderInputType>({
      title: "",
      type: "",
      frequency: "",
    });

  const handleInputValue = (
    key: string,
    value: string
  ) => {
    setInputValue((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = () => {
    handleDisplay();
  };

  return (
      <PageWrapper>
        <Input
          {...title}
          value={inputValue.title}
          onChangeText={(value) =>
            handleInputValue("title", value)
          }
        />

        <SelectInput
          {...type}
          value={inputValue.type}
          onChangeText={(value) =>
            handleInputValue("type", value)
          }
        />

        <SelectInput
          {...frequency}
          value={inputValue.frequency}
          onChangeText={(value) =>
            handleInputValue("frequency", value)
          }
        />

        <SubmitButton _fn={handleSubmit}>
          Save Reminder
        </SubmitButton>

        {/* <Modal
          icon={
            <Check
              size={24}
              className="text-pink-600"
            />
          }
          title="Successful!"
          text="You've set a reminder for Taking a Walk"
          isOpen={openModal}
          closeModal={handleDisplay}
          route={() =>
            router.push(ROUTES.profile)
          }
          submitText="Done"
        /> */}
      </PageWrapper>
  );
};

export default AddReminderPage;