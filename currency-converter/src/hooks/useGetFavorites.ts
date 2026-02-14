import { useState, useEffect, useMemo } from "react";
import type { CurrencyOption } from "../types/currency";
import { getFavorites } from "../utils/getCurrencyFavorite";


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