const API_URL = "http://localhost:3001/api";

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
