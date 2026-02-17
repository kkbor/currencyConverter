import { components } from "react-select";
import type { CurrencyOption } from "../../types/currency";
/**
 * Niestandardowy komponent opcji dla React-Select.
 * Odpowiada za renderowanie wiersza z flagą państwa, pełną nazwą waluty
 * oraz jej skróconym kodem (np. USD).
 * @param props - Właściwości przekazywane automatycznie przez React-Select
 */
export const CurrencyOptionComponent = (props: any) => {
  const { data } = props as { data: CurrencyOption };

   return (
    <components.Option {...props}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {data.flag && <img src={data.flag} alt="" width={20} height={14} />}
        <span>{data.label}</span>
        <strong style={{ marginLeft: "auto" }}>{data.value}</strong>
      </div>
    </components.Option>
  );
};