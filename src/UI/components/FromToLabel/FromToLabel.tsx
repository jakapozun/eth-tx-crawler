import { getTransactionDirection } from '../../../utils/helpers.ts';

interface FromToLabelProps {
  from: string;
  to: string;
  address: string;
}

const FromToLabel = ({ from, to, address }: FromToLabelProps) => {
  const value = getTransactionDirection(address, from, to);

  return (
    <span>
      {value === 'IN' && (
        <>
          <strong>From:</strong> {from}
        </>
      )}
      {value === 'OUT' && (
        <>
          <strong>To:</strong> {to}
        </>
      )}
    </span>
  );
};

export default FromToLabel;
