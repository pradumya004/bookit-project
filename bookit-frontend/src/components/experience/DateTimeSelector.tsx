// bookit-frontend/src/components/experience/DateTimeSelector.tsx

import React from "react";
import type { Slot } from "../../types";
import { formatTime } from "../../utils/formatters";

interface DateTimeSelectorProps {
  slots: Slot[];
  selectedDate: string | null;
  selectedTime: string | null;
  onSelectDate: (date: string) => void;
  onSelectTime: (time: string) => void;
}

const DateTimeSelector: React.FC<DateTimeSelectorProps> = ({
  slots,
  selectedDate,
  selectedTime,
  onSelectDate,
  onSelectTime,
}) => {
  // Debug output to console
  console.log("Slots data:", JSON.stringify(slots, null, 3));
  console.log("Selected date:", selectedDate);

  // Find times for selected date
  const selectedSlot = selectedDate
    ? slots.find((slot) => {
        // Convert MongoDB date to YYYY-MM-DD format for comparison
        const slotDate = new Date(slot.date);
        const slotDateStr = slotDate.toISOString().split("T")[0];
        const selectedDateStr = new Date(selectedDate)
          .toISOString()
          .split("T")[0];
        console.log(`Comparing: ${slotDateStr} with ${selectedDateStr}`);
        return slotDateStr === selectedDateStr;
      })
    : null;

  console.log("Selected slot:", selectedSlot);

  return (
    <div className="w-full">
      <div className="mb-6">
        <h3 className="text-base font-medium mb-2">Choose date</h3>
        <div className="flex overflow-x-auto space-x-2 pb-2">
          {slots.map((slot) => {
            // Format date for display (Oct 22, Oct 23, etc.)
            const dateObj = new Date(slot.date);

            // For comparison to determine if this date is selected
            const slotDateStr = dateObj.toISOString().split("T")[0];
            const isSelected = selectedDate
              ? new Date(selectedDate).toISOString().split("T")[0] ===
                slotDateStr
              : false;

            return (
              <button
                key={slotDateStr}
                onClick={() => onSelectDate(slot.date)}
                className={`flex-shrink-0 py-2 px-3 rounded-md ${
                  isSelected
                    ? "bg-yellow-400 text-black"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {`Oct ${dateObj.getDate()}`}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-base font-medium mb-2">Choose time</h3>
        {selectedSlot ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {selectedSlot.times.map((timeSlot) => {
              console.log(
                `Time slot: ${timeSlot.time}, Available: ${timeSlot.available}`
              );
              return (
                <button
                  key={timeSlot.time}
                  onClick={() => onSelectTime(timeSlot.time)}
                  disabled={timeSlot.available <= 0}
                  className={`py-2 px-3 rounded-md flex flex-col items-center justify-center ${
                    selectedTime === timeSlot.time
                      ? "bg-yellow-400 text-black"
                      : timeSlot.available <= 0
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <span>{formatTime(timeSlot.time)}</span>
                  <span className="text-xs mt-1">
                    {timeSlot.available <= 0
                      ? "Sold out"
                      : `${timeSlot.available} left`}
                  </span>
                </button>
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-gray-500">Please select a date first</p>
        )}
        <p className="text-xs text-gray-500 mt-2">
          All times are in IST (GMT +5:30)
        </p>
      </div>

      <div className="mb-6">
        <h3 className="text-base font-medium mb-2">About</h3>
        <div className="bg-gray-100 p-3 rounded-md text-sm">
          <p>
            Scenic routes, trained guides, and safety briefing. Minimum age 10.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DateTimeSelector;
