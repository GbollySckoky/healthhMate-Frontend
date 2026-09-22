"use client";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";
import { SUPPORT_TICKET } from "@/lib/interface/support";
import { patientService } from "@/service/patientService";
import { PageWrapper, SubmitButton } from "@/components/Reusable";
import { toast } from "react-toastify";


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

const Page = ({ appointmentId }: { appointmentId: string }) => {
  const queryClient = useQueryClient();
  const params = useParams()
  const id = String(params.slug)
  const router = useRouter()

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

  const mutation = useMutation({
    mutationFn: (payload: SUPPORT_TICKET) => patientService.createSupportTicket(id, payload),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["getSupportTicket"] });
      toast.success(response.data.message)
      router.back()
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message);
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
    <PageWrapper className="space-y-5">
      <div className="mt-4">
        <p className="font-medium text-sm mb-2 ">Subject</p>
        <input
          className="w-full border border-[#D6D7DA] rounded-[10px] p-2 text-[15px] text-black placeholder:text-[#D6D7DA] focus:outline-none focus:border-[#C11574]"
          placeholder="Felt Disappointed"
          value={inputValue.subject}
          onChange={(e) => handleChange("subject", e.target.value)}
        />
      </div>

        <div>
          <p className="font-medium text-sm mb-2 ">Description</p>
          <input
            className="w-full border border-[#D6D7DA] rounded-[10px] p-2 text-[15px] text-black placeholder:text-[#D6D7DA] focus:outline-none focus:border-[#C11574]"
            placeholder="Briefly describe the issue"
            value={inputValue.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />
        </div>

        <div>
          <p className="font-medium text-sm mb-2">Message</p>
          <textarea
            className="w-full min-h-[120px] border border-[#D6D7DA] rounded-[10px] p-[10px] text-[15px] text-black placeholder:text-[#D6D7DA] focus:outline-none focus:border-[#C11574] align-top"
            placeholder="Give us more details"
            rows={5}
            value={inputValue.message}
            onChange={(e) => handleChange("message", e.target.value)}
          />
        </div>

        <div>
          <p className="font-medium text-sm mb-2">
            Attachment Name
          </p>
          <input
            className="w-full border border-[#D6D7DA] rounded-[10px] p-2 text-[15px] text-black placeholder:text-[#D6D7DA] focus:outline-none focus:border-[#C11574]"
            placeholder="medical-report.pdf"
            value={inputValue.attachmentName}
            onChange={(e) => handleChange("attachmentName", e.target.value)}
          />
        </div>

        <div>
          <p className="font-medium text-sm mb-2">
            Attachment URL
          </p>
          <input
            className={`w-full border rounded-[10px] p-2 text-[15px] text-black placeholder:text-[#D6D7DA] focus:outline-none focus:border-[#C11574] ${
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

        <div>
          <p className="font-medium text-sm mb-2">Category</p>
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
                  <span className="text-sm font-normal">{option.toLocaleLowerCase()}</span>
                </button>
              );
            })}
          </div>
        </div>

        <SubmitButton _fn={handleSubmit} disabled={!isValid || mutation.isPending}>
          {mutation.isPending ? "Saving..." : "Save"}
        </SubmitButton>
    </PageWrapper>
  );
};

export default Page;
