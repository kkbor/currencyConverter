import { useEffect, useState } from "react";
import Select from "react-select";
import type { SingleValue } from "react-select";

import type { CurrencyOption } from "../../types/currency";
import { fetchCurrencies } from "../../api/currencies";
import { CurrencyOptionComponent } from "./currencyOption";

type CurrencySelectProps = {
  value: string;
  onChange: (value: string) => void;
};

export let cachedCurrencies: CurrencyOption[] | null = null;

export const CurrencySelect = ({ value, onChange }: CurrencySelectProps) => {
  const [options, setOptions] = useState<CurrencyOption[]>([]);
  const [loading, setLoading] = useState(true);

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

  const handleChange = (selected: SingleValue<CurrencyOption>) => {
    if (selected) onChange(selected.value);
  };

  const selectedOption =
    options.find((o) => o.value === value) || null;

  return (
    <Select
      value={selectedOption}
      onChange={handleChange}
      options={options}
      isLoading={loading}
      components={{ Option: CurrencyOptionComponent }}
      className="country-select"
      classNamePrefix="react-select"
      placeholder="Wybierz walutę"
      isSearchable
    />
  );
};