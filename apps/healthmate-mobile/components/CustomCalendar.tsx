import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface CalendarDay {
  dateString: string;
}

interface CustomCalendarType {
  isOpen: boolean;
  onChangeText: (day: CalendarDay) => void;
  onClose: () => void;
}

const CustomCalendar = ({ isOpen, onChangeText, onClose }: CustomCalendarType) => {
  const [viewDate, setViewDate] = useState<Date>(new Date());

  if (!isOpen) return null;

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const monthLabel = viewDate.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  const changeMonth = (delta: number) => {
    setViewDate(new Date(year, month + delta, 1));
  };

  const selectDay = (day: number) => {
    const dateObj = new Date(year, month, day);
    const dateString = dateObj.toISOString().split('T')[0];
    onChangeText({ dateString });
  };

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div
      className="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-lg p-4 w-[300px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-3">
          <button onClick={() => changeMonth(-1)} className="p-1 hover:bg-gray-100 rounded">
            <ChevronLeft size={18} />
          </button>
          <p className="text-sm font-semibold text-[#414651]">{monthLabel}</p>
          <button onClick={() => changeMonth(1)} className="p-1 hover:bg-gray-100 rounded">
            <ChevronRight size={18} />
          </button>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded ml-1">
            <X size={16} />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-1">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
            <div key={i} className="text-center text-xs text-[#717680] py-1">
              {d}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {cells.map((day, i) =>
            day ? (
              <button
                key={i}
                onClick={() => selectDay(day)}
                className="text-sm py-1.5 rounded hover:bg-[#DD2590] hover:text-white transition-colors"
              >
                {day}
              </button>
            ) : (
              <div key={i} />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomCalendar;