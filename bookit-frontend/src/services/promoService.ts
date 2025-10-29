// bookit-frontend/src/services/promoService.ts

import api from "./api";
import type { ApiResponse, PromoCode } from "../types";

// Validate a promo code
export const validatePromoCode = async (
  code: string,
  subtotal: number
): Promise<ApiResponse<PromoCode>> => {
  const response = await api.post("/promo/validate", { code, subtotal });
  return response.data;
};