// bookit-backend/src/routes/bookingRoutes.ts

import { Router } from "express";
import { createBooking } from "../controllers/bookingController";
import { validateBookingData } from "../middleware/validator";

const router = Router();

router.route("/").post(validateBookingData, createBooking);

export default router;