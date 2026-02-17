import type { CurrencyOption } from "../types/currency";
import { getFromStorage, saveToStorage } from "./storage";

const KEY = "currencyFavorite";
/**
 * Dodaje wybraną walutę do listy ulubionych w localStorage.
 * Pobiera istniejącą listę, dołącza nowy element i zapisuje całość.
 * @param currency -Obiekt waluty (kod i nazwa) do zapisania.
 */
export const saveFavorite = (currency: CurrencyOption) => {
  const favorites = getFromStorage<CurrencyOption>(KEY);
  saveToStorage(KEY, [...favorites, currency]);
};