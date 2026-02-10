import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const API_KEY = process.env.EXCHANGE_RATES_KEY;

if (!API_KEY) {
  throw new Error("Nie ustawiono klucza API w .env");
}

app.use(cors({ origin: "http://localhost:5173" }));

// --- Typy odpowiedzi API ---
interface SymbolsResponse {
  success?: boolean;
  symbols?: Record<string, string>;
  error?: { code: string; message: string };
}

interface RatesResponse {
  success?: boolean;
  base?: string;
  date?: string;
  rates?: Record<string, number>;
  error?: { code: string; message: string };
}

// --- Cache w pamięci ---
let cachedSymbols: Record<string, string> | null = null;
let cachedRates: Record<string, RatesResponse> = {}; // cache po base+symbols

// --- Endpoint pobierania symboli ---
app.get("/api/symbols", async (req, res) => {
  try {
    if (cachedSymbols) {
      return res.json({ success: true, symbols: cachedSymbols });
    }

    const response = await fetch(
      `https://api.exchangeratesapi.io/v1/symbols?access_key=${API_KEY}`
    );
    const data = (await response.json()) as SymbolsResponse;

    if (data.success && data.symbols) {
      cachedSymbols = data.symbols;
      res.json(data);
    } else {
      // Jeśli API odrzuca, ale mamy cache – zwróć cache
      if (cachedSymbols) {
        return res.json({ success: true, symbols: cachedSymbols });
      }
      res.status(500).json({ error: data.error ?? "Nieznany błąd API" });
    }
  } catch (err) {
    if (cachedSymbols) {
      return res.json({ success: true, symbols: cachedSymbols });
    }
    res.status(500).json({ error: "Błąd pobierania symboli walut" });
  }
});

// --- Endpoint pobierania kursów ---

app.get("/api/rates", async (req, res) => {
  const { from, to } = req.query as { from: string; to: string };

  if (!from || !to) {
    return res.status(400).json({ error: "Brak walut" });
  }

  try {
    const response = await fetch(
      `https://api.exchangeratesapi.io/v1/latest?access_key=${API_KEY}&symbols=${from},${to}`
    );

    const data = (await response.json()) as RatesResponse;

    if (!data.rates || !data.rates[from] || !data.rates[to]) {
      return res.status(500).json({ error: "Brak kursów walut" });
    }

    const rate = data.rates[to] / data.rates[from];

    res.json({
      success: true,
      rate,
      from,
      to,
    });
  } catch (err) {
    res.status(500).json({ error: "Błąd przeliczania walut" });
  }
});

// --- Start serwera ---
app.listen(PORT, () => {
  console.log(`Backend proxy działa na http://localhost:${PORT}`);
});
