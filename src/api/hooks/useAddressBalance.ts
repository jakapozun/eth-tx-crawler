import axios, { AxiosError } from 'axios';
import {
  ETHERSCAN_BASE_URL,
  INFURA_BASE_URL,
  TOKEN_CONTRACTS,
} from '../../utils/constants.ts';
import { type GetBalance } from '../models.ts';
import { useQuery } from '@tanstack/react-query';
import { ethers, formatEther, JsonRpcProvider } from 'ethers';

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

const ERC20_ABI = ['function balanceOf(address owner) view returns (uint256)'];
const provider = new JsonRpcProvider(
  `${INFURA_BASE_URL}/${import.meta.env.VITE_INFURA_API_KEY}`
);

const getAddressBalanceAtBlock = async (
  address: string,
  blockNumber: string
) => {
  const balances: {
    label: string;
    value: string;
  }[] = [];

  try {
    //get eth balance
    const ethBalanceOfAddress = await provider
      .getBalance(address, BigInt(blockNumber))
      .then((res) => res)
      .catch((e) => {
        console.error('Error fetching ETH balance:', e);
        return 0;
      });

    //get other tokens balance
    for (const token of TOKEN_CONTRACTS) {
      const contract = new ethers.Contract(token.address, ERC20_ABI, provider);
      const tokenBalance = await contract.balanceOf(address, {
        blockTag: BigInt(blockNumber),
      });
      balances.push({
        label: token.label,
        value: ethers.formatUnits(tokenBalance, token.decimals),
      });
    }

    balances.unshift({
      label: 'ETH',
      value: parseFloat(formatEther(ethBalanceOfAddress)).toFixed(6),
    });

    return balances;
  } catch (e) {
    console.error(e);
    throw new Error((e as AxiosError).message);
  }
};

export const useEthBalanceAtBlock = ({ address, timestamp }: GetBalance) => {
  const { data: block, isSuccess } = useQuery({
    queryKey: ['blockByTimestamp', timestamp],
    queryFn: () => getBlockByTimestamp(timestamp),
    enabled: !!timestamp,
  });

  return useQuery({
    queryKey: ['ethBalance', address, timestamp],
    queryFn: () =>
      getAddressBalanceAtBlock(address, block && isSuccess ? block : 'latest'),
    enabled: !!address && !!block,
    staleTime: 1000 * 60 * 5,
  });
};

export const useEthPrice = () => {
  return useQuery({
    queryKey: ['ethPrice'],
    queryFn: async () => {
      const res = await axios.get(
        'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd'
      );
      return res.data.ethereum.usd;
    },
    staleTime: 1000 * 60 * 2,
  });
};
