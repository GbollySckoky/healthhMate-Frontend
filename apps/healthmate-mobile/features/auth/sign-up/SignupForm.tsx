"use client";

import { Eye, EyeOff } from "lucide-react";

import InputField from "@/components/InputField";
import PasswordInput from "@/components/Password";
import EmailField from "@/components/EmailInput";

import type { SignUpValues } from "./page";

interface SignUpFormProps {
  values: SignUpValues;

  onChange: (
    key: keyof SignUpValues,
    value: string
  ) => void;

  passwordVisible: boolean;
  confirmPasswordVisible: boolean;

  onTogglePassword: () => void;
  onToggleConfirmPassword: () => void;

  onSubmit: () => void;
  isLoading: boolean;
}

export const SignUpForm = ({
  values,
  onChange,
  passwordVisible,
  confirmPasswordVisible,
  onTogglePassword,
  onToggleConfirmPassword,
  onSubmit,
  isLoading,
}: SignUpFormProps) => {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
      className="w-full"
    >
      <div className="mb-4 space-y-4">
        <InputField
          label="First Name"
          placeholder="Gbolly"
          value={values.firstName}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            onChange("firstName", event.target.value)
          }
        />

        <InputField
          label="Last Name"
          placeholder="Sckoky"
          value={values.lastName}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            onChange("lastName", event.target.value)
          }
        />

        <EmailField
          label="Email"
          placeholder="Enter email"
          value={values.email}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            onChange("email", event.target.value)
          }
        />

        <PasswordInput
          label="Password"
          placeholder="********"
          value={values.password}
          type={passwordVisible ? "text" : "password"}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            onChange("password", event.target.value)
          }
          icon={
            passwordVisible ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )
          }
          onIconClick={onTogglePassword}
        />

        <PasswordInput
          label="Confirm Password"
          placeholder="********"
          value={values.confirmPassword}
          type={
            confirmPasswordVisible ? "text" : "password"
          }
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            onChange(
              "confirmPassword",
              event.target.value
            )
          }
          icon={
            confirmPasswordVisible ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )
          }
          onIconClick={onToggleConfirmPassword}
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`
          mb-5
          w-full
          rounded-xl
          py-4
          text-base
          font-semibold
          text-white
          transition
          ${
            isLoading
              ? "cursor-not-allowed bg-gray-300"
              : "bg-pink-500 hover:bg-pink-600"
          }
        `}
      >
        {isLoading ? "Creating Account..." : "Sign Up"}
      </button>
    </form>
  );
};
