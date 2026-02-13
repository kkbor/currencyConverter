export const saveCurrency = (amount: number, currency:string, currencyconverted:string, result:string ) =>{
    const data ={
        amount,
        currency,
        currencyconverted,
        result,
        date: new Date().toISOString(),
    };
    const existing = localStorage.getItem("currencyHistory");
    const history = existing ? JSON.parse(existing) : [];

    history.push(data);

    localStorage.setItem("currencyHistory", JSON.stringify(history));
}