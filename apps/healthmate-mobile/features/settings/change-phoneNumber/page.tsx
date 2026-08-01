"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";

import {
  CardAmount,
  SubmitButton,
  PageWrapper,
} from "@/components/Reusable";
import Input from "@/components/Input";
import NumberInput from "@/components/NumberInput";

type PhoneNumberInputType = {
  phoneNumber: string;
};

enum InputCount {
  ZERO,
  ONE,
  TWO,
  THREE,
}

const EditPhoneNumber = () => {
  const router = useRouter();

  const [step, setStep] = useState(InputCount.ZERO);

  const [inputValue, setInputValue] =
    useState<PhoneNumberInputType>({
      phoneNumber: "",
    });

  const data = {
    phoneNumber: {
      label: "Phone Number",
      placeholder: "228292",
    },
  };

  const handleInput = (
    key: keyof PhoneNumberInputType,
    value: string
  ) => {
    setInputValue((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleVerifyNumber = () => {
    setStep(InputCount.ONE);
  };

  const handleVerifyOtp = () => {
    setStep(InputCount.TWO);
  };

  const handleBackHome = () => {
    router.push("/");
  };
    return (
        <PageWrapper>

          {step === InputCount.ZERO && (
            <>
              <NumberInput
                {...data.phoneNumber}
                value={inputValue.phoneNumber}
                onChangeText={(value) =>
                  handleInput("phoneNumber", value)
                }
              />

              <SubmitButton
                _fn={handleVerifyNumber}
              >
                Verify Number
              </SubmitButton>
            </>
          )}
                  {step === InputCount.ONE && (
            <div className="flex flex-col items-center">

              <div className="mb-6 text-center">

                <h2 className="text-xl font-semibold text-gray-800">
                  Verify Reset Code
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Enter the 6-digit code sent to your
                  email/phone.
                </p>

              </div>

              <div className="mb-5 flex gap-3">

                {[1, 2, 3, 4].map((_, index) => (
                  <Input
                    key={index}
                    {...data.phoneNumber}
                    value={inputValue.phoneNumber}
                    onChangeText={(value) =>
                      handleInput(
                        "phoneNumber",
                        value
                      )
                    }
                  />
                ))}

              </div>

              <p className="mb-6 text-sm font-medium">
                Didn&apos;t receive it?
                <span className="text-primary">
                  {" "}
                  Resend code in 30s
                </span>
              </p>

              <SubmitButton
                _fn={handleVerifyOtp}
              >
                Verify
              </SubmitButton>

            </div>
          )}
                    {step === InputCount.TWO && (
            <div className="flex flex-col items-center">

              <div className="mb-4 rounded-full bg-pink-100 p-4">

                <Check
                  className="text-pink-600"
                  size={24}
                />

              </div>

              <CardAmount>
                Successful!
              </CardAmount>

              <p className="mt-2 text-center text-gray-500">
                Phone number has been updated.
              </p>

              <SubmitButton
                _fn={handleBackHome}
              >
                Back to Home
              </SubmitButton>

            </div>
          )}

        </PageWrapper>
  );
};

export default EditPhoneNumber;