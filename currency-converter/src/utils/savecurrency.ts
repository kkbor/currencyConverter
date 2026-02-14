import { getFromStorage, saveToStorage } from "./storage";
const KEY = "currencyHistory";
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