// bookit-frontend/src/pages/ConfirmationPage.tsx

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/common/Header";
import ConfirmationCard from "../components/checkout/ConfirmationCard";
import { useBookingContext } from "../context/BookingContext";

const ConfirmationPage: React.FC = () => {
  const navigate = useNavigate();
  const { bookingDetails, resetBooking } = useBookingContext();

  console.log("ConfirmationPage: bookingDetails:", bookingDetails);

  // If no booking details, redirect to home
  useEffect(() => {
    if (!bookingDetails) {
      console.log("No booking details found, redirecting to home");
      navigate("/");
    }
  }, [bookingDetails, navigate]);

  // If we don't have booking details, show a loading state
  if (!bookingDetails) {
    return (
      <div className="min-h-screen bg-white flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header showSearchBar={true} />

      <main className="container mx-auto px-4 py-10">
        <ConfirmationCard bookingDetails={bookingDetails} />
      </main>
    </div>
  );
};

export default ConfirmationPage;