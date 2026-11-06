ALTER TABLE accounts ADD account_type text NOT NULL DEFAULT 'candidate' CHECK (account_type IN ('candidate','employer'));
-- Preserve employer access for existing accounts that have already posted or created a company.
UPDATE accounts SET account_type='employer' WHERE id IN (SELECT owner_id FROM jobs UNION SELECT owner_id FROM companies);
