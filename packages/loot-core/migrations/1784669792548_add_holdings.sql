BEGIN TRANSACTION;

CREATE TABLE IF NOT EXISTS holdings (
  id TEXT PRIMARY KEY,
  account TEXT NOT NULL REFERENCES accounts(id),
  symbol TEXT,
  description TEXT,
  shares REAL,
  purchase_price REAL,
  cost_basis REAL,
  market_value REAL,
  currency TEXT,
  created_at INTEGER,
  tombstone INTEGER DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_holdings_account ON holdings (account);

COMMIT;
