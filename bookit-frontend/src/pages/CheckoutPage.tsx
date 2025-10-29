// bookit-frontend/src/pages/CheckoutPage.tsx

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/common/Header";
import { useBookingContext } from "../context/BookingContext";
import { useBooking } from "../hooks/useBooking";
import { formatDate, formatTime } from "../utils/formatters";

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    selectedExperience,
    selectedDate,
    selectedTime,
    quantity,
    promoCode,
    setPromoCode,
  } = useBookingContext();

  const {
    loading,
    error,
    promoDiscount,
    validatePromo,
    validatingPromo,
    promoError,
    calculatePricing,
    submitBooking,
  } = useBooking();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [localPromoCode, setLocalPromoCode] = useState("");
  const [formErrors, setFormErrors] = useState<{
    fullName?: string;
    email?: string;
    terms?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculate the price
  const { subtotal, taxes, total } = calculatePricing();

  // If essential booking information is missing, redirect to home
  useEffect(() => {
    if (!selectedExperience || !selectedDate || !selectedTime) {
      navigate("/");
    }
  }, [selectedExperience, selectedDate, selectedTime, navigate]);

  // Handle back button
  const handleBackClick = () => {
    if (selectedExperience) {
      navigate(`/details/${selectedExperience._id}`);
    } else {
      navigate("/");
    }
  };

  // Handle promo code validation
  const handlePromoApply = async () => {
    if (localPromoCode.trim()) {
      setPromoCode(localPromoCode);
      await validatePromo(localPromoCode);
    }
  };

  // Validate form
  const validateForm = () => {
    const errors: { fullName?: string; email?: string; terms?: string } = {};
    let isValid = true;

    if (!fullName.trim()) {
      errors.fullName = "Full name is required";
      isValid = false;
    }

    if (!email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      errors.email = "Please enter a valid email";
      isValid = false;
    }

    if (!termsAccepted) {
      errors.terms = "You must accept the terms and safety policy";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return; // Prevent multiple submissions

    if (!validateForm()) {
      return;
    }

    try {
      setIsSubmitting(true);
      console.log("Starting booking submission...");

      await submitBooking({
        fullName,
        email,
      });

      // Navigation happens in the submitBooking function
    } catch (err) {
      console.error("Error during form submission:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // If we don't have the required data, show a loading state
  if (!selectedExperience || !selectedDate || !selectedTime) {
    return (
      <div className="min-h-screen bg-white flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header
        showSearchBar={true}
        showBackButton={true}
        onBackClick={handleBackClick}
      />

      <main className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Column - Form */}
          <div className="md:w-1/2 bg-gray-50 p-6 rounded">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="fullName"
                  className="block text-sm font-normal text-gray-600 mb-1"
                >
                  Full name
                </label>
                <input
                  type="text"
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md bg-gray-100"
                  placeholder="John Doe"
                />
                {formErrors.fullName && (
                  <p className="mt-1 text-sm text-red-600">
                    {formErrors.fullName}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-normal text-gray-600 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md bg-gray-100"
                  placeholder="test@test.com"
                />
                {formErrors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {formErrors.email}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="promoCode"
                  className="block text-sm font-normal text-gray-600 mb-1"
                >
                  Promo code
                </label>
                <div className="flex">
                  <input
                    type="text"
                    id="promoCode"
                    value={localPromoCode}
                    onChange={(e) => setLocalPromoCode(e.target.value)}
                    className="flex-grow p-3 border border-gray-300 rounded-l-md bg-gray-100"
                  />
                  <button
                    type="button"
                    onClick={handlePromoApply}
                    disabled={validatingPromo || !localPromoCode.trim()}
                    className="px-4 py-3 bg-black text-white rounded-r-md font-medium disabled:bg-gray-400"
                  >
                    Apply
                  </button>
                </div>
                {promoError && (
                  <p className="mt-1 text-sm text-red-600">{promoError}</p>
                )}
              </div>

              <div className="mb-6">
                <div className="flex items-start">
                  <input
                    id="terms"
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="mt-1 h-4 w-4"
                  />
                  <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                    I agree to the terms and safety policy
                  </label>
                </div>
                {formErrors.terms && (
                  <p className="mt-1 text-sm text-red-600">
                    {formErrors.terms}
                  </p>
                )}
              </div>

              {/* Submit button moved here inside form */}
              <button
                type="submit"
                disabled={loading || isSubmitting}
                className="w-full py-3 bg-yellow-400 text-black rounded-md font-medium hover:bg-yellow-500 disabled:bg-yellow-300 disabled:cursor-not-allowed"
              >
                {loading || isSubmitting ? "Processing..." : "Pay and Confirm"}
              </button>
            </form>
          </div>

          {/* Right Column - Summary */}
          <div className="md:w-1/2 bg-gray-50 p-6 rounded">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Experience</span>
                <span className="font-medium">{selectedExperience.title}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Date</span>
                <span className="font-medium">
                  {formatDate(selectedDate).split(",")[0]}{" "}
                  {formatDate(selectedDate).split(",")[1]}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Time</span>
                <span className="font-medium">{formatTime(selectedTime)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Qty</span>
                <span className="font-medium">{quantity}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">₹{subtotal}</span>
              </div>

              {promoDiscount && (
                <div className="flex justify-between text-green-600">
                  <span>Promo ({promoCode})</span>
                  <span>-₹{promoDiscount.discount}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span className="text-gray-600">Taxes</span>
                <span className="font-medium">₹{taxes}</span>
              </div>

              <div className="flex justify-between font-bold border-t border-gray-200 pt-3 mt-3">
                <span>Total</span>
                <span>₹{total}</span>
              </div>

              {error && (
                <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md">
                  {error}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CheckoutPage;