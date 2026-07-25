import type {
  GoCardlessAmount,
  GoCardlessBalance,
  GoCardlessTransaction,
} from './gocardless';

export type BankSyncBalance = GoCardlessBalance;
export type BankSyncAmount = GoCardlessAmount;
export type BankSyncTransaction = GoCardlessTransaction;

export type BankSyncHolding = {
  symbol?: string;
  description?: string;
  shares?: string | number;
  purchase_price?: string | number;
  cost_basis?: string | number;
  market_value?: string | number;
  currency?: string;
  created?: number;
};

export type BankSyncResponse = {
  transactions: {
    all: BankSyncTransaction[];
    booked: BankSyncTransaction[];
    pending: BankSyncTransaction[];
  };
  balances: BankSyncBalance[];
  startingBalance: number;
  error_type: string;
  error_code: string;
  holdings?: BankSyncHolding[];
};

export const SYNC_PROVIDERS = [
  'goCardless',
  'simpleFin',
  'pluggyai',
  'enableBanking',
  'akahu',
] as const;

export type BankSyncProviders = (typeof SYNC_PROVIDERS)[number];
export type BankSyncCredentialSource = 'per-budget-file' | 'global';
export type BankSyncProviderStatus = {
  configured?: boolean;
  source?: BankSyncCredentialSource;
  error?: string;
};
