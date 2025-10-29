// bookit-backend/src/models/Booking.ts

import mongoose, { Schema } from "mongoose";
import { IBooking } from "../types";

const BookingSchema: Schema = new Schema(
  {
    experienceId: {
      type: Schema.Types.ObjectId,
      ref: "Experience",
      required: true,
    },
    fullName: {
      type: String,
      required: [true, "Please add your full name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Please add a valid email"],
    },
    date: {
      type: Date,
      required: [true, "Please select a date"],
    },
    time: {
      type: String,
      required: [true, "Please select a time slot"],
    },
    quantity: {
      type: Number,
      required: [true, "Please specify the number of people"],
      min: [1, "Quantity must be at least 1"],
    },
    promoCode: {
      type: String,
      default: null,
    },
    subtotal: {
      type: Number,
      required: true,
    },
    taxes: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    bookingId: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IBooking>("Booking", BookingSchema);