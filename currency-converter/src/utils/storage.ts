export const getFromStorage = <T>(key: string): T[] => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

export const saveToStorage = (key: string, value: unknown) => {
  localStorage.setItem(key, JSON.stringify(value));
};