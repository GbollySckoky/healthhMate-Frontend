"use client";

import { useState, ChangeEvent } from "react";
import { Camera } from "lucide-react";

import { EditProfile } from "@/lib/interface/user";
import Input from "@/components/Input";
import Image from "next/image";

type ProfileFormState = EditProfile;

interface Props {
  initialValues: EditProfile;
  onSubmit: (values: EditProfile) => void;
  submitting?: boolean;
  submitLabel?: string;
}

const GENDERS = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Other", value: "other" },
];

const DEFAULT_FORM_STATE: EditProfile = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  dateOfBirth: "",
  gender: "",
  healthCondition: "",
  allergies: "",
  profilePicture: "",
};

const ProfileForm = ({
  initialValues,
  onSubmit,
  submitting = false,
  submitLabel = "Save",
}: Props) => {
  const [form, setForm] = useState<ProfileFormState>({
    ...DEFAULT_FORM_STATE,
    ...initialValues,
  });

  const updateField = <K extends keyof ProfileFormState>(
    key: K,
    value: ProfileFormState[K]
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const pickImage = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    updateField("profilePicture", imageUrl);
  };

  return (
    <div className="space-y-5">
      {/* Profile Image */}
      <div className="flex flex-col items-center">
        <label className="cursor-pointer">
        {form.profilePicture ? (
          <Image
            src={form.profilePicture}
            alt="Profile"
            width={96}
            height={96}
            className="h-24 w-24 rounded-full object-cover border border-border"
          />
        ) : (
          <div className="flex h-24 w-24 items-center justify-center rounded-full border border-gray-300 bg-gray-100">
            <Camera className="text-gray-500" size={24} />
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={pickImage}
        />
      </label>

        <p className="mt-2 text-sm font-medium">Change photo</p>
      </div>

      <Input
        label="First name"
        placeholder="Gbolahan"
        value={form.firstName}
        onChangeText={(value) => updateField("firstName", value)}
      />

      <Input
        label="Last name"
        placeholder="Coker"
        value={form.lastName}
        onChangeText={(value) => updateField("lastName", value)}
      />

      <Input
        label="Phone Number"
        placeholder="09075431712"
        value={form.phoneNumber}
        onChangeText={(value) => updateField("phoneNumber", value)}
      />

      {/* Date of Birth */}
      <div>
        <label className="mb-2 block text-sm font-normal text-[#414651]">
          Date of Birth
        </label>

        <input
          type="date"
          value={form.dateOfBirth}
          onChange={(e) =>
            updateField("dateOfBirth", e.target.value)
          }
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
        />
      </div>

      {/* Gender */}
      <div>
        <label className="mb-2 block text-sm font-normal">
          Gender
        </label>

        <div className="flex gap-3">
          {GENDERS.map((gender) => (
            <button
              key={gender.value}
              type="button"
              onClick={() => updateField("gender", gender.value)}
              className={`rounded-full border px-5 py-2 transition text-sm ${
                form.gender === gender.value
                  ? "border-pink-600 bg-pink-600 text-white"
                  : "border-gray-300"
              }`}
            >
              {gender.label}
            </button>
          ))}
        </div>
      </div>

      <Input
        label="Health Condition"
        placeholder="Lack of sleep"
        value={form.healthCondition}
        onChangeText={(value) =>
          updateField("healthCondition", value)
        }
      />

      <Input
        label="Allergies"
        placeholder="Fish"
        value={form.allergies}
        onChangeText={(value) =>
          updateField("allergies", value)
        }
      />

      <button
        type="button"
        disabled={submitting}
        onClick={() => onSubmit(form)}
        className="w-full rounded-lg bg-pink-600 py-3 font-semibold text-white transition hover:bg-pink-700 disabled:opacity-50"
      >
        {submitting ? "Saving..." : submitLabel}
      </button>
    </div>
  );
};

export default ProfileForm;