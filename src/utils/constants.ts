import type { TokenContract } from '../api/models.ts';

export const ETHERSCAN_BASE_URL = 'https://api.etherscan.io/api';
export const INFURA_BASE_URL = 'https://mainnet.infura.io/v3';

export const TOKEN_CONTRACTS: TokenContract[] = [
  {
    label: 'USDT',
    address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    decimals: 6,
  },
  {
    label: 'TRAC',
    address: '0xaa7a9ca87d3694b5755f213b5d04094b8d0f0a6f',
    decimals: 18,
  },
  {
    label: 'USDC',
    address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    decimals: 6,
  },
];
