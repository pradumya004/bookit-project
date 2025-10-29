// bookit-frontend/src/utils/validators.ts

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate full name (not empty, at least 2 words)
export const isValidName = (name: string): boolean => {
  if (!name.trim()) {
    return false;
  }
  // Check if name has at least two words
  const nameParts = name.trim().split(" ");
  return (
    nameParts.length >= 2 && nameParts[0].length > 0 && nameParts[1].length > 0
  );
};

// Validate quantity (minimum 1, maximum as specified)
export const isValidQuantity = (
  quantity: number,
  maxAvailable: number
): boolean => {
  return (
    Number.isInteger(quantity) && quantity >= 1 && quantity <= maxAvailable
  );
};

// Validate that a date and time have been selected
export const hasSelectedDateTime = (
  date: string | null,
  time: string | null
): boolean => {
  return !!date && !!time;
};

// Validate booking form data
export const validateBookingForm = (
  fullName: string,
  email: string,
  termsAccepted: boolean
): { isValid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};

  if (!fullName.trim()) {
    errors.fullName = "Full name is required";
  }

  if (!email.trim()) {
    errors.email = "Email is required";
  } else if (!isValidEmail(email)) {
    errors.email = "Please enter a valid email address";
  }

  if (!termsAccepted) {
    errors.terms = "You must accept the terms and safety policy";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};