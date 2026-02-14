export const getCurrencyHistory = () => {
  const existing = localStorage.getItem("currencyHistory");
  return existing ? JSON.parse(existing) : [];
};
