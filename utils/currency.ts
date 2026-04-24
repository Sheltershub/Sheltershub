
export interface CurrencyConfig {
  symbol: string;
  position: 'before' | 'after';
  thousandSeparator: string;
  decimalSeparator: string;
  decimals: number;
}

const DEFAULT_CONFIG: CurrencyConfig = {
  symbol: 'GH₵',
  position: 'before',
  thousandSeparator: ',',
  decimalSeparator: '.',
  decimals: 0,
};

export const getCurrencyConfig = (): CurrencyConfig => {
  if (typeof window === 'undefined') return DEFAULT_CONFIG;
  const stored = localStorage.getItem('site_currency_config');
  return stored ? JSON.parse(stored) : DEFAULT_CONFIG;
};

export const saveCurrencyConfig = (config: CurrencyConfig) => {
  localStorage.setItem('site_currency_config', JSON.stringify(config));
  // Dispatch event so components can react if they listen, though mostly relies on re-render/reload
  window.dispatchEvent(new Event('currency-config-changed'));
};

export const formatCurrency = (amount: number): string => {
  const config = getCurrencyConfig();
  
  if (amount === undefined || amount === null) return '';

  let strAmount = amount.toFixed(config.decimals);
  // Split integer and decimal parts
  let [integerPart, decimalPart] = strAmount.split('.');

  // Add thousand separator
  const rgx = /(\d+)(\d{3})/;
  while (rgx.test(integerPart)) {
    integerPart = integerPart.replace(rgx, '$1' + config.thousandSeparator + '$2');
  }

  let formattedNumber = integerPart;
  if (config.decimals > 0) {
      formattedNumber += config.decimalSeparator + (decimalPart || '');
  }

  if (config.position === 'before') {
    return `${config.symbol}${formattedNumber}`;
  } else {
    return `${formattedNumber} ${config.symbol}`;
  }
};
