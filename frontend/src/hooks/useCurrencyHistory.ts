import { useEffect, useState } from "react";
import { getCurrencyHistory } from "../utils/getCurrencyHistory";

/**
 * Interfejs opisujący pojedynczy wpis w historii przeliczeń.
 * Pomaga zachować spójność danych w całej aplikacji.
 */
interface HistoryEntry {
  amount: number;
  currency: string;
  currencyconverted: string;
  result: string;
  date: string;
}
/**
 * Hook do zarządzania listą historycznych przeliczeń walut.
 * Pobiera dane z localStorage przy zainicjowaniu komponentu.
 * * @returns {Object} Obiekt zawierający tablicę wpisów historycznych.
 */
export const useCurrencyHistory = () => {
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    const data = getCurrencyHistory();
    setHistory(data);
  }, []);

  return { history };
};