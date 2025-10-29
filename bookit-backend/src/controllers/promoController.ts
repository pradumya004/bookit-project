// bookit-backend/src/controllers/promoController.ts

import { Request, Response, NextFunction } from "express";
import PromoCode from "../models/PromoCode";

// @desc    Validate a promo code
// @route   POST /api/promo/validate
// @access  Public
export const validatePromoCode = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { code, subtotal } = req.body;

    if (!code) {
      return res.status(400).json({
        success: false,
        error: "Please provide a promo code",
      });
    }

    const promoCode = await PromoCode.findOne({
      code: code.toUpperCase(),
      isActive: true,
      expiryDate: { $gt: new Date() },
    });

    if (!promoCode) {
      return res.status(404).json({
        success: false,
        error: "Invalid or expired promo code",
      });
    }

    // Calculate discount
    let discount = 0;
    let discountedSubtotal = subtotal;

    if (promoCode.type === "percentage") {
      discount = (subtotal * promoCode.value) / 100;
      discountedSubtotal = subtotal - discount;
    } else {
      discount = promoCode.value;
      discountedSubtotal = Math.max(0, subtotal - discount);
    }

    res.status(200).json({
      success: true,
      data: {
        code: promoCode.code,
        type: promoCode.type,
        value: promoCode.value,
        discount,
        discountedSubtotal,
      },
    });
  } catch (error) {
    next(error);
  }
};