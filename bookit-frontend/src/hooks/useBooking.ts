// bookit-frontend/src/hooks/useBooking.ts

import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import type { BookingFormData, BookingDetails, PromoCode } from "../types";
import { createBooking } from "../services/bookingService";
import { validatePromoCode } from "../services/promoService";
import { useBookingContext } from "../context/BookingContext";

export const useBooking = () => {
  const navigate = useNavigate();
  const {
    selectedExperience,
    selectedDate,
    selectedTime,
    quantity,
    promoCode,
    setBookingDetails,
    resetBooking,
  } = useBookingContext();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [promoDiscount, setPromoDiscount] = useState<PromoCode | null>(null);
  const [validatingPromo, setValidatingPromo] = useState<boolean>(false);
  const [promoError, setPromoError] = useState<string | null>(null);

  // Calculate pricing
  const calculatePricing = useCallback(() => {
    if (!selectedExperience) return { subtotal: 0, taxes: 0, total: 0 };

    let subtotal = selectedExperience.price * quantity;

    // Apply promo discount if available
    if (promoDiscount) {
      subtotal = promoDiscount.discountedSubtotal;
    }

    // Calculate taxes (6%)
    const taxes = Math.round(subtotal * 0.06);

    // Calculate total
    const total = subtotal + taxes;

    return { subtotal, taxes, total };
  }, [selectedExperience, quantity, promoDiscount]);

  // Validate promo code
  const validatePromo = useCallback(
    async (code: string) => {
      if (!code.trim() || !selectedExperience) {
        setPromoError("Invalid promo code");
        return;
      }

      try {
        setValidatingPromo(true);
        setPromoError(null);

        const subtotal = selectedExperience.price * quantity;
        const response = await validatePromoCode(code, subtotal);

        setPromoDiscount(response.data);
        return response.data;
      } catch (err: any) {
        const errorMsg =
          err && typeof err === "object" && "error" in err
            ? String(err.error)
            : "Failed to validate promo code";
        setPromoError(errorMsg);
        setPromoDiscount(null);
        return null;
      } finally {
        setValidatingPromo(false);
      }
    },
    [selectedExperience, quantity]
  );

  // Submit booking - THE KEY FUNCTION TO FIX
  const submitBooking = useCallback(
    async (formData: Partial<BookingFormData>) => {
      console.log("Submit booking called with data:", formData);

      if (!selectedExperience || !selectedDate || !selectedTime) {
        setError("Missing required booking information");
        console.error("Missing required booking info");
        return;
      }

      try {
        setLoading(true);
        setError(null);
        console.log("Preparing booking data...");

        const bookingData: BookingFormData = {
          fullName: formData.fullName || "",
          email: formData.email || "",
          experienceId: selectedExperience._id,
          date: selectedDate,
          time: selectedTime,
          quantity,
          promoCode: promoCode || undefined,
        };

        console.log("Submitting booking:", bookingData);
        const response = await createBooking(bookingData);
        console.log("Booking successful, response:", response);

        // Set the booking details in context
        setBookingDetails(response.data);

        // Navigate to confirmation page
        console.log("Navigating to confirmation page...");
        navigate("/confirmation");
      } catch (err: any) {
        console.error("Booking error:", err);
        const errorMsg =
          err && typeof err === "object" && "error" in err
            ? String(err.error)
            : "Failed to create booking";
        setError(errorMsg);
      } finally {
        setLoading(false);
      }
    },
    [
      selectedExperience,
      selectedDate,
      selectedTime,
      quantity,
      promoCode,
      setBookingDetails,
      navigate,
    ]
  );

  return {
    loading,
    error,
    promoDiscount,
    validatingPromo,
    promoError,
    calculatePricing,
    validatePromo,
    submitBooking,
    resetBooking,
  };
};