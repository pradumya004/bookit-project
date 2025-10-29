// bookit-frontend/src/utils/formatters.ts

export const formatPrice = (price: number): string => {
  return `₹${price.toString()}`;
};

// Format date for display (Oct 22, 2025)
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return date.toLocaleDateString("en-IN", options);
};

// Format time (convert 24hr to 12hr format with am/pm)
export const formatTime = (time: string): string => {
  // Assuming time comes in 24hr format (HH:MM)
  const [hours, minutes] = time.split(":");
  const hour = parseInt(hours);

  if (hour === 0) {
    return `12:${minutes} am`;
  } else if (hour < 12) {
    return `${hour}:${minutes} am`;
  } else if (hour === 12) {
    return `12:${minutes} pm`;
  } else {
    return `${hour - 12}:${minutes} pm`;
  }
};

// Generate a display string for available slots (e.g., "2 left")
export const formatAvailability = (available: number): string => {
  if (available === 0) {
    return "Sold out";
  }
  return `${available} left`;
};

// Truncate text with ellipsis if it exceeds maxLength
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) {
    return text;
  }
  return `${text.substring(0, maxLength)}...`;
};