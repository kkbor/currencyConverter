import { cachedCurrencies } from "../currencyselect/currencySelect";
import type { CurrencyOption } from "../../types/currency";
import { useFavorites } from "../../hooks/useFavorite";

type FavouriteTableProps = {
  onFavoriteChange?: () => void;
};
/**
 * Komponent wyświetlający listę wszystkich dostępnych walut z możliwością 
 * zarządzania statusem "ulubione" (dodawanie/usuwanie gwiazdki).
 * @param onFavoriteChange - callback informujący rodzica o zmianie 
 * stanu ulubionych, co pozwala na synchronizację innych części interfejsu.
 */
const FavouriteTable = ({ onFavoriteChange }: FavouriteTableProps) => {
  const currencies: CurrencyOption[] = cachedCurrencies || [];
  const { favorites, toggleFavorite } = useFavorites();
  
  

  if (currencies.length === 0)
    return <div>Brak walut do wyświetlenia</div>;

     return (
    <div className="favouriteContainer">
      {currencies.map((c: CurrencyOption) => {
        const active = favorites[c.value] || false;

        return (
          <div key={c.value} className="favouriteRow">
            <div className="favouriteLeft">
              {c.flag && <img src={c.flag} alt="" width={20} height={14} />}
              <span>{c.label}</span>
            </div>

            <div className="favouriteRight">
              <strong>{c.value}</strong>
              <button
                 onClick={() => {
                  toggleFavorite(c);
                  if (onFavoriteChange) onFavoriteChange();
                }}
                className={`star-button ${active ? "active" : ""}`}
              >
                ★
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FavouriteTable;
