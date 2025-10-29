// bookit-frontend/src/hooks/useExperiences.ts

import { useState, useEffect, useCallback } from "react";
import type { Experience, ExperienceSummary } from "../types";
import {
  getExperiences,
  getExperienceById,
} from "../services/experienceService";

// Hook for fetching all experiences (used on home page)
export const useExperiences = () => {
  const [experiences, setExperiences] = useState<ExperienceSummary[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch experiences on mount
  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        setLoading(true);
        const response = await getExperiences();
        setExperiences(response.data);
        setError(null);
      } catch (err) {
        setError(typeof err === "string" ? err : "Failed to fetch experiences");
        setExperiences([]);
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  return { experiences, loading, error };
};

// Hook for fetching a single experience by ID (used on details page)
export const useExperienceDetails = (id: string | undefined) => {
  const [experience, setExperience] = useState<Experience | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch experience details
  const fetchExperience = useCallback(async () => {
    if (!id) {
      setError("Experience ID is required");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await getExperienceById(id);
      setExperience(response.data);
      setError(null);
    } catch (err) {
      setError(
        typeof err === "string" ? err : "Failed to fetch experience details"
      );
      setExperience(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  // Fetch on mount or when ID changes
  useEffect(() => {
    fetchExperience();
  }, [fetchExperience]);

  return { experience, loading, error, refetch: fetchExperience };
};