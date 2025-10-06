"use client"
import React, { useCallback, useState } from 'react'

const useStep = () => {
    const [step, setStep] = useState(0)

    const handleNextStep = useCallback(() => {
      setStep((prev) => prev + 1)
    },[])

    const handlePreviousStep = useCallback(() => {
        setStep((prev) => prev - 1)
    },[])
  return {
    step,
    handleNextStep,
    handlePreviousStep
  }
}

export default useStep