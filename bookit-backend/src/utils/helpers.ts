// bookit-backend/src/utils/helpers.ts

import crypto from "crypto";

// Generate a unique booking reference ID
export const generateBookingId = (): string => {
  // Generate a random string of 6 characters (alphanumeric)
  const randomPart = crypto.randomBytes(3).toString("hex").toUpperCase();

  // Add a prefix
  return `HUF${randomPart}`;
};

// Calculate taxes (assuming a 6% tax rate)
export const calculateTaxes = (subtotal: number): number => {
  return Math.round(subtotal * 0.06);
};

// Apply promo code discount
export const applyPromoDiscount = (
  subtotal: number,
  type: "percentage" | "fixed",
  value: number
): number => {
  if (type === "percentage") {
    return subtotal - subtotal * (value / 100);
  }

  // Fixed amount discount
  return Math.max(0, subtotal - value);
};

// Check if a slot is available
export const isSlotAvailable = (
  slot: {
    date: Date;
    times: {
      time: string;
      available: number;
    }[];
  },
  requestedTime: string,
  requestedQuantity: number
): boolean => {
  const timeSlot = slot.times.find((t) => t.time === requestedTime);

  if (!timeSlot) {
    return false;
  }

  return timeSlot.available >= requestedQuantity;
};