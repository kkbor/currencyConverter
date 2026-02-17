import type { CurrencyOption } from "../types/currency";
import { getFromStorage, saveToStorage } from "./storage";

const KEY = "currencyFavorite";
/**
 * Usuwa wybraną walutę z listy ulubionych w localStorage.
 * @param currencyCode - Kod waluty (np. 'USD'), który ma zostać usunięty.
 */
export const removeFavorite = (value: string) => {
  const favorites = getFromStorage<CurrencyOption>(KEY);
  const updated = favorites.filter(f => f.value !== value);
  saveToStorage(KEY, updated);
};