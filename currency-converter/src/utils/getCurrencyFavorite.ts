import { getFromStorage } from "../utils/storage";
import type { CurrencyOption } from "../types/currency";

const KEY = "currencyFavorite";

export const getFavorites = (): CurrencyOption[] => getFromStorage<CurrencyOption>(KEY);
