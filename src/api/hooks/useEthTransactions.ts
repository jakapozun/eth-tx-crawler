import { useQuery } from '@tanstack/react-query';
import {
  defaultEtherscanParamsReq,
  type GetTransactionsRequest,
  type GetTransactionsResponse,
} from '../models.ts';
import axios, { type AxiosResponse, AxiosError } from 'axios';
import { ETHERSCAN_BASE_URL } from '../../utils/constants.ts';
import { useLocation } from 'react-router';

const getEthTransactions = async ({
  address,
  startBlock,
}: GetTransactionsRequest) => {
  try {
    const res = (await axios(ETHERSCAN_BASE_URL, {
      params: {
        ...defaultEtherscanParamsReq,
        address,
        startblock: startBlock,
      },
    })) as AxiosResponse<GetTransactionsResponse>;

    if (res.status === 200) {
      return res.data;
    }
  } catch (e) {
    console.error(e);
    throw new Error((e as AxiosError).message);
  }
};

export const useEthTransactions = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  return useQuery({
    queryKey: [
      'ethTransactions',
      params.get('address'),
      params.get('blockNumber'),
    ],
    queryFn: () =>
      getEthTransactions({
        address: params.get('address') || '',
        startBlock: params.get('blockNumber') || '',
      }),
    enabled: !!params.get('address') && !!params.get('blockNumber'),
    staleTime: 1000 * 60 * 5,
  });
};
