export type HoldingEntity = {
  id: string;
  account: string;
  symbol?: string;
  description?: string;
  shares?: number;
  purchase_price?: number;
  cost_basis?: number;
  market_value?: number;
  currency?: string;
  created_at?: number;
  tombstone?: boolean;
};
