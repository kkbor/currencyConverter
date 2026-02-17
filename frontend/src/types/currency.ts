/**
 * Reprezentuje pojedynczą opcję wyboru waluty w aplikacji.
 * Wykorzystywane w selectach, liście ulubionych oraz historii.
 */
export type CurrencyOption = {
  value: string;   
  label: string;  
  flag?: string;   
};