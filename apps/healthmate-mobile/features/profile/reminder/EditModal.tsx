"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

import Input from "@/components/Input";
import { ROUTES } from "@/constants/route";

export type EditReminderInputType = Record<string, string>;

interface ModalProps {
  handleDisplayComponent: (id: string) => void;
}

const EditModal = ({
  handleDisplayComponent,
}: ModalProps) => {
  const router = useRouter();

  const [inputValue, setInputValue] =
    useState<EditReminderInputType>({
      title: "",
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
    handleDisplayComponent("");
    router.push(ROUTES.profile);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        {/* Header */}
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            Edit Reminder
          </h2>

          <button
            type="button"
            onClick={() =>
              handleDisplayComponent("")
            }
            className="text-gray-500 transition hover:text-black"
          >
            <X size={22} />
          </button>
        </div>

        {/* Input */}
        <Input
          label="Title"
          placeholder="e.g Medication"
          value={inputValue.title}
          onChangeText={(value) =>
            handleInputValue("title", value)
          }
        />

        {/* Footer */}
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={() =>
              handleDisplayComponent("")
            }
            className="flex-1 rounded-lg border border-gray-300 py-3 font-medium text-gray-700 transition hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            className="flex-1 rounded-lg bg-pink-600 py-3 font-semibold text-white transition hover:bg-pink-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;