// bookit-backend/src/models/Experience.ts

import mongoose, { Schema } from "mongoose";
import { IExperience } from "../types";

const ExperienceSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a title"],
      trim: true,
      maxlength: [50, "Title cannot be more than 50 characters"],
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
      maxlength: [500, "Description cannot be more than 500 characters"],
    },
    location: {
      type: String,
      required: [true, "Please add a location"],
    },
    price: {
      type: Number,
      required: [true, "Please add a price"],
      min: [0, "Price must be at least 0"],
    },
    imageUrl: {
      type: String,
      required: [true, "Please add an image URL"],
    },
    slots: [
      {
        date: {
          type: Date,
          required: true,
        },
        times: [
          {
            time: {
              type: String,
              required: true,
            },
            available: {
              type: Number,
              required: true,
              min: 0,
            },
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IExperience>("Experience", ExperienceSchema);