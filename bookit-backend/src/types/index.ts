// bookit-backend/src/types/index.ts

import { Document } from "mongoose";

export interface IExperience extends Document {
  title: string;
  description: string;
  location: string;
  price: number;
  imageUrl: string;
  slots: {
    date: Date;
    times: {
      time: string;
      available: number;
    }[];
  }[];
}

export interface IBooking extends Document {
  experienceId: string;
  fullName: string;
  email: string;
  date: Date;
  time: string;
  quantity: number;
  promoCode?: string;
  subtotal: number;
  taxes: number;
  total: number;
  bookingId: string;
  createdAt: Date;
}

export interface IPromoCode extends Document {
  code: string;
  type: "percentage" | "fixed";
  value: number;
  expiryDate: Date;
  isActive: boolean;
}