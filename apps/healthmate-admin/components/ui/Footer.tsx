import React from 'react'

type FooterProps = {
  cancelText: string;
  text: string;
  closeModal: () => void;
  isLoading?: boolean;
  disabled?: boolean;
};

const Footer: React.FC<FooterProps> = ({ cancelText, text, closeModal, isLoading, disabled }) => {
  return (
    <div className="flex items-center justify-between gap-2 pt-3 bg-white border-t mt-10 sticky bottom-0  z-10">
      <button
        type="button"
        className="px-4 py-2 text-sm font-medium text-[#414651] border rounded-lg"
        onClick={closeModal}
      >
        {cancelText}
      </button>

      <button
        type="submit"
        className={`text-white ${isLoading || disabled ? 'bg-pink-300 cursor-not-allowed' : 'bg-pink-600'} rounded-lg px-4 py-2`}
        disabled={isLoading || disabled}
      >
        {isLoading ? 'Loading...' : text}
      </button>
    </div>
  )
}

export default Footer
