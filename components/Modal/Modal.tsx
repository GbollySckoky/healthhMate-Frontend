'use client'
import React, { createContext, useState, ReactNode, useContext } from 'react';

// Modal Context Type
interface ModalContextType {
  openModal: (
    // eslint-disable-next-line no-unused-vars
    content: ReactNode,
    // eslint-disable-next-line no-unused-vars
    options?: {
      title?: string;
      description?: string;
      className?: string;
      buttonName?: string;
      onClose?: () => void;
    },
  ) => void;
  closeModal: () => void;
}

// Create the context
const ModalContext = createContext<ModalContextType>({
  openModal: () => {},
  closeModal: () => {},
});

// Modal Provider Component
export const ModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ReactNode>(null);
  const [modalConfig, setModalConfig] = useState<{
    title?: string;
    description?: string;
    className?: string;
    buttonName?: string;
    onClose?: () => void;
    // eslint-disable-next-line indent
  }>({});

  const openModal = (
    content: ReactNode,
    options: {
      title?: string;
      description?: string;
      className?: string;
      buttonName?: string;
      onClose?: () => void;
    } = {},
  ) => {
    setModalContent(content);
    setModalConfig(options);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalContent(null);
    modalConfig.onClose?.();
    setModalConfig({});
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center outline-none focus:outline-none cursor-pointer scrollbar-custom"
          onClick={closeModal}
        >
          <div
            className="relative flex flex-col max-h-[60%] w-[90%] md:max-w-[60%] lg:w-full bg-white mx-auto border-0 rounded-lg shadow-lg outline-none focus:outline-none"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {/* Header */}
            {(modalConfig.title || modalConfig.description) && (
              <div className="p-5 border-b border-solid rounded-t">
                <div className="flex items-start justify-between ">
                  {modalConfig.title && (
                    <p className="text-xl font-medium text-[#1E1E1E] font-lato">
                      {modalConfig.title}
                    </p>
                  )}
                  <button
                    className="bg-transparent text-xl ml-9 border-0"
                    onClick={closeModal}
                  >
                    ×
                  </button>
                </div>
                {modalConfig.description && (
                  <p className="mt-2 text-sm text-gray-500">
                    {modalConfig.description}
                  </p>
                )}
              </div>
            )}

            {/* Content */}
            {modalContent && (
              <div className="w-full relative flex-auto p-6 overflow-y-auto text-sm scrollbar-custom">
                {modalContent}
              </div>
            )}

            {/* Footer */}
            <div className="flex items-center p-6 border-t border-solid rounded-b border-blueGray-200">
              <button
                className="px-6 py-2 mb-1 mr-1 text-sm font-medium text-[#414651] border border-borderColor100 rounded-lg
                   outline-none background-transparent focus:outline-none"
                type="button"
                onClick={closeModal}
              >
                {modalConfig?.buttonName ? modalConfig.buttonName : 'Cancel'}
              </button>
            </div>
          </div>
        </div>
      )}
      {isOpen && <div className="fixed inset-0 z-40 bg-black opacity-25"></div>}
    </ModalContext.Provider>
  );
};

// Custom hook to use the modal
export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
