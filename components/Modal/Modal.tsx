'use client'
import React, { createContext, useState, ReactNode, useContext } from 'react';

interface ModalOptions {
  title?: string;
  description?: string;
  className?: string;
  cancelButtonName?: string;
  confirmButtonName?: string;
  onClose?: () => void;
  confirmDelete?: () => void;
}

interface ModalContextType {
  openModal: (content: ReactNode, options?: ModalOptions) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType>({
  openModal: () => {},
  closeModal: () => {},
});

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ReactNode>(null);
  const [modalConfig, setModalConfig] = useState<ModalOptions>({});

  const openModal = (content: ReactNode, options: ModalOptions = {}) => {
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
        <>
          <div
            className="fixed inset-0 z-50 flex items-center justify-center cursor-pointer"
            onClick={closeModal}
          >
            <div
              className="relative flex flex-col max-h-[60%] w-[90%] md:max-w-[60%] bg-white mx-auto rounded-lg shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              {(modalConfig.title || modalConfig.description) && (
                <div className="p-5 border-b">
                  <div className="flex items-start justify-between">
                    {modalConfig.title && (
                      <p className="text-xl font-medium text-[#1E1E1E]">{modalConfig.title}</p>
                    )}
                    <button className="text-xl ml-4" onClick={closeModal}>
                      ×
                    </button>
                  </div>
                  {modalConfig.description && (
                    <p className="mt-2 text-sm text-gray-500">{modalConfig.description}</p>
                  )}
                </div>
              )}

              {/* Content */}
              <div className="flex-auto p-6 overflow-y-auto text-sm">{modalContent}</div>

              {/* Footer */}
              <div className="flex items-center justify-between gap-2 p-6 border-t">
                <button
                  className="px-4 py-2 text-sm font-medium text-[#414651] border rounded-lg"
                  onClick={closeModal}
                >
                  {modalConfig.cancelButtonName ?? 'Cancel'}
                </button>

                {modalConfig.confirmDelete && (
                  <button
                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg"
                    onClick={() => {
                      modalConfig.confirmDelete?.();
                      closeModal();
                    }}
                  >
                    {modalConfig.confirmButtonName ?? 'Confirm'}
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="fixed inset-0 z-40 bg-black opacity-25" />
        </>
      )}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  return useContext(ModalContext);
};
