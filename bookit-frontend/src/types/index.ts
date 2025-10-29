// bookit-frontend/src/types/index.ts

export interface TimeSlot {
  time: string;
  available: number;
}

export interface Slot {
  date: string;
  times: TimeSlot[];
}

export interface Experience {
  _id: string;
  title: string;
  description: string;
  location: string;
  price: number;
  imageUrl: string;
  slots?: Slot[];
}

export interface ExperienceSummary {
  _id: string;
  title: string;
  location: string;
  price: number;
  imageUrl: string;
}

// Booking Types
export interface BookingFormData {
  fullName: string;
  email: string;
  experienceId: string;
  date: string;
  time: string;
  quantity: number;
  promoCode?: string;
}

export interface BookingDetails {
  bookingId: string;
  experienceTitle: string;
  date: string;
  time: string;
  quantity: number;
  subtotal: number;
  taxes: number;
  total: number;
}

// Promo Code Types
export interface PromoCode {
  code: string;
  type: "percentage" | "fixed";
  value: number;
  discount: number;
  discountedSubtotal: number;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  count?: number;
  data: T;
  error?: string;
}

// Context Types
export interface BookingContextType {
  selectedExperience: Experience | null;
  selectedDate: string | null;
  selectedTime: string | null;
  quantity: number;
  promoCode: string;
  bookingDetails: BookingDetails | null;
  setSelectedExperience: (experience: Experience | null) => void;
  setSelectedDate: (date: string | null) => void;
  setSelectedTime: (time: string | null) => void;
  setQuantity: (quantity: number) => void;
  setPromoCode: (code: string) => void;
  setBookingDetails: (details: BookingDetails | null) => void;
  resetBooking: () => void;
}