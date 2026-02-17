/**
 * @returns -Zwraca liste przewalutowań z localstorage 
 */
export const getCurrencyHistory = () => {
  const existing = localStorage.getItem("currencyHistory");
  return existing ? JSON.parse(existing) : [];
};
