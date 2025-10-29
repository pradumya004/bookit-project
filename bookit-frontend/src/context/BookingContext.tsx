// bookit-frontend/src/context/BookingContext.tsx

import React, {
  createContext,
  useState,
  useContext,
  type ReactNode,
} from "react";
import type { Experience, BookingDetails, BookingContextType } from "../types";

// Create context with default values
const BookingContext = createContext<BookingContextType>({
  selectedExperience: null,
  selectedDate: null,
  selectedTime: null,
  quantity: 1,
  promoCode: "",
  bookingDetails: null,
  setSelectedExperience: () => {},
  setSelectedDate: () => {},
  setSelectedTime: () => {},
  setQuantity: () => {},
  setPromoCode: () => {},
  setBookingDetails: () => {},
  resetBooking: () => {},
});

// BookingProvider props type
interface BookingProviderProps {
  children: ReactNode;
}

// BookingProvider component
export const BookingProvider: React.FC<BookingProviderProps> = ({
  children,
}) => {
  // State variables for booking process
  const [selectedExperience, setSelectedExperience] =
    useState<Experience | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [promoCode, setPromoCode] = useState<string>("");
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(
    null
  );

  // Reset booking state
  const resetBooking = () => {
    setSelectedExperience(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setQuantity(1);
    setPromoCode("");
    setBookingDetails(null);
  };

  // Context value
  const value: BookingContextType = {
    selectedExperience,
    selectedDate,
    selectedTime,
    quantity,
    promoCode,
    bookingDetails,
    setSelectedExperience,
    setSelectedDate,
    setSelectedTime,
    setQuantity,
    setPromoCode,
    setBookingDetails,
    resetBooking,
  };

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
};

// Custom hook for using the booking context
export const useBookingContext = (): BookingContextType => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error("useBookingContext must be used within a BookingProvider");
  }
  return context;
};
