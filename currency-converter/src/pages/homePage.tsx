import { useState } from "react";
import LastTable from "../pages/archive.tsx";
import FavouriteTable from "../pages/faforite.tsx"
import { CurrencySelect } from "../components/currencyselect/currencySelect.tsx";
import { useCurrencyConverter } from "../hooks/useCurrencyConverter";

export const HomePage = () =>{
    const [amount, setAmount] = useState<number>(100);
    const[currency, setCurrency] = useState<string>("PLN");
    const[currencyconverted, setCurrencyConverted] = useState<string>("EUR");
    const [activeTab, setActiveTab] = useState<"last" | "favourite">("last");
    
    const { result, loading, error, convert } = useCurrencyConverter();
    const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
      e.preventDefault();
      convert(amount, currency, currencyconverted);
    };
    return(
        <>
        {result !== null && (
        <div className="result">
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
                            <CurrencySelect value={currency} onChange={setCurrency} />
                        </div>
                        
                    </div>
            </div>

            <div className="form-group">
                <label className="form-label">Przewalutować na</label>
                <div className="input-group single">
                   <CurrencySelect
                        value={currencyconverted}
                        onChange={setCurrencyConverted}/>
                </div>
            </div>
            <button className="button-home" disabled={loading}>
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
          {activeTab === "last" && <LastTable />}
          {activeTab === "favourite" && <FavouriteTable />}
        </div>
      </div>
    </>
    )
} 