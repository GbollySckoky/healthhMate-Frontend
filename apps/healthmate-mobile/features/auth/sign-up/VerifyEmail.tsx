"use client";

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ArrowLeft, Check } from "lucide-react";
import { toast } from "react-toastify";

import { patientService } from "@/service/patientService";
import { verifyEmail } from "@/lib/interface/verifyEmail";
import { ROUTES } from "@/constants/route";
import type { SignUpValues } from "./page";

interface VerifyEmailProps {
  inputValue: SignUpValues;
  onBack: () => void;
  openModal?: boolean;
}

const VerifyEmail = ({
  inputValue,
  onBack,
  openModal = false,
}: VerifyEmailProps) => {
  const router = useRouter();

  const inputRefs = useRef<
    Array<HTMLInputElement | null>
  >([]);

  const [resendTimer, setResendTimer] = useState(60);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [code, setCode] = useState<string[]>(() => Array(6).fill(""));
  /**
   * --------------------------------------------------
   * RESEND COUNTDOWN
   * --------------------------------------------------
   */

  useEffect(() => {
    if (resendTimer <= 0) {
      return;
    }

    const timer = setTimeout(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [resendTimer]);

  /**
   * --------------------------------------------------
   * OTP CHANGE
   * --------------------------------------------------
   */

  const setCodeDigit = useCallback((index: number, value: string) => {
    setCode((previous) => {
      const next = [...previous];
      next[index] = value;
      return next;
    });
  }, []);

  const handleCodeChange = useCallback(
    (index: number, value: string) => {
      // Remove anything that isn't a number
      const numericValue = value.replace(/\D/g, "");

      if (!numericValue) {
        setCodeDigit(index, "");
        return;
      }

      // Only keep one digit
      const digit = numericValue.slice(-1);

      setCodeDigit(index, digit);

      // Automatically move to next input
      if (index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    },
    [setCodeDigit]
  );

  /**
   * --------------------------------------------------
   * KEYBOARD HANDLING
   * --------------------------------------------------
   */

  const handleKeyDown = useCallback(
    (
      index: number,
      event: React.KeyboardEvent<HTMLInputElement>
    ) => {
      // Backspace → previous input
      if (
        event.key === "Backspace" &&
        !code[index] &&
        index > 0
      ) {
        inputRefs.current[index - 1]?.focus();
      }

      // Arrow left
      if (
        event.key === "ArrowLeft" &&
        index > 0
      ) {
        inputRefs.current[index - 1]?.focus();
      }

      // Arrow right
      if (
        event.key === "ArrowRight" &&
        index < 5
      ) {
        inputRefs.current[index + 1]?.focus();
      }
    },
    [code]
  );

  /**
   * --------------------------------------------------
   * OTP PASTE
   * --------------------------------------------------
   */

  const handlePaste = (
    event: React.ClipboardEvent<HTMLInputElement>
  ) => {
    event.preventDefault();

    const pastedCode = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (!pastedCode) {
      return;
    }

    setCode((previous) => {
      const next = [...previous];
      pastedCode.split("").forEach((digit, index) => {
        next[index] = digit;
      });
      return next;
    });

    const nextIndex = Math.min(
      pastedCode.length,
      5
    );

    inputRefs.current[nextIndex]?.focus();
  };

  /**
   * --------------------------------------------------
   * VERIFY EMAIL
   * --------------------------------------------------
   */

  const verifyEmailMutation = useMutation({
    mutationFn: (payload: verifyEmail) =>
      patientService.verifyEmail(
        inputValue.email,
        payload
      ),

    onSuccess: (response) => {
      toast.success(
        response?.data?.message ||
          "Email verified successfully"
      );

      setIsModalOpen(true);
    },

    onError: (
      error: AxiosError<{ message: string }>
    ) => {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "An error occurred during verification. Please try again.";

      toast.error(errorMessage);
    },
  });

  /**
   * --------------------------------------------------
   * VERIFY CODE
   * --------------------------------------------------
   */

  const handleVerifyCode = () => {
    const otp = code.join("");

    if (otp.length !== 6) {
      toast.error(
        "Please enter all 6 digits."
      );

      return;
    }

    const credentials: verifyEmail = {
      verificationCode: otp,
    };

    verifyEmailMutation.mutate(credentials);
  };

  /**
   * --------------------------------------------------
   * RESEND CODE
   * --------------------------------------------------
   */

  const handleResendCode = () => {
    if (resendTimer > 0) {
      return;
    }

    setResendTimer(60);

    // TODO:
    // Call your resend verification API here.

    toast.info(
      "Check your email for the new verification code."
    );
  };

  /**
   * --------------------------------------------------
   * MODAL
   * --------------------------------------------------
   */

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const continueAfterVerification = () => {
    setIsModalOpen(false);

    router.push(ROUTES.success);
  };

  /**
   * --------------------------------------------------
   * UI
   * --------------------------------------------------
   */

  return (
    <>
      <div className="mx-auto flex w-full max-w-md flex-col items-center pt-5">
        {/* Back */}

        <button
          type="button"
          onClick={onBack}
          className="
            mb-6
            flex
            w-full
            items-center
            gap-2
            text-sm
            text-gray-500
            transition
            hover:text-gray-800
          "
        >
          <ArrowLeft size={18} />

          <span>Back</span>
        </button>

        {/* Header */}

        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold text-black">
            Verify Your Account
          </h1>

          <p className="mt-2 text-base leading-6 text-gray-500">
            We&apos;ve sent a 6-digit verification
            code to{" "}
            <span className="font-medium text-gray-700">
              {inputValue.email ||
                "your email"}
            </span>
            .
          </p>
        </div>

        {/* OTP */}

        <div className="mb-6 flex justify-center gap-2">
          {[0, 1, 2, 3, 4, 5].map(
            (index) => {
              const value = code[index];

              return (
                <input
                  key={index}
                  ref={(element) => {
                    inputRefs.current[index] =
                      element;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={String(value)}
                  onChange={(event) =>
                    handleCodeChange(
                      index,
                      event.target.value
                    )
                  }
                  onKeyDown={(event) =>
                    handleKeyDown(
                      index,
                      event
                    )
                  }
                  onPaste={handlePaste}
                  aria-label={`Verification code digit ${
                    index + 1
                  }`}
                  className="
                    h-12
                    w-12
                    rounded-lg
                    border
                    border-gray-300
                    bg-white
                    text-center
                    text-lg
                    font-semibold
                    text-gray-900
                    outline-none
                    transition
                    focus:border-pink-500
                    focus:ring-2
                    focus:ring-pink-100
                  "
                />
              );
            }
          )}
        </div>

        {/* Resend */}

        <div className="mb-8 flex items-center justify-center">
          <span className="text-sm font-medium text-gray-500">
            Didn&apos;t receive it?
          </span>

          <button
            type="button"
            onClick={handleResendCode}
            disabled={resendTimer > 0}
            className={`
              ml-1
              text-sm
              font-medium
              ${
                resendTimer > 0
                  ? "cursor-not-allowed text-gray-400"
                  : "text-pink-500 hover:underline"
              }
            `}
          >
            {resendTimer > 0
              ? `Resend in ${resendTimer}s`
              : "Resend code"}
          </button>
        </div>

        {/* Verify */}

        <button
          type="button"
          onClick={handleVerifyCode}
          disabled={
            verifyEmailMutation.isPending
          }
          className={`
            w-full
            rounded-xl
            py-4
            text-base
            font-semibold
            text-white
            transition
            ${
              verifyEmailMutation.isPending
                ? "cursor-not-allowed bg-gray-300"
                : "bg-pink-500 hover:bg-pink-600"
            }
          `}
        >
          {verifyEmailMutation.isPending
            ? "Verifying..."
            : "Verify"}
        </button>
      </div>

      {/* Success Modal */}

      {(isModalOpen || openModal) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
            {/* Icon */}

            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-pink-50">
              <Check
                size={24}
                className="text-pink-500"
              />
            </div>

            {/* Content */}

            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-900">
                Successful!
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Account successfully verified.
              </p>
            </div>

            {/* Continue */}

            <button
              type="button"
              onClick={
                continueAfterVerification
              }
              className="
                mt-6
                w-full
                rounded-xl
                bg-pink-500
                py-3.5
                text-sm
                font-semibold
                text-white
                transition
                hover:bg-pink-600
              "
            >
              Continue
            </button>

            {/* Close */}

            <button
              type="button"
              onClick={closeModal}
              className="
                mt-3
                w-full
                text-sm
                text-gray-500
                hover:text-gray-700
              "
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default VerifyEmail;
