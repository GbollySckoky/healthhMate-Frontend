"use client";

import { useState } from "react";

import {
  Wrapper,
  SubmitButton,
} from "@/components/Reusable";

import useDisplay from "@/hooks/useDisplay";
import { passwordData } from "@/constants/data";
import PasswordInput from "@/components/PasswordInput";


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

  const { openModal, handleDisplay } =
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

  const handleSavePassword = () => {
    handleDisplay();
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
        >
          Save Password
        </SubmitButton>
          {/* <Modal
          isOpen={openModal}
          closeModal={handleDisplay}
          route={() =>
            router.push(ROUTES.home)
          }
          submitText="Done"
          title="Password Updated"
          text="Your password has been updated successfully. You can change it at any time."
          icon={
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-100">
              <Check
                className="text-pink-600"
                size={24}
              />
            </div>
          }
        /> */}

      </Wrapper>
  );
};

export default ChangePassword;