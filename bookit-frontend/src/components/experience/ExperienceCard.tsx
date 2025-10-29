// bookit-frontend/src/components/experience/ExperienceCard.tsx

import React from "react";
import { Link } from "react-router-dom";
import { type ExperienceSummary } from "../../types";
import { formatPrice } from "../../utils/formatters";

interface ExperienceCardProps {
  experience: ExperienceSummary;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience }) => {
  return (
    <div className="rounded overflow-hidden shadow-sm border border-gray-200">
      <div className="relative">
        <img
          src={experience.imageUrl}
          alt={experience.title}
          className="w-full h-48 object-cover"
        />
      </div>

      <div className="px-4 py-3">
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-lg font-medium text-purple-800">
            {experience.title}
          </h3>
          <span className="text-xs bg-gray-200 px-2 py-1 rounded">
            {experience.location}
          </span>
        </div>

        <div className="text-sm text-gray-600 mb-2">
          Curated small-group experience. Certified guide. Safety first with
          gear included.
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm">From </span>
            <span className="font-medium">{formatPrice(experience.price)}</span>
          </div>

          <Link
            to={`/details/${experience._id}`}
            className="bg-yellow-400 text-black px-3 py-1 text-sm font-medium rounded-md"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;