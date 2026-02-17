import { useCurrencyHistory } from "../../hooks/useCurrencyHistory";

interface Props {
  onShowArchive: () => void;
}
/**
 * @param onShowArchive -callback informujący rodzica o zmianie 
 * stanu histori, co pozwala na synchronizację innych części interfejsu.
 * @returns -komponent zwracający 3 ostatnie przewalutowania za pomocą hooka
 */
export const LastTable = ({ onShowArchive }: Props) => {
  const {history} = useCurrencyHistory();
  const lastThree = [...history].slice(-3).reverse();
  return (
    <div className="tableContainer">
      {lastThree.length > 0 ? (
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
              {lastThree.map((item, index) => (
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
          <button className="button-home" onClick={onShowArchive}>
            Historia
          </button>
          
        </>
      ) : (
        <p>Brak wyników</p>
      )}
    </div>
    
  );
};

