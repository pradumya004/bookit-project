// bookit-frontend/src/components/experience/ExperienceDetails.tsx

import React from "react";
import type { Experience } from "../../types";
import { formatPrice } from "../../utils/formatters";

interface ExperienceDetailsProps {
  experience: Experience;
}

const ExperienceDetails: React.FC<ExperienceDetailsProps> = ({
  experience,
}) => {
  return (
    <div className="w-full">
      <div className="mb-4">
        <img
          src={experience.imageUrl}
          alt={experience.title}
          className="w-full h-56 object-cover rounded-md"
        />
      </div>

      <div className="px-2">
        <h1 className="text-xl font-medium text-purple-800 mb-1">
          {experience.title}
        </h1>

        <p className="text-sm text-gray-600 mb-4">
          Curated small-group experience. Certified guide. Safety first with
          gear included. Helmet and Life jackets along with an expert will
          accompany in kayaking.
        </p>

        <div className="flex flex-col space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-600">Starts at</span>
            <span className="font-medium">{formatPrice(experience.price)}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Quantity</span>
            <div className="flex items-center">
              <button className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded-sm">
                −
              </button>
              <span className="mx-3">1</span>
              <button className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded-sm">
                +
              </button>
            </div>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span>{formatPrice(experience.price)}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Taxes</span>
            <span>{formatPrice(Math.round(experience.price * 0.06))}</span>
          </div>

          <div className="flex justify-between font-medium">
            <span>Total</span>
            <span>
              {formatPrice(
                experience.price + Math.round(experience.price * 0.06)
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceDetails;