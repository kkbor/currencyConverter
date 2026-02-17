import { getFromStorage } from "../utils/storage";
import type { CurrencyOption } from "../types/currency";

const KEY = "currencyFavorite";
/**
 * 
 * @returns -zwraca liste ulubionych
 */
export const getFavorites = (): CurrencyOption[] => getFromStorage<CurrencyOption>(KEY);
