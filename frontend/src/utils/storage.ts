/**
 * Pobiera dane z localStorage i parsuje je do tablicy.
 * @param key - Klucz pod którym zapisane są dane.
 * @returns Tablica typu T lub pusta tablica w przypadku braku danych.
 */
export const getFromStorage = <T>(key: string): T[] => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};
/**
 * Konwertuje dane na format JSON i zapisuje je w localStorage.
 * @param key - Unikalna nazwa klucza pod którym zostaną zapisane dane.
 * @param value - Dane do zapisu (obiekty, tablice, stringi).
 */
export const saveToStorage = (key: string, value: unknown) => {
  localStorage.setItem(key, JSON.stringify(value));
};