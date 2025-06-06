import { useQuery } from '@tanstack/react-query';
import {
  defaultEtherscanParamsReq,
  type GetTransactionsRequest,
  type GetTransactionsResponse,
} from '../models.ts';
import axios, { type AxiosResponse, AxiosError } from 'axios';
import { ETHERSCAN_BASE_URL } from '../../utils/constants.ts';
import { useLocation, useNavigate } from 'react-router';

const getEthTransactions = async ({
  address,
  startBlock,
  page,
}: GetTransactionsRequest) => {
  try {
    const res = (await axios(ETHERSCAN_BASE_URL, {
      params: {
        ...defaultEtherscanParamsReq,
        address,
        startblock: startBlock,
        page,
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
  const navigate = useNavigate();

  const address = params.get('address') || '';
  const blockNumber = params.get('blockNumber') || '';
  const page = parseInt(params.get('page') || '1', 10);

  return useQuery({
    queryKey: ['ethTransactions', address, blockNumber, page],
    queryFn: async () => {
      const res = await getEthTransactions({
        address,
        startBlock: blockNumber,
        page,
      });

      if (res?.status !== '1') {
        navigate('/');
      }

      return res;
    },
    enabled: !!params.get('address') && !!params.get('blockNumber'),
    staleTime: 1000 * 60 * 5,
  });
};
