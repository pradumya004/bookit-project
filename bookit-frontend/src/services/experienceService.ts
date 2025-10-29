// bookit-frontend/src/services/experienceService.ts

import api from "./api";
import type { ApiResponse, Experience, ExperienceSummary } from "../types";

// Get all experiences (summary view for home page)
export const getExperiences = async (): Promise<
  ApiResponse<ExperienceSummary[]>
> => {
  const response = await api.get("/experiences");
  return response.data;
};

// Get a single experience by ID (detailed view with slots)
export const getExperienceById = async (
  id: string
): Promise<ApiResponse<Experience>> => {
  const response = await api.get(`/experiences/${id}`);

  // Add debugging to check what the API returns
  console.log("API response:", response.data);

  // Normalize data if needed
  if (response.data.data.slots) {
    response.data.data.slots = response.data.data.slots.map((slot: any) => ({
      date: slot.date,
      times: slot.times.map((t: any) => ({
        time: t.time,
        available: Number(t.available), // Ensure this is a number
      })),
    }));
  }

  return response.data;
};