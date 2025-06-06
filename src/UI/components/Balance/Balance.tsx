import { type ChangeEvent, useState } from 'react';
import classes from './Balance.module.scss';
import { useEthBalanceAtBlock } from '../../../api/hooks/useAddressBalance.ts';
import { convertDateToUtcTimestamp } from '../../../utils/helpers.ts';
const newDate = new Date();

interface BalanceProps {
  address: string;
}

const Balance = ({ address }: BalanceProps) => {
  const [date, setDate] = useState<string>(newDate.toISOString().split('T')[0]);

  const { data, isLoading } = useEthBalanceAtBlock({
    address,
    timestamp: convertDateToUtcTimestamp(date) as string,
  });

  const onDateChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  return (
    <div className={classes.balance}>
      <span>ETH Balance at</span>
      <input
        className={classes.dateInput}
        type={'date'}
        value={date}
        onChange={(e) => onDateChangeHandler(e)}
      />
      {isLoading ? (
        <div className={classes.smallerLoader} />
      ) : (
        date && <span className={classes.ethValue}>: {data} ETH</span>
      )}
    </div>
  );
};

export default Balance;
