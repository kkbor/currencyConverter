import { useEffect, useState, useMemo } from "react";
import Select from "react-select";
import type { SingleValue } from "react-select";
import type { CurrencyOption } from "../../types/currency";
import { fetchCurrencies } from "../../api/currencies";
import { CurrencyOptionComponent } from "./currencyOption";
import { useGetFavorites } from "../../hooks/useGetFavorites";

type CurrencySelectProps = {
  value: string;
  onChange: (value: string) => void;
};

export let cachedCurrencies: CurrencyOption[] | null = null;

export const CurrencySelect = ({ value, onChange, refreshKey }: CurrencySelectProps & { refreshKey?: number }) => {
  const [options, setOptions] = useState<CurrencyOption[]>([]);
  const [loading, setLoading] = useState(true);
  const favoritesSet = useGetFavorites(refreshKey);;
  useEffect(() => {
    // Jeśli mamy już cache, używamy go
    if (cachedCurrencies) {
      setOptions(cachedCurrencies);
      setLoading(false);
      return;
    }

    // Pobranie z backendu tylko raz
    fetchCurrencies()
      .then((currencies) => {
        cachedCurrencies = currencies; // zapis do cache
        setOptions(currencies);
      })
      .catch((err) => {
        console.error("Błąd pobierania walut:", err);
      })
      .finally(() => setLoading(false));
  }, []);
  const sortedOptions = useMemo(() => {
    return [...options].sort((a, b) => {
      // Sprawdzamy obecność w Secie - bardzo szybkie O(1)
      const isAFavorite = favoritesSet.has(a.value) ? 1 : 0;
      const isBFavorite = favoritesSet.has(b.value) ? 1 : 0;

      if (isAFavorite !== isBFavorite) {
        return isBFavorite - isAFavorite; // Ulubione na górę
      }

      return a.label.localeCompare(b.label); // Reszta alfabetycznie
    });
  }, [options, favoritesSet, refreshKey]);
  const handleChange = (selected: SingleValue<CurrencyOption>) => {
    if (selected) onChange(selected.value);
  };

  const selectedOption =
    options.find((o) => o.value === value) || null;

  return (
    <Select
      value={selectedOption}
      onChange={handleChange}
      options={sortedOptions}
      isLoading={loading}
      components={{ Option: CurrencyOptionComponent }}
      className="country-select"
      classNamePrefix="react-select"
      placeholder="Wybierz walutę"
      isSearchable
    />
  );
};