CREATE TABLE `moderation_events` (
	`id` text PRIMARY KEY NOT NULL,
	`actor_id` text NOT NULL,
	`job_id` text NOT NULL,
	`action` text NOT NULL,
	`reason` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
ALTER TABLE `accounts` ADD `role` text DEFAULT 'user' NOT NULL;--> statement-breakpoint
ALTER TABLE `accounts` ADD `email_verified_at` integer;--> statement-breakpoint
ALTER TABLE `jobs` ADD `moderation_status` text DEFAULT 'approved' NOT NULL;--> statement-breakpoint
ALTER TABLE `jobs` ADD `moderation_reason` text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE `reports` ADD `status` text DEFAULT 'open' NOT NULL;--> statement-breakpoint
ALTER TABLE `reports` ADD `resolved_at` text;