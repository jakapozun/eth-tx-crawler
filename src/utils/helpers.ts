import { formatInTimeZone } from 'date-fns-tz';
import { formatEther } from 'ethers';

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

export const formatTxFee = (gasPrice: string, gasUsed: string): string => {
  if (
    !gasPrice ||
    !gasUsed ||
    isNaN(Number(gasPrice)) ||
    isNaN(Number(gasUsed))
  )
    return 'Invalid Fee';

  const fee = BigInt(gasPrice) * BigInt(gasUsed);
  return formatEther(fee.toString());
};

export const convertDateToUtcTimestamp = (date: string): string => {
  if (!date) return '';

  const utcDateMidnight = new Date(`${date}T00:00:00Z`);

  if (isNaN(utcDateMidnight.getTime())) return '';

  return Math.floor(utcDateMidnight.getTime() / 1000).toString();
};

export const displayEthInUsd = (ethPrice: string, ethValue: string) => {
  if (!ethPrice || !ethValue) return '';

  const ethPriceNumber = parseFloat(ethPrice);
  const ethValueNumber = parseFloat(ethValue);

  if (isNaN(ethPriceNumber) || isNaN(ethValueNumber)) return '';

  const usdValue = ethPriceNumber * ethValueNumber;
  return usdValue.toFixed(2);
};
