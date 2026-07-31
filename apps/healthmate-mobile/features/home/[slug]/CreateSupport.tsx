"use client";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { SUPPORT_TICKET } from "@/lib/interface/support";
import { patientService } from "@/service/patientService";
import { ROUTES } from "@/constants/route";
import { SubmitButton } from "@/components/Reusable";
import { useModal } from "@/store/Modal";
// TODO: adjust this path to wherever ModalProvider.tsx actually lives
// import { useModal } from "@/providers/ModalProvider";

/*
Color assumptions (not covered by what you sent — swap for your real tokens
in @/constants/colors if these guesses are off):
  colors.black       -> #000000
  colors.broderColor -> #D6D7DA   (matches the border color used elsewhere)
  colors.lightRed     -> #C11574  (matches the accent used for the radio/active option)
  colors.lightPurple  -> #F4F3FF  (matches the Status pill background used elsewhere)
*/

type InputValue = {
  subject: string;
  description: string;
  category: string;
  message: string;
  attachmentUrl: string;
  attachmentName: string;
};

const CATEGORY_OPTIONS = ["ACCOUNT", "APPOINTMENT", "BILLING", "TECHNICAL", "MEDICAL", "OTHER"];

const URL_REGEX = /^(https?:\/\/)[^\s$.?#].[^\s]*$/i;

const CreateSupportTicket = ({ appointmentId }: { appointmentId: string }) => {
  const { openModal, closeModal } = useModal();
  const queryClient = useQueryClient();
  const router = useRouter();

  const [inputValue, setInputValue] = useState<InputValue>({
    subject: "",
    description: "",
    category: "",
    message: "",
    attachmentUrl: "",
    attachmentName: "",
  });

  const [urlTouched, setUrlTouched] = useState(false);

  const { data: appointmentResponse } = useQuery({
    queryKey: ["getAppointmentById", appointmentId],
    queryFn: () => patientService.getAppointmentById(appointmentId as string),
    enabled: !!appointmentId,
  });

  const appointmentDetails = appointmentResponse?.data ?? null;

  const handleChange = (key: keyof InputValue, value: string) => {
    setInputValue((prev) => ({ ...prev, [key]: value }));
  };

  const handleSelectCategory = (option: string) => {
    setInputValue((prev) => ({
      ...prev,
      category: prev.category === option ? "" : option,
    }));
  };

  const showSuccessModal = () => {
    openModal(
      <div className="flex flex-col items-center text-center">
        <div className="w-14 h-14 rounded-full bg-[#F4F3FF] flex items-center justify-center mb-1">
          <Check size={28} className="text-[#C11574]" />
        </div>
        <button
          type="button"
          onClick={() => {
            closeModal();
            router.push(ROUTES.home);
          }}
          className="w-full mt-4 rounded-[10px] bg-[#DD2590] py-3 text-white text-sm font-semibold"
        >
          Go to home
        </button>
      </div>,
      {
        title: "Ticket Created!",
        description:
          "Our support team has received your request. You'll receive an update soon via in-app message or email.",
        presentation: "center",
      }
    );
  };

  const mutation = useMutation({
    mutationFn: (payload: SUPPORT_TICKET) => patientService.createSupportTicket(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getSupportTicket"] });
      showSuccessModal();
    },
    onError: (error: AxiosError<{ message: string }>) => {
      console.log("Error creating support ticket:", error.response?.data?.message);
    },
  });

  const handleSubmit = async () => {
    const payload: SUPPORT_TICKET = {
      subject: inputValue.subject,
      category: inputValue.category,
      description: inputValue.description,
      message: inputValue.message,
      doctorId: appointmentDetails?.doctor?.id ? String(appointmentDetails.doctor.id) : "",
      appointmentId: appointmentDetails?.id ? String(appointmentDetails.id) : "",
      hospitalId: appointmentDetails?.hospital?.id ? String(appointmentDetails.hospital.id) : "",
      attachmentUrl: inputValue.attachmentUrl,
      attachmentName: inputValue.attachmentName,
    };
    await mutation.mutateAsync(payload);
  };

  const isUrlValid =
    inputValue.attachmentUrl === "" ? false : URL_REGEX.test(inputValue.attachmentUrl);

  const isValid = Object.values(inputValue).every((v) => v !== "") && isUrlValid;

  return (
    <div>
      <div className="mt-5">
        <p className="font-semibold text-[15px] font-lato-bold mb-2 text-black">Subject</p>
        <input
          className="w-full border border-[#D6D7DA] rounded-[10px] p-[15px] text-[15px] text-black placeholder:text-[#D6D7DA] focus:outline-none focus:border-[#C11574]"
          placeholder="Felt Disappointed"
          value={inputValue.subject}
          onChange={(e) => handleChange("subject", e.target.value)}
        />
      </div>

      <div className="mt-5">
        <p className="font-semibold text-[15px] font-lato-bold mb-2 text-black">Description</p>
        <input
          className="w-full border border-[#D6D7DA] rounded-[10px] p-[15px] text-[15px] text-black placeholder:text-[#D6D7DA] focus:outline-none focus:border-[#C11574]"
          placeholder="Briefly describe the issue"
          value={inputValue.description}
          onChange={(e) => handleChange("description", e.target.value)}
        />
      </div>

      <div className="mt-5">
        <p className="font-semibold text-[15px] font-lato-bold mb-2 text-black">Message</p>
        <textarea
          className="w-full min-h-[120px] border border-[#D6D7DA] rounded-[10px] p-[15px] text-[15px] text-black placeholder:text-[#D6D7DA] focus:outline-none focus:border-[#C11574] align-top"
          placeholder="Give us more details"
          rows={5}
          value={inputValue.message}
          onChange={(e) => handleChange("message", e.target.value)}
        />
      </div>

      <div className="mt-5">
        <p className="font-semibold text-[15px] font-lato-bold mb-2 text-black">
          Attachment Name
        </p>
        <input
          className="w-full border border-[#D6D7DA] rounded-[10px] p-[15px] text-[15px] text-black placeholder:text-[#D6D7DA] focus:outline-none focus:border-[#C11574]"
          placeholder="medical-report.pdf"
          value={inputValue.attachmentName}
          onChange={(e) => handleChange("attachmentName", e.target.value)}
        />
      </div>

      <div className="mt-5">
        <p className="font-semibold text-[15px] font-lato-bold mb-2 text-black">
          Attachment URL
        </p>
        <input
          className={`w-full border rounded-[10px] p-[15px] text-[15px] text-black placeholder:text-[#D6D7DA] focus:outline-none focus:border-[#C11574] ${
            urlTouched && inputValue.attachmentUrl !== "" && !isUrlValid
              ? "border-[#C11574]"
              : "border-[#D6D7DA]"
          }`}
          placeholder="https://example.com/attachments/report.pdf"
          value={inputValue.attachmentUrl}
          onChange={(e) => handleChange("attachmentUrl", e.target.value)}
          onBlur={() => setUrlTouched(true)}
          type="url"
          autoCapitalize="none"
          autoCorrect="off"
        />
        {urlTouched && inputValue.attachmentUrl !== "" && !isUrlValid && (
          <p className="text-[#C11574] text-xs mt-1.5">
            Enter a valid URL (must start with http:// or https://)
          </p>
        )}
      </div>

      <div className="mt-5">
        <p className="font-semibold text-[15px] font-lato-bold mb-2 text-black">Category</p>
        <div className="flex flex-col gap-[13px]">
          {CATEGORY_OPTIONS.map((option) => {
            const active = inputValue.category === option;
            return (
              <button
                type="button"
                key={option}
                onClick={() => handleSelectCategory(option)}
                className={`flex flex-row items-center gap-[10px] border rounded-[10px] p-[15px] text-left ${
                  active ? "border-[#C11574] bg-[#F4F3FF]" : "border-[#D6D7DA]"
                }`}
              >
                <span className="h-5 w-5 rounded-full border border-[#717680] flex items-center justify-center shrink-0">
                  {active && <span className="h-[10px] w-[10px] rounded-full bg-[#C11574]" />}
                </span>
                <span className="text-[15px] text-black font-medium">{option}</span>
              </button>
            );
          })}
        </div>
      </div>

      <SubmitButton _fn={handleSubmit} disabled={!isValid || mutation.isPending}>
        {mutation.isPending ? "Saving..." : "Save"}
      </SubmitButton>
    </div>
  );
};

export default CreateSupportTicket;