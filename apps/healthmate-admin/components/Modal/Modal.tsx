"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

interface ModalOptions {
  title?: string;
  description?: string;
  className?: string;
  onClose?: () => void;
}

interface ModalContextType {
  openModal: (content: ReactNode, options?: ModalOptions) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ReactNode>(null);
  const [modalConfig, setModalConfig] = useState<ModalOptions>({});

  useEffect(() => {
    setMounted(true);
  }, []);

  const openModal = useCallback(
    (content: ReactNode, options: ModalOptions = {}) => {
      setModalContent(content);
      setModalConfig(options);
      setIsOpen(true);
    },
    [],
  );

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setModalContent(null);

    setModalConfig((currentConfig) => {
      currentConfig.onClose?.();
      return {};
    });
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeModal]);

  const modal =
    mounted && isOpen
      ? createPortal(
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/25 p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby={
              modalConfig.title ? "global-modal-title" : undefined
            }
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                closeModal();
              }
            }}
          >
            <div
              className={`relative flex max-h-[90vh] w-full flex-col overflow-hidden rounded-lg bg-white shadow-xl ${
                modalConfig.className ?? "max-w-3xl"
              }`}
              onMouseDown={(event) => event.stopPropagation()}
            >
              {(modalConfig.title || modalConfig.description) && (
                <div className="border-b p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      {modalConfig.title && (
                        <h2
                          id="global-modal-title"
                          className="font-lato text-xl font-medium text-[#1E1E1E]"
                        >
                          {modalConfig.title}
                        </h2>
                      )}

                      {modalConfig.description && (
                        <p className="mt-2 text-sm text-gray-500">
                          {modalConfig.description}
                        </p>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={closeModal}
                      className="rounded-md p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                      aria-label="Close modal"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>
              )}

              <div className="flex-1 overflow-y-auto p-6 text-sm">
                {modalContent}
              </div>
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {modal}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("useModal must be used inside ModalProvider");
  }

  return context;
};