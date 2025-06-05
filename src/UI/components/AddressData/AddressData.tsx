import { useEthTransactions } from '../../../api/hooks/useEthTransactions.ts';
import { useLocation } from 'react-router';
import classes from './AddressData.module.scss';
import Loader from '../Loader/Loader.tsx';
import type { Transaction } from '../../../api/models.ts';
import classNames from 'classnames';
import {
  formatTimestampToUtc,
  formatTxFee,
  formatWeiToEth,
  getTransactionDirection,
} from '../../../utils/helpers.ts';
import { useMemo } from 'react';

const AddressData = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  console.log(params);
  const { data, isLoading, isFetching } = useEthTransactions();

  const transactions = useMemo(() => {
    return data?.result || [];
  }, [data?.result]);

  if (isLoading || isFetching) {
    return <Loader />;
  }

  const displayFromToLabel = (from: string, to: string) => {
    const value = getTransactionDirection(
      params?.get('address') as string,
      from,
      to
    );

    if (value === 'IN') {
      return (
        <span>
          <strong>From:</strong> {from}
        </span>
      );
    } else if (value === 'OUT') {
      return (
        <span>
          <strong>To:</strong> {to}
        </span>
      );
    }
  };

  if (params.size < 1) {
    return null;
  }

  return (
    <section className={classes.addressData}>
      <div className={classes.header}>
        <h3>{params?.get('address')}</h3>
        <h4>Starting Block Number: {params?.get('blockNumber')}</h4>
      </div>

      <div className={classes.dataBody}>
        {transactions?.length > 0 ? (
          transactions?.map((item: Transaction) => (
            <div
              key={item.hash}
              className={classNames(
                classes.singleTx,
                classes[
                  getTransactionDirection(
                    params?.get('address') as string,
                    item.from,
                    item.to
                  )
                ]
              )}
            >
              <div className={classes.left}>
                <div
                  className={classNames(
                    classes.txDirectionChip,
                    classes[
                      getTransactionDirection(
                        params?.get('address') as string,
                        item.from,
                        item.to
                      )
                    ]
                  )}
                >
                  {getTransactionDirection(
                    params?.get('address') as string,
                    item.from,
                    item.to
                  )}
                </div>
                <span>
                  <strong>Block:</strong> {item.blockNumber}
                </span>
                {displayFromToLabel(item.from, item.to)}
              </div>
              <div className={classes.right}>
                <span>
                  <strong>Value:</strong> {formatWeiToEth(item.value)} ETH
                </span>
                <span>
                  <strong>Tx Fee:</strong>{' '}
                  {formatTxFee(item.gasUsed, item.gasPrice)}
                </span>
                <span className={classes.date}>
                  {formatTimestampToUtc(item.timeStamp)}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className={classes.emptyState}>{data?.message}</div>
        )}
      </div>
    </section>
  );
};

export default AddressData;
