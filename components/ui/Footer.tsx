import React from 'react'

const Footer = ({cancelText, text, closeModal}:{cancelText: string, text: string, closeModal: () => void }) => {
  return (
    <div className="flex items-center justify-between gap-2 pt-6 border-t mt-10 sticky bg-red-900 z-10 top-0">
    <button
      className="px-4 py-2 text-sm font-medium text-[#414651] border rounded-lg"
      onClick={closeModal}
    >
      {cancelText}
    </button>

      <button
        className="text-white bg-pink-600 rounded-lg px-4 py-2" type='submit'>
        {text}
      </button>
  </div>
  )
}

export default Footer