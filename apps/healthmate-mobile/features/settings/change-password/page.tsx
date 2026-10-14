"use client";

import { useState } from "react";

import {
  Wrapper,
  SubmitButton,
} from "@/components/Reusable";

import useDisplay from "@/hooks/useDisplay";
import { passwordData } from "@/constants/data";
import PasswordInput from "@/components/PasswordInput";
import useChangePassword from "@/hooks/useChangePassword";
import { toast } from "react-toastify";


type ChangePasswordInputType = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

type PasswordVisibilityType = {
  oldPassword: boolean;
  newPassword: boolean;
  confirmPassword: boolean;
};

const ChangePassword = () => {

  const { oldPassword, newPassword, confirmPassword } =
    passwordData;

  const { handleDisplay } =
    useDisplay();

  const [inputValue, setInputValue] =
    useState<ChangePasswordInputType>({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

  const [passwordVisibility, setPasswordVisibility] =
    useState<PasswordVisibilityType>({
      oldPassword: false,
      newPassword: false,
      confirmPassword: false,
    });

  const handleInputChange = (
    key: keyof ChangePasswordInputType,
    value: string
  ) => {
    setInputValue((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleToggleVisibility = (
    field: keyof PasswordVisibilityType
  ) => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const {isPending, mutation} = useChangePassword()

  const handleSavePassword = () => {
    handleDisplay();
    
    if(inputValue.newPassword !== inputValue.confirmPassword) {
      toast.error('Incorrect Password')
      return
    }
    const payload = {
      oldPassword: inputValue.oldPassword,
      newPassword: inputValue.newPassword
    }
    mutation(payload)
  };

    return (
      <Wrapper>

        <PasswordInput
          {...oldPassword}
          value={inputValue.oldPassword}
          onChangeText={(value) =>
            handleInputChange(
              "oldPassword",
              value
            )
          }
          secureTextEntry={
            !passwordVisibility.oldPassword
          }
          onToggleVisibility={() =>
            handleToggleVisibility(
              "oldPassword"
            )
          }
          isPasswordVisible={
            passwordVisibility.oldPassword
          }
        />

        <PasswordInput
          {...newPassword}
          value={inputValue.newPassword}
          onChangeText={(value) =>
            handleInputChange(
              "newPassword",
              value
            )
          }
          secureTextEntry={
            !passwordVisibility.newPassword
          }
          onToggleVisibility={() =>
            handleToggleVisibility(
              "newPassword"
            )
          }
          isPasswordVisible={
            passwordVisibility.newPassword
          }
        />

        <PasswordInput
          {...confirmPassword}
          value={
            inputValue.confirmPassword
          }
          onChangeText={(value) =>
            handleInputChange(
              "confirmPassword",
              value
            )
          }
          secureTextEntry={
            !passwordVisibility.confirmPassword
          }
          onToggleVisibility={() =>
            handleToggleVisibility(
              "confirmPassword"
            )
          }
          isPasswordVisible={
            passwordVisibility.confirmPassword
          }
        />

        <SubmitButton
          _fn={handleSavePassword}
          disabled={isPending}
        >
          { isPending ? "Processing..." : "Create Password" }
        </SubmitButton>

      </Wrapper>
  );
};

export default ChangePassword;