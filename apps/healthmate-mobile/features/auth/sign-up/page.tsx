"use client";

import { useCallback, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import Image from "next/image";

import { patientService } from "@/service/patientService";
import { Signup } from "@/lib/interface/signup-interface";
import { ROUTES } from "@/constants/route";

import VerifyEmail from "./VerifyEmail";
import { SignUpForm } from "./SignupForm";

import Logo from "@/assets/Group 19156 copy.png";

type SignUpStep = "signup" | "verify";

export interface SignUpValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
}

const SignUpPage = () => {
  const router = useRouter();

  const [step, setStep] = useState<SignUpStep>("signup");

  const [inputValue, setInputValue] = useState<SignUpValues>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  });

  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] =
    useState(false);

  const handleChange = useCallback(
    (key: keyof SignUpValues, value: string) => {
      setInputValue((prev) => ({
        ...prev,
        [key]: value,
      }));
    },
    []
  );

  const togglePasswordVisibility = useCallback(
    (field: "password" | "confirmPassword") => {
      if (field === "password") {
        setPasswordVisibility((prev) => !prev);
      } else {
        setConfirmPasswordVisibility((prev) => !prev);
      }
    },
    []
  );

  const signupMutation = useMutation({
    mutationFn: (payload: Signup) => patientService.signup(payload),

    onSuccess: (response) => {
      toast.success(
        response?.data?.message || "Account created successfully."
      );

      setStep("verify");
    },

    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(
        error?.response?.data?.message ||
          "Unable to create account. Please try again."
      );
    },
  });

  const handleSignUp = () => {
    if (!inputValue.firstName.trim()) {
      toast.error("Please enter your first name.");
      return;
    }

    if (!inputValue.lastName.trim()) {
      toast.error("Please enter your last name.");
      return;
    }

    if (!inputValue.email.trim()) {
      toast.error("Please enter your email.");
      return;
    }

    if (!inputValue.password) {
      toast.error("Please enter your password.");
      return;
    }

    if (!inputValue.confirmPassword) {
      toast.error("Please confirm your password.");
      return;
    }

    if (inputValue.password !== inputValue.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    const credentials: Signup = {
      firstName: inputValue.firstName.trim(),
      lastName: inputValue.lastName.trim(),
      email: inputValue.email.trim(),
      password: inputValue.password,
      confirmPassword: inputValue.confirmPassword,
      phoneNumber: inputValue.phoneNumber,
    };

    signupMutation.mutate(credentials);
  };

  if (step === "verify") {
    return (
      <VerifyEmail
        inputValue={inputValue}
        onBack={() => setStep("signup")}
      />
    );
  }

  return (
    <main className="min-h-screen w-screen overflow-y-auto bg-[#FAFAFA] px-4 py-8">
      <div className="mx-auto w-full max-w-[520px]">
        {/* Logo */}
        <div className="mb-6 flex justify-center">
          <Image
            src={Logo}
            alt="HealthMate Logo"
            priority
            className="h-auto w-[150px] sm:w-[170px]"
          />
        </div>

        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="font-lato text-xl font-semibold text-[#414651] sm:text-2xl">
            Create your HealthMate account
          </h1>

          <p className="mt-2 text-sm text-[#414651]">
            Sign up with your phone number or email to begin.
          </p>
        </div>

        {/* Form */}
        <SignUpForm
          values={inputValue}
          onChange={handleChange}
          passwordVisible={passwordVisibility}
          confirmPasswordVisible={confirmPasswordVisibility}
          onTogglePassword={() => togglePasswordVisibility("password")}
          onToggleConfirmPassword={() =>
            togglePasswordVisibility("confirmPassword")
          }
          onSubmit={handleSignUp}
          isLoading={signupMutation.isPending}
        />

        {/* Login */}
        <div className="mt-6 flex items-center justify-center pb-4">
          <span className="text-sm text-gray-500">
            Already have an account?
          </span>

          <button
            type="button"
            onClick={() => router.push(ROUTES.login)}
            className="ml-1 text-sm font-medium text-pink-500 hover:underline"
          >
            Login
          </button>
        </div>
      </div>
    </main>
  );
};

export default SignUpPage;
