import React, { useState, useCallback } from 'react'

const useToggle = () => {
    const [isToggle, setIsToggle] = useState(false)

    const handleToggle = useCallback(() => {
        setIsToggle((prev) => !prev)
    },[])
  return {
    isToggle,
    handleToggle
  }
}

export default useToggle