import { useState, useEffect, useMemo } from "react";
import type { CurrencyOption } from "../types/currency";
import { getFavorites } from "../utils/getCurrencyFavorite";

/**
 * Hook pobierający listę ulubionych walut i optymalizujący ich wyszukiwanie.
 * @param refreshKey -klucz sterujący odświeżaniem listy (np. po dodaniu/usunięciu elementu).
 * @returns -Zbiór (Set) zawierający kody ulubionych walut.
 */
export const useGetFavorites = (refreshKey?: number) => {
  const [favoriteList, setFavoriteList] = useState<CurrencyOption[]>([]);

  useEffect(() => {
    const saved = getFavorites();
    setFavoriteList(saved);
  }, [refreshKey]); 

  const favoritesSet = useMemo(() => {
    return new Set(favoriteList.map(fav => fav.value));
  }, [favoriteList]);

  return favoritesSet;
};