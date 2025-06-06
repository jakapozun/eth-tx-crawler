import axios, { AxiosError } from 'axios';
import { ETHERSCAN_BASE_URL, INFURA_BASE_URL } from '../../utils/constants.ts';
import { type GetBalance } from '../models.ts';
import { useQuery } from '@tanstack/react-query';
import { formatEther, JsonRpcProvider } from 'ethers';

const getBlockByTimestamp = async (timestamp: string) => {
  try {
    const res = await axios(ETHERSCAN_BASE_URL, {
      params: {
        module: 'block',
        action: 'getblocknobytime',
        timestamp: timestamp,
        closest: 'before',
        apiKey: import.meta.env.VITE_ETHERSCAN_API_KEY,
      },
    });

    if (res.status === 200) {
      return res.data.result;
    }
  } catch (e) {
    console.error(e);
    throw new Error((e as AxiosError).message);
  }
};

const provider = new JsonRpcProvider(
  `${INFURA_BASE_URL}/${import.meta.env.VITE_INFURA_API_KEY}`
);

const getAddressBalanceAtBlock = async (
  address: string,
  blockNumber: string
) => {
  try {
    const balance = await provider.getBalance(address, BigInt(blockNumber));
    return formatEther(balance);
  } catch (e) {
    console.error(e);
    throw new Error((e as AxiosError).message);
  }
};

export const useEthBalanceAtBlock = ({ address, timestamp }: GetBalance) => {
  const { data, isSuccess } = useQuery({
    queryKey: ['blockByTimestamp', timestamp],
    queryFn: () => getBlockByTimestamp(timestamp),
    enabled: !!timestamp,
  });

  return useQuery({
    queryKey: ['ethBalance', address, timestamp],
    queryFn: () =>
      getAddressBalanceAtBlock(address, data && isSuccess ? data : 'latest'),
    enabled: !!address && !!data,
    staleTime: 1000 * 60 * 5,
  });
};
