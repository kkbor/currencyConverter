import type { CurrencyOption } from "../types/currency";
import { getFromStorage, saveToStorage } from "./storage";

const KEY = "currencyFavorite";
export const saveFavorite = (currency: CurrencyOption) => {
  const favorites = getFromStorage<CurrencyOption>(KEY);
  saveToStorage(KEY, [...favorites, currency]);
};