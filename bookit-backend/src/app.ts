// bookit-backend/src/app.ts

import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import experienceRoutes from "./routes/experienceRoutes";
import bookingRoutes from "./routes/bookingRoutes";
import promoRoutes from "./routes/promoRoutes";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

// Middleware
app.use(
  cors({
    origin: ["https://bookit-project-seven.vercel.app", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

// Routes
app.use("/api/experiences", experienceRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/promo", promoRoutes);

// Base route
app.get("/", (req: Request, res: Response) => {
  res.send("BookIt API is running...");
});

// Error handling middleware
app.use(errorHandler);

export default app;


