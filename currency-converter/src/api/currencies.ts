import type { CurrencyOption } from "../types/currency";

const currencyToCountry: Record<string, string> = {
  EUR: "eu",
};

let cachedCurrencies: CurrencyOption[] | null = null;

export const fetchCurrencies = async (): Promise<CurrencyOption[]> => {
  if (cachedCurrencies) return cachedCurrencies;

  try {
    const res = await fetch("http://localhost:3001/api/symbols");
    if (!res.ok) throw new Error("Błąd pobierania symboli walut");

    const data = await res.json();
    console.log("Odpowiedź API:", data);

    if (!data.symbols) {
      console.warn("Brak symboli w odpowiedzi API:", data.error);
      return [];
    }

    const currencies: CurrencyOption[] = Object.entries(data.symbols).map(
      ([code, description]) => {
        const countryCode = currencyToCountry[code] || code.slice(0, 2).toLowerCase();

        const flagUrl =
          countryCode.length === 2
            ? `https://flagcdn.com/w20/${countryCode}.png`
            : undefined;

        return {
          value: code,
          label: description as string,
          flag: flagUrl,
        };
      }
    );

    cachedCurrencies = currencies;
    return currencies;
  } catch (err) {
    console.error("Błąd pobierania walut:", err);
    return [];
  }
};