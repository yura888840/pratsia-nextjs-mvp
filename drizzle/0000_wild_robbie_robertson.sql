CREATE TABLE `applications` (
	`id` text PRIMARY KEY NOT NULL,
	`job_id` text NOT NULL,
	`candidate_id` text NOT NULL,
	`profile_snapshot` text NOT NULL,
	`message` text NOT NULL,
	`status` text DEFAULT 'new' NOT NULL,
	`created_at` text NOT NULL,
	FOREIGN KEY (`job_id`) REFERENCES `jobs`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `application_candidate_job` ON `applications` (`job_id`,`candidate_id`);--> statement-breakpoint
CREATE TABLE `favorites` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`job_id` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `favorite_user_job` ON `favorites` (`user_id`,`job_id`);--> statement-breakpoint
CREATE TABLE `jobs` (
	`id` text PRIMARY KEY NOT NULL,
	`owner_id` text NOT NULL,
	`title` text NOT NULL,
	`company` text NOT NULL,
	`occupation` text NOT NULL,
	`category` text NOT NULL,
	`country` text DEFAULT 'UA' NOT NULL,
	`city` text NOT NULL,
	`arrangement` text NOT NULL,
	`schedule` text NOT NULL,
	`salary_min` integer NOT NULL,
	`salary_max` integer NOT NULL,
	`currency` text DEFAULT 'UAH' NOT NULL,
	`experience` text NOT NULL,
	`description` text NOT NULL,
	`requirements` text NOT NULL,
	`benefits` text DEFAULT '' NOT NULL,
	`status` text DEFAULT 'active' NOT NULL,
	`created_at` text NOT NULL,
	`expires_at` text NOT NULL,
	`source_url` text,
	`source_id` text
);
--> statement-breakpoint
CREATE TABLE `profiles` (
	`user_id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`phone` text NOT NULL,
	`city` text NOT NULL,
	`occupation` text NOT NULL,
	`salary` integer NOT NULL,
	`experience` text NOT NULL,
	`skills` text NOT NULL,
	`about` text NOT NULL,
	`schedule` text NOT NULL,
	`specialties` text DEFAULT '{}' NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `reports` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`job_id` text NOT NULL,
	`reason` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `saved_searches` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`name` text NOT NULL,
	`filters` text NOT NULL,
	`created_at` text NOT NULL
);
