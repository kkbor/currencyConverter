import { useState, useEffect } from "react";
import {HistoryWrapper} from "../components/currencyHistory/historyWrapper.tsx";
import { useCallback } from "react";
import FavouriteTable from "../components/currencyFavorite/favorite.tsx"
import { CurrencySelect } from "../components/currencyselect/currencySelect.tsx";
import { useCurrencyConverter } from "../hooks/useCurrencyConverter";
import { saveCurrency } from "../utils/savecurrency.ts";

/**
 * Główny komponent strony konwertera walut.
 * Zarządza stanem formularza, obsługuje proces przewalutowania
 * oraz koordynuje wyświetlanie historii i ulubionych walut.
 * @returns 
 */
export const HomePage = () =>{
  //tymczasowa pamięć ram aplikacji, po odświerzeniu znika
    const [amount, setAmount] = useState<number>(100);
    const[currency, setCurrency] = useState<string>(""); 
    const[currencyconverted, setCurrencyConverted] = useState<string>("");
    const [activeTab, setActiveTab] = useState<"last" | "favourite">("last");
    const { result, loading, error, convert } = useCurrencyConverter();

    //Klucze służące do wymuszania odświeżenia komponentów podrzędnych po zmianie danych w localStorage
    const [favoritesRefreshKey, setFavoritesRefreshKey] = useState(0);
    const [refreshKey, setRefreshKey] = useState(0);

    //Odświeża listę ulubionych po dodaniu/usunięciu waluty.
    //Przekazywane jako callback do komponentów potomnych.
    const handleFavoritesChange = useCallback(() => {
      setFavoritesRefreshKey(prev => prev + 1);
    }, []);
    //Funkcja obsługi po zaakceptowaniu formularza
    const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      convert(amount, currency, currencyconverted);
    },
    [amount, currency, currencyconverted, convert]
  );
  useEffect(() => {
    if (result !== null) {
      saveCurrency(
        amount,
        currency,
        currencyconverted,
        result.toFixed(2)
      );
      setRefreshKey(prev => prev + 1);
    }
  }, [result, amount, currency, currencyconverted]);
    return(
        <>
        {result !== null && (
        <div className="result" >
          {amount} {currency} to w przeliczeniu
          <br />
          <strong>{result.toFixed(2)} {currencyconverted}</strong>
        </div>
        )}

      {error && <p className="error">{error}</p>}
        <form className="form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="form-label">Kwota</label>
                    <div className="input-group">
                        <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        className="amount-input"
                        />
                        
                        <div className="divider"></div>
                         <div className="country-select">
                            <CurrencySelect value={currency} onChange={setCurrency} refreshKey={favoritesRefreshKey} />
                        </div>
                        
                    </div>
            </div>

            <div className="form-group">
                <label className="form-label">Przewalutować na</label>
                <div className="input-group single">
                   <CurrencySelect value={currencyconverted} onChange={setCurrencyConverted} refreshKey={favoritesRefreshKey} />
                </div>
            </div>
            <button className="button-home" disabled={loading || !currency || !currencyconverted}>
              {loading ? "Liczenie..." : "Oblicz"}
            </button>
        </form>
         <div className="box-table">
        <div className="table-tabs">
          <button
            className={activeTab === "last" ? "tab active" : "tab"}
            onClick={() => setActiveTab("last")}
            type="button"
          >
            Ostatnie
          </button>
          <button
            className={activeTab === "favourite" ? "tab active" : "tab"}
            onClick={() => setActiveTab("favourite")}
            type="button"
          >
            Ulubione
          </button>
        </div>

        <div className="table-content">
          {activeTab === "last" && <HistoryWrapper key={refreshKey} />}

          {activeTab === "favourite" && (<FavouriteTable onFavoriteChange={handleFavoritesChange} />)}
        </div>
      </div>
    </>
    )
} 