export interface GetTransactionsRequest {
  address: string;
  startBlock: string;
}

export const defaultEtherscanParamsReq = {
  module: 'account',
  action: 'txlist',
  sort: 'asc',
  apikey: import.meta.env.VITE_ETHERSCAN_API_KEY,
  page: 1,
  offset: 10,
};

export interface Transaction {
  blockHash: string;
  blockNumber: string;
  confirmations: string;
  contractAddress: string;
  cumulativeGasUsed: string;
  from: string;
  functionName: string;
  gas: string;
  gasPrice: string;
  gasUsed: string;
  hash: string;
  input: string;
  isError: string;
  methodId: string;
  nonce: string;
  timeStamp: string;
  to: string;
  transactionIndex: string;
  txreceipt_status: string;
  value: string;
}
export interface GetTransactionsResponse {
  status: string;
  message: string;
  result: Transaction[];
}
