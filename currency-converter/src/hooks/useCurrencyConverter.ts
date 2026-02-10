import {useState} from "react";
import {fetchRate} from "../api/currencyApi"

export function useCurrencyConverter(){
    const[result, setResult]=useState<number| null>(null);
    const[loading, setLoading]=useState(false);
    const[error, setError]=useState<string | null>(null);

     const convert = async (
    amount: number,
    from: string,
    to: string
  ) => {
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
