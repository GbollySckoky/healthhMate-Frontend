"use client"

import React, { useState } from "react"

import TextArea from "@/lib/components/ui/TextArea"
import useCreatePrescription from "@/lib/hooks/useCreatePrescription"
import { Appointment } from "@/lib/interface/doctor-apppointment.interface"
import { CapitalizeName } from "@/lib/constant/capitalizeName"
import useGetDate from "@/lib/hooks/useGetDate"
import InputField from "@/lib/components/ui/InputField"

const PrescriptionSkeleton = () => {
  return (
    <div className="space-y-2">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="flex items-center justify-between p-3 animate-pulse"
        >
          <div className="flex items-center">
            {/* Red indicator */}
            <div className="h-10 w-[6px] rounded-lg bg-gray-200" />

            <div className="ml-3 space-y-2">
              {/* Prescription */}
              <div className="h-4 w-48 rounded bg-gray-200" />

              {/* Patient text */}
              <div className="h-3 w-72 rounded bg-gray-200" />
            </div>
          </div>

          {/* Date */}
          <div className="h-3 w-24 rounded bg-gray-200" />
        </div>
      ))}
    </div>
  )
}

const Prescription = ({
  id,
  appointmentDetails,
  isLoading,
}: {
  id: string
  appointmentDetails: Appointment
  isLoading: boolean
}) => {
  const [inputValue, setInputValue] = useState({
    prescription: "",
    frequency: "",
    duration: "",
    dosage: "",
  })

  const { prescription } = useCreatePrescription(id)
  const { getReadableDate } = useGetDate()

  const prescriptions = appointmentDetails?.prescriptions ?? []
  const isSubmitDisabled =
    prescription.isPending ||
    !inputValue.prescription.trim() ||
    !inputValue.frequency.trim() ||
    !inputValue.duration.trim() ||
    !inputValue.dosage.trim()

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async () => {
    if (isSubmitDisabled) return

    const data = {
      prescription: inputValue.prescription.trim(),
      dosage: inputValue.dosage.trim(),
      frequency: inputValue.frequency.trim(),
      duration: inputValue.duration.trim(),
    }

    await prescription.mutateAsync(data)
    setInputValue({
      prescription: "",
      frequency: "",
      duration: "",
      dosage: "",
    })
  }

  return (
    <div>
      <div className="flex-1 overflow-y-auto p-4 pt-0 border border-borderColor mb-5">
        {isLoading ? (
          <PrescriptionSkeleton />
        ) : prescriptions.length > 0 ? (
          prescriptions.map((prescript: { id: string; createdAt: string; prescription: string }) => {
            const { createdAt, prescription: prescriptionText, id } = prescript

            return (
              <div
                key={id}
                className="flex items-center justify-between p-3"
              >
                <div className="flex items-center">
                  <p className="h-10 w-[6px] bg-red-200 rounded-lg" />

                  <div className="ml-3">
                    <p className="font-libre text-[14px] font-medium text-grey-50">
                      {CapitalizeName(prescriptionText)}
                    </p>

                    <p className="font-libre text-grey-600 font-normal text-[14px]">
                      {`Patient: ${
                        CapitalizeName(
                          appointmentDetails.user.firstName
                        ) +
                        CapitalizeName(
                          appointmentDetails.user.lastName
                        )
                      } booked Dr. ${
                        CapitalizeName(
                          appointmentDetails.doctor.firstName
                        ) +
                        CapitalizeName(
                          appointmentDetails.doctor.lastName
                        )
                      }`}
                    </p>
                  </div>
                </div>

                <p className="font-libre text-red-900 font-normal text-[12px]">
                  {getReadableDate(createdAt)}
                </p>
              </div>
            )
          })
        ) : (
          <div className="py-8 text-center">
            <p className="text-sm text-grey-600">No prescriptions yet.</p>
          </div>
        )}
      </div>

      <InputField
        label="Dosage"
        name="dosage"
        placeholder="2"
        value={inputValue.dosage}
        onChange={handleChange}
      />
      <InputField
        label="Frequency"
        name="frequency"
        placeholder="One in the morning"
        value={inputValue.frequency}
        onChange={handleChange}
      />
      <InputField
        label="Duration"
        name="duration"
        placeholder="7 days"
        value={inputValue.duration}
        onChange={handleChange}
      />
      <TextArea
        placeholder="Issue a prescription"
        label="Prescription"
        name="prescription"
        value={inputValue.prescription}
        onChange={handleChange}
      />

      <div className="flex justify-end mt-3">
        <button
          className="bg-red-800 text-white font-medium rounded-lg px-5 py-2 disabled:opacity-70 disabled:cursor-not-allowed"
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitDisabled}
        >
          {prescription.isPending ? "Adding...." : "Add Prescription"}
        </button>
      </div>
    </div>
  )
}

export default Prescription
