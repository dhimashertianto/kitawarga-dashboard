export const formatCurrency = (amount: number | null | undefined): string => {
  // Handle invalid values: null, undefined, or 0
  if (amount === null || amount === undefined || amount === 0) {
    return "Rp 0,00"; // Return a default value for invalid amounts
  }

  // Format the amount with commas for thousands and ensure 2 decimal places
  const formattedAmount = amount.toLocaleString("id-ID", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `Rp ${formattedAmount}`;
};

export const convertTimestampToDate = (timestamp: number): string => {
  const date = new Date(timestamp * 1000); // convert to milliseconds
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};
