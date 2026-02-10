import { cachedCurrencies } from "../components/currencyselect/currencySelect";
import type { CurrencyOption } from "../types/currency";
import { useState } from "react";

const FavouriteTable = () => {
  const currencies: CurrencyOption[] = cachedCurrencies || [];
   const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  const toggleStar = (code: string) => {
    setFavorites((prev) => ({
      ...prev,
      [code]: !prev[code],
    }));
  };

  if (currencies.length === 0)
    return <div>Brak walut do wyświetlenia</div>;

    return (
    <div>
      {currencies.map((c: CurrencyOption) => {
        const active = favorites[c.value] || false; // czy gwiazdka jest aktywna
        return (
          <div
            key={c.value}
            style={{ display: "flex", alignItems: "center", gap: 8, padding: 4 }}
          >
            {c.flag && <img src={c.flag} alt="" width={20} height={14} />}
            <span>{c.label}</span>
            <strong style={{ marginLeft: "auto" }}>{c.value}</strong>
            <button
              onClick={() => toggleStar(c.value)}
              className={`star-button ${active ? "active" : ""}`}
              aria-label={active ? "Ulubione" : "Nieulubione"}
            >
              ★
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default FavouriteTable;
