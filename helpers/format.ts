export const formatCurrency = (amount: number | null | undefined): string => {
  // Handle invalid values: null, undefined, or 0
  if (amount === null || amount === undefined || amount === 0) {
    return "Rp 0"; // Return a default value for invalid amounts
  }

  // Format the amount with commas for thousands and ensure 2 decimal places
  const formattedAmount = amount.toLocaleString("id-ID", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  return `Rp ${formattedAmount}`;
};

export const convertTimestampToDate = (timestamp: number): string => {
  // Check if timestamp is in milliseconds (13 digits) or seconds (10 digits)
  const date = new Date(
    timestamp.toString().length > 10 ? timestamp : timestamp * 1000
  );
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = date.toLocaleString("en", { month: "short" });
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
};
