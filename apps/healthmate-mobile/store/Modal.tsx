"use client";
import React, {
  ReactNode,
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { createPortal } from "react-dom";

/**
 * PREREQUISITES (web):
 * - No extra libraries required — this uses React state + CSS transitions.
 * - If you want real drag-to-dismiss gestures on the bottom sheet (the one
 *   thing this version can't replicate from @gorhom/bottom-sheet), swap the
 *   sheet markup for `vaul` (https://vaul.emilkowal.ski) — it's the closest
 *   web equivalent and plugs into this same context/API.
 */

type Presentation = "sheet" | "center";

interface ModalOptions {
  title?: string;
  description?: string;
  onClose?: () => void;
  presentation?: Presentation; // 'sheet' (default) = bottom drawer, 'center' = floating dialog
  dismissible?: boolean; // click backdrop / press Escape to close
}

interface ModalContextType {
  openModal: (content: ReactNode, options?: ModalOptions) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType>({
  openModal: () => {},
  closeModal: () => {},
});

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

const TRANSITION_MS = 250;

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [mounted, setMounted] = useState(false); // in DOM (during enter/exit transition)
  const [visible, setVisible] = useState(false); // drives the transition classes
  const [content, setContent] = useState<ReactNode>(null);
  const [config, setConfig] = useState<ModalOptions>({});
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const openModal = useCallback((newContent: ReactNode, options: ModalOptions = {}) => {
    const merged: ModalOptions = { dismissible: true, presentation: "sheet", ...options };
    setContent(newContent);
    setConfig(merged);
    setMounted(true);
    // next frame so the enter transition animates from its initial (closed) state
    requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
  }, []);

  const closeModal = useCallback(() => {
    setVisible(false);
    window.setTimeout(() => {
      setMounted(false);
      setConfig((prev) => {
        prev.onClose?.();
        return {};
      });
      setContent(null);
    }, TRANSITION_MS);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.body.style.overflow = "hidden";
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && config.dismissible !== false) closeModal();
    };
    document.addEventListener("keydown", handleKey);
    closeButtonRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKey);
    };
  }, [mounted, config.dismissible, closeModal]);

  const isSheet = config.presentation !== "center";

  const header = (config.title || config.description) && (
    <div className="px-5 pt-4 pb-4 border-b border-[#eeeeee] shrink-0">
      <div className="flex justify-between items-start">
        {config.title ? (
          <h2 className="text-[17px] font-semibold text-[#1a1a1a] flex-1 mr-4 line-clamp-2">
            {config.title}
          </h2>
        ) : (
          <div className="flex-1" />
        )}
        <button
          ref={closeButtonRef}
          type="button"
          onClick={closeModal}
          aria-label="Close modal"
          className="w-[30px] h-[30px] rounded-full bg-[#f5f5f5] hover:bg-[#e8e8e8] flex items-center justify-center shrink-0"
        >
          <span className="text-[15px] text-[#666666] font-medium">✕</span>
        </button>
      </div>
      {config.description && (
        <p className="text-sm text-[#666666] mt-1.5 leading-5">{config.description}</p>
      )}
    </div>
  );

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}

      {mounted &&
        typeof window !== "undefined" &&
        createPortal(
          <div className="fixed inset-0 z-50 flex" role="dialog" aria-modal="true">
            {/* Backdrop */}
            <div
              className={`absolute inset-0 bg-black/50 transition-opacity duration-[250ms] ${
                visible ? "opacity-100" : "opacity-0"
              }`}
              onClick={() => config.dismissible !== false && closeModal()}
            />

            {isSheet ? (
              // ---------- Bottom sheet ----------
              <div
                className={`relative mt-auto w-full bg-white rounded-t-[20px] shadow-[0_-4px_24px_rgba(0,0,0,0.15)] max-h-[85vh] flex flex-col transition-transform duration-[250ms] ease-out ${
                  visible ? "translate-y-0" : "translate-y-full"
                }`}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-center pt-2 pb-1 shrink-0">
                  <div className="w-10 h-1 rounded-full bg-[#d9d9d9]" />
                </div>
                {header}
                <div className="px-5 py-4 overflow-y-auto">{content}</div>
              </div>
            ) : (
              // ---------- Centered dialog ----------
              <div className="m-auto p-5 w-full flex items-center justify-center">
                <div
                  className={`bg-white rounded-2xl w-full max-w-[440px] max-h-[80vh] flex flex-col shadow-[0_2px_12px_rgba(0,0,0,0.15)] transition-all duration-[250ms] ${
                    visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
                  }`}
                  onClick={(e) => e.stopPropagation()}
                >
                  {header}
                  <div className="px-5 py-4 overflow-y-auto">{content}</div>
                </div>
              </div>
            )}
          </div>,
          document.body
        )}
    </ModalContext.Provider>
  );
};