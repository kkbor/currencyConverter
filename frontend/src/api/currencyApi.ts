const API_URL = "http://localhost:3001/api";

/**
 * Pobiera aktualny kurs wymiany między dwiema walutami.
 * * @param from - Kod waluty źródłowej (np. "USD").
 * @param to - Kod waluty docelowej (np. "PLN").
 * @returns {Promise<number>} Zwraca aktualny kurs jako liczbę.
 * @throws {Error} Rzuca błąd, gdy API zwróci sukces: false lub wystąpi problem z połączeniem.
 */
export async function fetchRate(
  from: string,
  to: string
): Promise<number> {
  const res = await fetch(
    `${API_URL}/rates?from=${from}&to=${to}`
  );

  const data = await res.json();

  if (!data.success) {
    throw new Error("Błąd przeliczania");
  }

  return data.rate;
}
