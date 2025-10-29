// bookit-frontend/src/pages/DetailsPage.tsx

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/common/Header";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { useExperienceDetails } from "../hooks/useExperiences";
import { useBookingContext } from "../context/BookingContext";
import { formatPrice } from "../utils/formatters";
import DateTimeSelector from "../components/experience/DateTimeSelector";

const DetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { experience, loading, error } = useExperienceDetails(id);

  const {
    setSelectedExperience,
    selectedDate,
    setSelectedDate,
    selectedTime,
    setSelectedTime,
    quantity,
    setQuantity,
  } = useBookingContext();

  // Find the maximum available slots for the selected date and time
  const getMaxAvailable = (): number => {
    if (!experience || !selectedDate || !selectedTime) return 0;

    const selectedSlot = experience.slots?.find((slot) => {
      return (
        new Date(slot.date).toISOString().split("T")[0] ===
        new Date(selectedDate).toISOString().split("T")[0]
      );
    });

    if (!selectedSlot) return 0;

    const selectedTimeSlot = selectedSlot.times.find(
      (t) => t.time === selectedTime
    );
    return selectedTimeSlot ? selectedTimeSlot.available : 0;
  };

  const maxAvailable = getMaxAvailable();

  // Reset quantity if it exceeds available slots when date/time changes
  useEffect(() => {
    const max = getMaxAvailable();
    if (quantity > max && max > 0) {
      setQuantity(max);
    } else if (max === 0) {
      setQuantity(1); // Default to 1 if no slots selected yet
    }
  }, [selectedDate, selectedTime, quantity, setQuantity]);

  // When experience data is loaded, update the booking context
  useEffect(() => {
    if (experience) {
      setSelectedExperience(experience);

      // Reset selections
      setSelectedDate(null);
      setSelectedTime(null);
      setQuantity(1);
    }
  }, [
    experience,
    setSelectedExperience,
    setSelectedDate,
    setSelectedTime,
    setQuantity,
  ]);

  // Handle back button click
  const handleBackClick = () => {
    navigate("/");
  };

  // Handle quantity changes
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    if (quantity < maxAvailable) {
      setQuantity(quantity + 1);
    }
  };

  // Handle date selection
  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setSelectedTime(null); // Reset time when date changes
    setQuantity(1); // Reset quantity when date changes
  };

  // Handle time selection
  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setQuantity(1); // Reset quantity when time changes
  };

  // Handle proceed to checkout
  const handleProceedToCheckout = () => {
    if (
      selectedDate &&
      selectedTime &&
      quantity <= maxAvailable &&
      quantity > 0
    ) {
      navigate("/checkout");
    }
  };

  // Calculate prices
  const subtotal = experience ? experience.price * quantity : 0;
  const taxes = Math.round(subtotal * 0.06); // 6% tax
  const total = subtotal + taxes;

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header showSearchBar={false} />
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  if (error || !experience) {
    return (
      <div className="min-h-screen bg-white">
        <Header showSearchBar={false} />
        <div className="text-center py-10">
          <p className="text-red-500 mb-4">{error || "Experience not found"}</p>
          <button
            onClick={() => navigate("/")}
            className="text-blue-600 underline"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const confirmButtonClass =
    selectedDate && selectedTime && quantity <= maxAvailable && quantity > 0
      ? "bg-yellow-400 text-black hover:bg-yellow-500 cursor-pointer"
      : "bg-gray-300 text-gray-500 cursor-not-allowed";

  return (
    <div className="min-h-screen bg-white">
      <Header
        showSearchBar={true}
        showBackButton={true}
        onBackClick={handleBackClick}
      />

      <main className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Experience Details */}
          <div className="lg:w-7/12">
            <div className="mb-6">
              <img
                src={experience.imageUrl}
                alt={experience.title}
                className="w-full h-auto object-cover rounded-md mb-4"
              />

              <h1 className="text-xl font-medium text-purple-800">
                {experience.title}
              </h1>

              <p className="text-sm text-gray-600 mb-4">
                Curated small-group experience. Certified guide. Safety first
                with gear included. Helmet and Life jackets along with an expert
                will accompany in kayaking.
              </p>

              {experience.slots && (
                <DateTimeSelector
                  slots={experience.slots}
                  selectedDate={selectedDate}
                  selectedTime={selectedTime}
                  onSelectDate={handleDateSelect}
                  onSelectTime={handleTimeSelect}
                />
              )}
            </div>
          </div>

          {/* Right Column - Pricing & Booking */}
          <div className="lg:w-5/12">
            <div className="bg-gray-50 p-4 rounded-md">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Starts at</span>
                  <span className="font-medium">
                    {formatPrice(experience.price)}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Quantity</span>
                  <div className="flex items-center">
                    <button
                      onClick={decreaseQuantity}
                      className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded-sm"
                      disabled={quantity <= 1}
                    >
                      −
                    </button>
                    <span className="mx-3">{quantity}</span>
                    <button
                      onClick={increaseQuantity}
                      className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded-sm"
                      disabled={
                        !selectedDate ||
                        !selectedTime ||
                        quantity >= maxAvailable
                      }
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Show max availability info if date/time selected */}
                {selectedDate && selectedTime && maxAvailable > 0 && (
                  <div className="text-sm text-gray-600 text-right">
                    {maxAvailable} spot{maxAvailable !== 1 ? "s" : ""} available
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Taxes</span>
                  <span>{formatPrice(taxes)}</span>
                </div>

                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>

                <button
                  onClick={handleProceedToCheckout}
                  disabled={
                    !selectedDate ||
                    !selectedTime ||
                    quantity > maxAvailable ||
                    quantity < 1
                  }
                  className={`w-full py-3 rounded-md text-center font-medium ${confirmButtonClass}`}
                >
                  Confirm
                </button>

                {/* Show error if trying to book more than available */}
                {quantity > maxAvailable && maxAvailable > 0 && (
                  <div className="text-sm text-red-600 text-center">
                    Cannot book more than {maxAvailable} spot
                    {maxAvailable !== 1 ? "s" : ""}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DetailsPage;