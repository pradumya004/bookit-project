// bookit-backend/src/controllers/experienceController.ts

import { Request, Response, NextFunction } from "express";
import Experience from "../models/Experience";

// @desc    Get all experiences
// @route   GET /api/experiences
// @access  Public
export const getExperiences = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const experiences = await Experience.find().select(
      "title location price imageUrl"
    );

    res.status(200).json({
      success: true,
      count: experiences.length,
      data: experiences,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single experience with available slots
// @route   GET /api/experiences/:id
// @access  Public
export const getExperienceById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Add logging to see what's in the database
    console.log("Finding experience with ID:", req.params.id);
    const experience = await Experience.findById(req.params.id);

    if (!experience) {
      return res.status(404).json({
        success: false,
        error: "Experience not found",
      });
    }

    // Log the raw experience data from MongoDB
    // console.log("Raw experience data:", JSON.stringify(experience, null, 2));

    // Format the response data, being very explicit about preserving availability
    const responseData = {
      _id: experience._id,
      title: experience.title,
      description: experience.description,
      location: experience.location,
      price: experience.price,
      imageUrl: experience.imageUrl,
      slots: experience.slots.map((slot) => ({
        date: slot.date,
        times: slot.times.map((timeSlot) => ({
          time: timeSlot.time,
          available: Number(timeSlot.available), // Explicitly convert to Number
        })),
      })),
    };

    // Log the formatted response
    // console.log("Formatted response:", JSON.stringify(responseData, null, 2));

    res.status(200).json({
      success: true,
      data: responseData,
    });
  } catch (error) {
    next(error);
  }
};