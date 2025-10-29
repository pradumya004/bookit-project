// bookit-frontend/src/services/bookingService.ts

import api from "./api";
import type { ApiResponse, BookingDetails, BookingFormData } from "../types";

// Create a new booking
export const createBooking = async (
  bookingData: BookingFormData
): Promise<ApiResponse<BookingDetails>> => {
  console.log("bookingService: Creating booking with data:", bookingData);
  try {
    const response = await api.post("/bookings", bookingData);
    console.log("bookingService: API response:", response.data);
    return response.data;
  } catch (error) {
    console.error("bookingService: Error creating booking:", error);
    throw error;
  }
};