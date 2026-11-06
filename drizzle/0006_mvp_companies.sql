CREATE TABLE companies (
  id TEXT PRIMARY KEY,
  owner_id TEXT NOT NULL UNIQUE REFERENCES accounts(id),
  name TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  city TEXT NOT NULL DEFAULT '',
  website TEXT NOT NULL DEFAULT '',
  updated_at TEXT NOT NULL
);
CREATE INDEX jobs_public_search ON jobs(moderation_status,status,created_at,id);
CREATE INDEX applications_job ON applications(job_id,created_at);
-- Existing publications remain unchanged; new/edited publications go through review in the service.
