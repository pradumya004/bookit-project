// bookit-backend/src/routes/experienceRoutes.ts

import { Router } from "express";
import {
  getExperiences,
  getExperienceById,
} from "../controllers/experienceController";
import { validateExperienceId } from "../middleware/validator";

const router = Router();

router.route("/").get(getExperiences);
router.route("/:id").get(validateExperienceId, getExperienceById);

export default router;