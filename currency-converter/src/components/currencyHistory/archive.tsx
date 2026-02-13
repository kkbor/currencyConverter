import { useState, useEffect } from "react";
import { getCurrencyHistory } from "../../hooks/getCurrencyHistory";
interface Props {
  onBack: () => void;
}
const ArchiveTable = ({onBack}: Props) => {
  const [history, setHistory] = useState<any[]>([]);

    const fetchHistory = () => {
    const data = getCurrencyHistory().reverse();
    setHistory(data);
  };
  useEffect(() => {
    fetchHistory();
  }, []);

    return (
    <div className="tableContainer archiveContent">
      {history.length > 0 ? (
        <>
          <table className="customTable ">
            <thead>
              <tr>
                <th>Kwota</th>
                <th>Z</th>
                <th></th>
                <th>Na</th>
                <th>Wynik</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item, index) => (
                <tr key={index}>
                  <td>{item.amount}</td>
                  <td>{item.currency}</td>
                  <td>&#10140;</td>
                  <td>{item.currencyconverted}</td>
                  <td>{item.result}</td>
                  <td>{new Date(item.date).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
             <button className="button-home" onClick={onBack}>Powrót</button>
          
        </>
      ) : (
        <p>Brak wyników</p>
      )}
    </div>
    
  );
};

export default ArchiveTable;