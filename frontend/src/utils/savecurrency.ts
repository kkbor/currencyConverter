import { getFromStorage, saveToStorage } from "./storage";
const KEY = "currencyHistory";
/**
 * Dodaje przeliczoną kwotę do historii przewalutowań w localStorage.
 * @param amount - Kwota wejściowa
 * @param currency - Kod waluty źródłowej (np. 'EUR')
 * @param currencyconverted - Kod waluty docelowej (np. 'PLN')
 * @param result - Wynik przeliczenia jako sformatowany tekst
 */
export const saveCurrency = (amount: number, currency:string, currencyconverted:string, result:string ) =>{
    const history = getFromStorage(KEY);
    const data ={
        amount,
        currency,
        currencyconverted,
        result,
        date: new Date().toISOString(),
    };
    saveToStorage(KEY,[...history,data]);
};