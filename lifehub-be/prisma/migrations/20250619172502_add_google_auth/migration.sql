-- AlterTable
ALTER TABLE `user` ADD COLUMN `google_access_token` VARCHAR(191) NULL,
    ADD COLUMN `google_refresh_token` VARCHAR(191) NULL;
