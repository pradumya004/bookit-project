// bookit-backend/src/middleware/validator.ts

import { Request, Response, NextFunction } from "express";

export const validateExperienceId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({
      success: false,
      error: "Invalid experience ID format",
    });
  }

  next();
};

export const validateBookingData = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { fullName, email, experienceId, date, time, quantity } = req.body;

  if (!fullName || !email || !experienceId || !date || !time || !quantity) {
    return res.status(400).json({
      success: false,
      error: "Please provide all required booking information",
    });
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      error: "Please provide a valid email address",
    });
  }

  next();
};

export const validatePromoCode = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { code } = req.body;

  if (!code || typeof code !== "string") {
    return res.status(400).json({
      success: false,
      error: "Please provide a valid promo code",
    });
  }

  next();
};