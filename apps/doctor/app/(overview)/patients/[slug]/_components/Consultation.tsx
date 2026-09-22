"use client"

import React, { useState } from "react"

import TextArea from "@/lib/components/ui/TextArea"
import useCreateConsultation from "@/lib/hooks/useCreateConsultation"
import { Appointment } from "@/lib/interface/doctor-apppointment.interface"
import useGetDate from "@/lib/hooks/useGetDate"
import { CapitalizeName } from "@/lib/constant/capitalizeName"

const Consultation = ({
  id,
  appointmentDetails,
  isLoading,
}: {
  id: string
  appointmentDetails: Appointment
  isLoading: boolean
}) => {
  const [inputValue, setInputValue] = useState("")

  const { consultationNote } = useCreateConsultation(id)

  const consultations = appointmentDetails?.consultationNotes ?? []

  const { getReadableDate } = useGetDate()

  const handleSubmit = async () => {
    const data = {
      consultationNote: inputValue,
    }

    await consultationNote.mutateAsync(data)

    setInputValue("")
  }

  return (
    <div>
      <div className="flex-1 overflow-y-auto p-4 pt-0 border border-borderColor mb-5">
        {isLoading ? (
          <ConsultationSkeleton />
        ) : consultations.length > 0 ? (
          consultations.map((consultation: any) => {
            const {
              createdAt,
              consultationNote: note,
              id,
            } = consultation

            return (
              <div
                key={id}
                className="flex items-center justify-between p-3"
              >
                <div className="flex items-center">
                  <p className="h-10 w-[6px] bg-red-200 rounded-lg" />

                  <div className="ml-3">
                    <p className="font-libre text-[14px] font-medium text-grey-50">
                      {CapitalizeName(note)}
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
            <p className="text-sm text-grey-600">
              No consultation notes yet.
            </p>
          </div>
        )}
      </div>

      <TextArea
        placeholder="Consultation note for patient..."
        label="Consultation Note"
        value={inputValue}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setInputValue(e.target.value)
        }
      />

      <div className="flex justify-end mt-3">
        <button
          className={`${
            consultationNote.isPending ? "bg-red-200" : "bg-red-800"
          } text-white font-medium rounded-lg px-5 py-2`}
          type="button"
          onClick={handleSubmit}
          disabled={consultationNote.isPending || !inputValue.trim()}
        >
          {consultationNote.isPending ? "Adding..." : "Add Note"}
        </button>
      </div>
    </div>
  )
}

const ConsultationSkeleton = () => {
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
              {/* Consultation note */}
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

export default Consultation