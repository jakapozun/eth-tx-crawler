import { useEthTransactions } from '../../../api/hooks/useEthTransactions.ts';
import { useLocation, useNavigate } from 'react-router';
import classes from './AddressData.module.scss';
import Loader from '../Loader/Loader.tsx';
import {
  defaultEtherscanParamsReq,
  type Transaction,
} from '../../../api/models.ts';
import classNames from 'classnames';
import {
  formatTimestampToUtc,
  formatTxFee,
  getTransactionDirection,
} from '../../../utils/helpers.ts';
import { useMemo } from 'react';
import Balance from '../Balance/Balance.tsx';
import { formatEther } from 'ethers';
import FromToLabel from '../FromToLabel/FromToLabel.tsx';

const AddressData = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const currentPage = parseInt(params.get('page') || '1', 10);

  const { data, isLoading, isFetching } = useEthTransactions();

  const transactions = useMemo(() => {
    return data?.result || [];
  }, [data?.result]);

  const handlePagination = (newPage: number) => {
    params.set('page', newPage.toString());
    navigate(`${location.pathname}?${params.toString()}`);
  };

  const isNextDisabled = useMemo(() => {
    return transactions?.length < defaultEtherscanParamsReq.offset;
  }, [transactions]);

  if (isLoading || isFetching) {
    return <Loader />;
  }

  if (params.size < 1) {
    return null;
  }

  return (
    <section className={classes.addressData}>
      <div className={classes.header}>
        <div className={classes.inputsDataContainer}>
          <h3>{params?.get('address')}</h3>
          <h4>Starting Block Number: {params?.get('blockNumber')}</h4>
        </div>
        <Balance address={params?.get('address') || ''} />
      </div>
      <div className={classes.dataBody}>
        <div className={classes.pagination}>
          <button
            onClick={() => handlePagination(currentPage - 1)}
            disabled={currentPage <= 1}
          >
            Back
          </button>
          <div className={classes.pNumber}>{currentPage}</div>
          <button
            onClick={() => handlePagination(currentPage + 1)}
            disabled={isNextDisabled}
          >
            Next
          </button>
        </div>
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
                    (params?.get('address') as string) || '',
                    item.from,
                    item.to
                  )}
                </div>
                <span>
                  <strong>Block:</strong> {item.blockNumber}
                </span>
                <FromToLabel
                  from={item.from}
                  to={item.to}
                  address={params?.get('address') || ''}
                />
              </div>
              <div className={classes.right}>
                <span>
                  <strong>Value:</strong> {formatEther(item.value)} ETH
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
