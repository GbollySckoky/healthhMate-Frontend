"use client"
import React, { ReactNode } from "react";
import { Plus } from 'lucide-react';

/**
 * PatientUIComponents
 * --------------------
 * Web (React + Tailwind) port of the React Native component library.
 * Behavior/props are kept 1:1 with the RN version so call sites don't
 * need to change much beyond swapping the import.
 *
 * Requires the following in tailwind.config.js (see bottom of file).
 */

/* ---------------------------------- Layout ---------------------------------- */

interface PageWrapperProps {
  children: ReactNode;
  /** Tailwind max-width class. Defaults to a standard dashboard width. */
  maxWidth?: string;
  className?: string;
}

export function PageWrapper({
  children,
  maxWidth = "max-w-5xl",
  className = "",
}: PageWrapperProps) {
  return (
    <div
      className={`w-full ${maxWidth} mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 ${className}`}
    >
      {children}
    </div>
  );
}

export const Wrapper = ({ children }: { children: ReactNode }) => (
  <div className="w-[92%] mx-auto mt-[15px] text-[#414651] pb-5 pt-[10px]">
    {children}
  </div>
);

export const DetailsContainer = ({ children }: { children: ReactNode }) => (
  <div className="flex flex-col justify-center items-center mb-5 py-[5px] flex-1">
    {children}
  </div>
);

export const Card = ({ children }: { children: ReactNode }) => (
  <div className="p-[15px] border border-[#F2F2F2] rounded-[10px] bg-white">
    {children}
  </div>
);

interface MinCardProps {
  children: ReactNode;
  className?: string;
}

export const MinCard = ({ children, className = "" }: MinCardProps) => (
  <div className={className}>{children}</div>
);

/* ----------------------------------- Text ----------------------------------- */

export const Title = ({ children }: { children: ReactNode }) => (
  <span className="block text-lg font-semibold mb-[3px] text-black font-libre">
    {children}
  </span>
);

export const MinTitle = ({ children }: { children: ReactNode }) => (
  <span className="block text-lg font-semibold font-libre">
    {children}
  </span>
);

export const Texts = ({ children }: { children: ReactNode }) => (
  <span className="font-libre text-sm text-[#717680] font-normal not-italic">
    {children}
  </span>
);

export const SmallText = ({ children }: { children: ReactNode }) => (
  <span className="font-libre text-xs text-[#717680] font-normal not-italic">
    {children}
  </span>
);

export const HeaderText = ({ children }: { children: ReactNode }) => (
  <span>{children}</span>
);

export const SubTitle = ({ children }: { children: ReactNode }) => (
  <span className="block font-libre text-sm text-black font-semibold">
    {children}
  </span>
);

export const SubTitles = ({ children }: { children: ReactNode }) => (
  <span className="block font-libre text-sm text-[#414651] font-medium mb-[10px] mt-[10px]">
    {children}
  </span>
);

export const CardTitle = ({ children }: { children: ReactNode }) => (
  <span className="font-inter text-xs text-[#414651] font-normal not-italic">
    {children}
  </span>
);

export const CardText = ({ children }: { children: ReactNode }) => (
  <span className="font-inter text-[10px] text-[#717680] font-normal">
    {children}
  </span>
);

export const CardAmount = ({ children }: { children: ReactNode }) => (
  <span className="block text-xl font-semibold font-libre py-1 text-black">
    {children}
  </span>
);

export const Status = ({ children }: { children: ReactNode }) => (
  <span className="inline-flex items-center justify-center text-[#5924DC] bg-[#F4F3FF] rounded-[10px] p-[10px] font-medium text-xs text-center h-[35px] font-inter-medium">
    {children}
  </span>
);

export const LatoText = ({ children }: { children: ReactNode }) => (
  <span className="block font-lato font-normal text-[#414651] mb-[10px] mt-5">
    {children}
  </span>
);


export const Button = ({
  children,
  _fn,
}: {
  children: ReactNode;
  _fn: () => void;
}) => (
  <div className="fixed inset-0 pointer-events-none">
    <button
      onClick={_fn}
      className="
        absolute bottom-6 right-5 w-[200px]
        bg-[#DD2590] py-[15px] rounded-[10px]
        flex items-center justify-center
        pointer-events-auto
      "
    >
      <Plus size={20} color="white" className="mr-[5px]" />
      <span className="text-white font-semibold text-sm">{children}</span>
    </button>
  </div>
);
/* ---------------------------------- Buttons ---------------------------------- */

interface ButtonRowGroupProps {
  children: ReactNode;
}

/** Wraps action buttons with a top divider (was style.ButtonRow) */
export const ButtonFlex = ({ children }: ButtonRowGroupProps) => (
  <div className="flex flex-row justify-between items-center gap-[10px] border-t-2 border-t-[#F8F8F8] mt-[15px]">
    {children}
  </div>
);

/** Wraps action buttons without a divider (was style.ButtonFlex) */
export const BtnFlex = ({ children }: ButtonRowGroupProps) => (
  <div className="flex flex-row justify-between gap-[10px] mt-[45px]">
    {children}
  </div>
);

interface ActionButtonProps {
  children: ReactNode;
  _fn: () => void;
  disabled?: boolean;
}

export const RescheduleBtn = ({ children, _fn, disabled }: ActionButtonProps) => (
  <button
    type="button"
    onClick={_fn}
    disabled={disabled}
    className="flex-1 flex items-center justify-center py-3 bg-[#FAFAFA] rounded-lg border border-[#D6D7DA] disabled:opacity-50 disabled:cursor-not-allowed"
  >
    <span className="text-sm font-semibold font-inter-semibold text-[#252B37]">
      {children}
    </span>
  </button>
);

export const JoinBtn = ({ children, _fn, disabled }: ActionButtonProps) => (
  <button
    type="button"
    onClick={_fn}
    disabled={disabled}
    className="flex-1 flex items-center justify-center py-3 bg-[#DD2591] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
  >
    <span className="text-sm font-semibold font-inter-semibold text-white">
      {children}
    </span>
  </button>
);

/** Static "Reschedule" button, no props (matches original ButtonRow component) */
export const ButtonRow = () => (
  <button
    type="button"
    className="flex items-center justify-center py-3 bg-[#FAFAFA] rounded-lg border border-[#D6D7DA]"
  >
    <span className="text-sm font-semibold font-inter-semibold text-[#252B37]">
      Reschedule
    </span>
  </button>
);

interface SubmitButtonProps {
  children: ReactNode;
  _fn: () => void;
  disabled?: boolean;
}

export const SubmitButton = ({ children, _fn, disabled }: SubmitButtonProps) => (
  <button
    type="button"
    onClick={_fn}
    disabled={disabled}
    className="w-full flex items-center justify-center rounded-[10px] bg-[#DD2590] p-[13px] mx-auto mt-[30px] mb-5 disabled:opacity-50 disabled:cursor-not-allowed"
  >
    <span className="text-sm text-white font-semibold font-inter-semibold">
      {children}
    </span>
  </button>
);

/* -------------------------------------------------------------------------- */
/*
tailwind.config.js — add this so the font-* classes above resolve:

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        "libre-semibold": ["LibreFranklin_600SemiBold", "sans-serif"],
        libre: ["Libre-Franklin", "sans-serif"],
        inter: ["Inter_400Regular", "sans-serif"],
        "inter-medium": ["Inter_500Medium", "sans-serif"],
        "inter-semibold": ["Inter_600SemiBold", "sans-serif"],
        lato: ["Lato_400Regular", "sans-serif"],
      },
    },
  },
};

Also make sure the actual font files/weights are loaded via @font-face
(or next/font, if this is a Next.js project) — Tailwind's fontFamily
classes only set the font-family, they don't load the files.
*/