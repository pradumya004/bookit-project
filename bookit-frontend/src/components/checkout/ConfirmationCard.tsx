// bookit-frontend/src/components/checkout/ConfirmationCard.tsx

import React from "react";
import { Link } from "react-router-dom";
import type { BookingDetails } from "../../types";
import { formatDate, formatTime } from "../../utils/formatters";
import Button from "../common/Button";

interface ConfirmationCardProps {
  bookingDetails: BookingDetails;
}

const ConfirmationCard: React.FC<ConfirmationCardProps> = ({
  bookingDetails,
}) => {
  return (
    <div className="bg-white p-6 rounded-md flex flex-col items-center text-center max-w-md mx-auto">
      <div className="mb-6">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-white"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-2">Booking Confirmed</h2>
      <p className="text-gray-500 mb-4">Ref ID: {bookingDetails.bookingId}</p>

      <div className="w-full border-t border-gray-200 pt-4 mb-6">
        <div className="space-y-3">
          <div>
            <h3 className="text-gray-600 text-sm">Experience</h3>
            <p className="font-medium">{bookingDetails.experienceTitle}</p>
          </div>

          <div>
            <h3 className="text-gray-600 text-sm">Date</h3>
            <p className="font-medium">{formatDate(bookingDetails.date)}</p>
          </div>

          <div>
            <h3 className="text-gray-600 text-sm">Time</h3>
            <p className="font-medium">{formatTime(bookingDetails.time)}</p>
          </div>

          <div>
            <h3 className="text-gray-600 text-sm">Participants</h3>
            <p className="font-medium">{bookingDetails.quantity}</p>
          </div>
        </div>
      </div>

      <Link to="/">
        <Button variant="primary" className="mt-2">
          Back to Home
        </Button>
      </Link>
    </div>
  );
};

export default ConfirmationCard;