import { useState, useEffect } from "react";
import type { CurrencyOption } from "../types/currency";
import { getFromStorage, saveToStorage } from "../utils/storage";

const KEY = "currencyFavorite";
/**
 * hook zarządza logicznym stanem "ulubionych" walut.
 * Odpowiada za synchronizację między interfejsem użytkownika a localStorage.
 * @returns {Object} Obiekt zawierający:
 * - favorites: Mapa (Record) kodów walut z wartością boolean (true jeśli ulubiona).
 * - toggleFavorite: Funkcja przełączająca status ulubionej waluty (dodaj/usuń).
 */
export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = getFromStorage<CurrencyOption>(KEY);
    const favState: Record<string, boolean> = {};
    saved.forEach(f => (favState[f.value] = true));
    setFavorites(favState);
  }, []);

  const toggleFavorite = (currency: CurrencyOption) => {
    const isActive = favorites[currency.value];
    let saved = getFromStorage<CurrencyOption>(KEY);

    if (isActive) {
      saved = saved.filter(f => f.value !== currency.value);
    } else {
      saved.push(currency);
    }

    saveToStorage(KEY, saved);

    setFavorites(prev => ({
      ...prev,
      [currency.value]: !prev[currency.value],
    }));
  };

  return { favorites, toggleFavorite };
};