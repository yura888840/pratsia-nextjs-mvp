CREATE INDEX `applications_candidate` ON `applications` (`candidate_id`);--> statement-breakpoint
CREATE INDEX `jobs_active_expiry` ON `jobs` (`status`,`expires_at`);--> statement-breakpoint
CREATE INDEX `jobs_owner` ON `jobs` (`owner_id`);--> statement-breakpoint
CREATE INDEX `jobs_created` ON `jobs` (`created_at`);