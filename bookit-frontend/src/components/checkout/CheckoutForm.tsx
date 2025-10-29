// bookit-frontend/src/components/checkout/CheckoutForm.tsx

import React, { useState } from "react";
import Button from "../common/Button";
import { validateBookingForm } from "../../utils/validators";

interface CheckoutFormProps {
  onSubmit: (data: { fullName: string; email: string }) => void;
  isLoading: boolean;
  onPromoApply: (code: string) => void;
  isApplyingPromo: boolean;
  promoError: string | null;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({
  onSubmit,
  isLoading,
  onPromoApply,
  isApplyingPromo,
  promoError,
}) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validation = validateBookingForm(fullName, email, termsAccepted);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    // Clear any previous errors
    setErrors({});

    // Submit form data
    onSubmit({ fullName, email });
  };

  const handlePromoApply = () => {
    if (promoCode.trim()) {
      onPromoApply(promoCode);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="fullName"
          className="block text-sm font-medium text-gray-700 mb-1"
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
        {errors.fullName && (
          <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-1"
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
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="promoCode"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Promo code
        </label>
        <div className="flex">
          <input
            type="text"
            id="promoCode"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            className="flex-grow p-3 border border-gray-300 rounded-l-md bg-gray-100"
            placeholder="Enter promo code"
          />
          <Button
            type="button"
            variant="outline"
            onClick={handlePromoApply}
            isLoading={isApplyingPromo}
            className="rounded-l-none bg-black text-white hover:bg-gray-800"
          >
            Apply
          </Button>
        </div>
        {promoError && (
          <p className="mt-1 text-sm text-red-600">{promoError}</p>
        )}
      </div>

      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            id="terms"
            type="checkbox"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
          />
        </div>
        <div className="ml-3">
          <label htmlFor="terms" className="text-sm text-gray-700">
            I agree to the terms and safety policy
          </label>
          {errors.terms && (
            <p className="text-sm text-red-600">{errors.terms}</p>
          )}
        </div>
      </div>

      <div className="mt-6">
        <Button
          type="submit"
          fullWidth
          isLoading={isLoading}
          disabled={isLoading}
        >
          Pay and Confirm
        </Button>
      </div>
    </form>
  );
};

export default CheckoutForm;