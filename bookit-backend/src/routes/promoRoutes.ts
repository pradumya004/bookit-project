// bookit-backend/src/routes/promoRoutes.ts

import { Router } from "express";
import { validatePromoCode } from "../controllers/promoController";
import { validatePromoCode as validatePromoMiddleware } from "../middleware/validator";

const router = Router();

router.route("/validate").post(validatePromoMiddleware, validatePromoCode);

export default router;