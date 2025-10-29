// bookit-backend/src/models/PromoCode.ts

import mongoose, { Schema } from "mongoose";
import { IPromoCode } from "../types";

const PromoCodeSchema: Schema = new Schema(
  {
    code: {
      type: String,
      required: [true, "Please add a code"],
      unique: true,
      trim: true,
      uppercase: true,
    },
    type: {
      type: String,
      required: [true, "Please specify discount type"],
      enum: ["percentage", "fixed"],
    },
    value: {
      type: Number,
      required: [true, "Please add a discount value"],
      min: [0, "Value must be at least 0"],
    },
    expiryDate: {
      type: Date,
      required: [true, "Please add an expiry date"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IPromoCode>("PromoCode", PromoCodeSchema);