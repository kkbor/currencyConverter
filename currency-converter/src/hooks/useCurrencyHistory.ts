import { useEffect, useState } from "react";
import { getCurrencyHistory } from "../utils/getCurrencyHistory";

export const useCurrencyHistory = () => {
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    const data = getCurrencyHistory();
    setHistory(data);
  }, []);

  return { history };
};