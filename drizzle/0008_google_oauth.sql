CREATE TABLE oauth_identities (
  provider TEXT NOT NULL,
  subject TEXT NOT NULL,
  account_id TEXT NOT NULL REFERENCES accounts(id),
  PRIMARY KEY (provider, subject),
  UNIQUE (provider, account_id)
);
CREATE TABLE oauth_flows (
  state_hash TEXT PRIMARY KEY,
  verifier TEXT NOT NULL,
  nonce TEXT NOT NULL,
  account_type TEXT NOT NULL CHECK (account_type IN ('candidate', 'employer')),
  expires_at INTEGER NOT NULL
);
