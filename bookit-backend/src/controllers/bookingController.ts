// bookit-backend/src/controllers/bookingController.ts

import { Request, Response, NextFunction } from "express";
import Experience from "../models/Experience";
import Booking from "../models/Booking";
import PromoCode from "../models/PromoCode";
import {
  generateBookingId,
  calculateTaxes,
  applyPromoDiscount,
  isSlotAvailable,
} from "../utils/helpers";

// @desc    Create a new booking
// @route   POST /api/bookings
// @access  Public
export const createBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { experienceId, fullName, email, date, time, quantity, promoCode } =
      req.body;

    // Check if experience exists
    const experience = await Experience.findById(experienceId);
    if (!experience) {
      return res.status(404).json({
        success: false,
        error: "Experience not found",
      });
    }

    // Convert date string to Date object
    const bookingDate = new Date(date);

    // Find the slot for the requested date
    const slot = experience.slots.find(
      (s) =>
        s.date.toISOString().split("T")[0] ===
        bookingDate.toISOString().split("T")[0]
    );

    if (!slot) {
      return res.status(400).json({
        success: false,
        error: "Selected date is not available",
      });
    }

    // Check if requested time slot is available and has enough seats
    const timeSlot = slot.times.find((t) => t.time === time);

    // Validate availability
    if (!timeSlot) {
      return res.status(400).json({
        success: false,
        error: "Selected time is not available",
      });
    }

    // Validate quantity - IMPORTANT CHECK
    if (timeSlot.available < quantity) {
      return res.status(400).json({
        success: false,
        error: `Only ${timeSlot.available} spots available for this time slot`,
      });
    }

    // If we made it here, the requested slots are available
    // Calculate pricing
    let subtotal = experience.price * quantity;
    let discount = 0;

    // Apply promo code if provided
    if (promoCode) {
      const promo = await PromoCode.findOne({
        code: promoCode,
        isActive: true,
        expiryDate: { $gt: new Date() },
      });

      if (promo) {
        if (promo.type === "percentage") {
          discount = (subtotal * promo.value) / 100;
        } else {
          discount = promo.value;
        }

        subtotal = Math.max(0, subtotal - discount);
      }
    }

    const taxes = calculateTaxes(subtotal);
    const total = subtotal + taxes;

    // Create a unique booking ID
    const bookingId = generateBookingId();

    // Create booking
    const booking = await Booking.create({
      experienceId,
      fullName,
      email,
      date: bookingDate,
      time,
      quantity,
      promoCode: promoCode || null,
      subtotal,
      taxes,
      total,
      bookingId,
    });

    // Update availability (reduce available seats)
    timeSlot.available -= quantity;
    await experience.save();

    res.status(201).json({
      success: true,
      data: {
        bookingId: booking.bookingId,
        experienceTitle: experience.title,
        date: booking.date,
        time: booking.time,
        quantity: booking.quantity,
        subtotal: booking.subtotal,
        taxes: booking.taxes,
        total: booking.total,
      },
    });
  } catch (error) {
    next(error);
  }
};
