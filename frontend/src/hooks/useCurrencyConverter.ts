import {useState} from "react";
import {fetchRate} from "../api/currencyApi"
/**
 * Hook obsługujący logikę konwersji walut.
 * Zarządza stanem zapytania do API, oblicza wynik oraz obsługuje błędy i stan ładowania.
 * * @returns {Object} Zestaw narzędzi do konwersji:
 * - result: Obliczona kwota po przewalutowaniu.
 * - loading: Flaga informująca o trwającym zapytaniu do API.
 * - error: Komunikat o błędzie w przypadku niepowodzenia.
 * - convert: Funkcja inicjująca proces przeliczenia.
 */
export function useCurrencyConverter(){
    const[result, setResult]=useState<number| null>(null);
    const[loading, setLoading]=useState(false);
    const[error, setError]=useState<string | null>(null);

     const convert = async (
    amount: number,
    from: string,
    to: string
  ) => {
    if (amount <= 0) {
      setError("Kwota musi być większa od zera");
      setResult(null); 
      return; 
    }
    if (from === to) {
      setResult(amount);
      setError(null);
      return;
    }
    try {
      setLoading(true);
      setError(null);

      const rate = await fetchRate(from, to);
      setResult(amount * rate);
    } catch (err) {
      setError("Nie udało się przeliczyć waluty");
    } finally {
      setLoading(false);
    }
  };

  return { result, loading, error, convert };
}
