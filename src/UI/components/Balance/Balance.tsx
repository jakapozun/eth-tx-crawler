import { type ChangeEvent, useState } from 'react';
import classes from './Balance.module.scss';
import {
  useEthBalanceAtBlock,
  useEthPrice,
} from '../../../api/hooks/useAddressBalance.ts';
import {
  convertDateToUtcTimestamp,
  displayEthInUsd,
} from '../../../utils/helpers.ts';
const newDate = new Date();

interface BalanceProps {
  address: string;
}

const Balance = ({ address }: BalanceProps) => {
  const [date, setDate] = useState<string>(newDate.toISOString().split('T')[0]);

  const { data: currentEthPrice } = useEthPrice();

  const { data: tokenBalancesList, isLoading } = useEthBalanceAtBlock({
    address,
    timestamp: convertDateToUtcTimestamp(date) as string,
  });

  const onDateChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  return (
    <div className={classes.balance}>
      <div className={classes.titleContainer}>
        <span>Token balances as of </span>
        <input
          className={classes.dateInput}
          type={'date'}
          value={date}
          onChange={(e) => onDateChangeHandler(e)}
        />
      </div>
      <div className={classes.tokenList}>
        {isLoading ? (
          <div className={classes.smallerLoader} />
        ) : (
          tokenBalancesList?.map((token) => (
            <div className={classes.singleTokenInfo} key={token.label}>
              <p className={classes.label}>{token.label}</p>
              <p>
                {token.value}
                {token.label === 'ETH' && (
                  <span className={classes.usdValue}>
                    (${displayEthInUsd(currentEthPrice, token.value)})
                  </span>
                )}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Balance;
