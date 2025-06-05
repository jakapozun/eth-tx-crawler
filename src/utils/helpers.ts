import { formatInTimeZone } from 'date-fns-tz';

export type TxDirection = 'IN' | 'OUT' | 'OTHER';

export const getTransactionDirection = (
  address: string,
  from: string,
  to: string
): TxDirection => {
  if (from.toLowerCase() === address.toLowerCase()) {
    return 'OUT';
  } else if (to.toLowerCase() === address.toLowerCase()) {
    return 'IN';
  }
  return 'OTHER';
};

export const formatTimestampToUtc = (timestamp: string): string => {
  const formattedTimestamp = Number(timestamp) * 1000;
  const date = new Date(formattedTimestamp);

  if (date) {
    return formatInTimeZone(date, 'UTC', 'yyyy-MM-dd HH:mm:ss');
  }

  return '';
};

export const formatWeiToEth = (wei: string): string => {
  const weiValue = BigInt(wei);
  const ethValue = weiValue / BigInt(10 ** 18);
  const remainder = weiValue % BigInt(10 ** 18);

  const decimal = remainder.toString().padStart(18, '0').replace(/0+$/, '');
  return decimal ? `${ethValue}.${decimal}` : ethValue.toString();
};

export const formatTxFee = (gasPrice: string, gasUsed: string): string => {
  const fee = BigInt(gasPrice) * BigInt(gasUsed);
  return formatWeiToEth(fee.toString());
};
