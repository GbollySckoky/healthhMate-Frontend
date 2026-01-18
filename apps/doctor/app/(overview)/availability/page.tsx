"use client"
import { PageWrapper } from '@/components/ui/Reusable';
import React, { useState } from 'react'
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { ChevronRight, ChevronLeft } from 'lucide-react'
import { cn } from '@/lib/utils';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;
const page = ({
    className,
    classNames,
    showOutsideDays = false,
    ...props
  }: CalendarProps) => {
    const [selected, setSelected] = useState<Date>();
  return (
    <PageWrapper className='bg-slate-950 '>
    <DayPicker
        navLayout="around"
        showOutsideDays={showOutsideDays}
    //   mode="single"
    //   selected={selected}
    //   onSelect={setSelected}
    //   footer={
    //     selected ? `Selected: ${selected.toLocaleDateString()}` : "Pick a day."
    //   }
      classNames={{
        root: "w-full h-full m-0 p-0 bg-red-800 max-w-none",
        month: "relative w-full flex flex-col m-0 p-0",

        chevron: "size-5 hover:text-foreground cursor-pointer",

        month_caption: "flex justify-center items-center",
        caption_label: "text-sm",

        button_previous: "absolute left-0 top-0",
        button_next: "absolute right-0 top-0",

        weekdays:
          "flex items-center justify-between w-full w-fit m-0 my-2 px-1",
        weekday:
          "size-6 grid place-items-center text-sm text-foreground font-medium p-0",

        weeks: "flex flex-col gap-y-2 w-full px-1",
        week: "flex justify-between",

        day: cn(
          "size-6 grid place-items-center rounded-sm text-sm leading-none",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        ),
        day_button: "w-full h-full rounded-sm",

        selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground cursor-pointer",
        today: "bg-accent text-accent-foreground",
        outside:
          "text-muted-foreground aria-selected:text-muted-foreground opacity-70",
        disabled: "opacity-50 text-muted-foreground cursor-not-allowed",
        hidden: "invisible",

        ...classNames,
      }}
      components={{
        Chevron: ({ orientation, className, ...props }) =>
          orientation === "left" ? (
            <ChevronLeft
              className={ "stroke-1 size-5"}
              {...props}
            />
          ) : (
            <ChevronRight
              className={"stroke-1 size-5"}
              {...props}
            />
          ),
      }}
      {...props}
    />
    </PageWrapper>
  )
}

export default page