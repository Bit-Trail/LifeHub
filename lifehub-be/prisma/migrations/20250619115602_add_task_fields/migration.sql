/*
  Warnings:

  - You are about to drop the column `date` on the `task` table. All the data in the column will be lost.
  - You are about to drop the column `done` on the `task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `task` DROP COLUMN `date`,
    DROP COLUMN `done`,
    ADD COLUMN `completed` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `dueDate` DATETIME(3) NULL,
    ADD COLUMN `reminderAt` DATETIME(3) NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NULL,
    MODIFY `category` VARCHAR(191) NOT NULL DEFAULT 'Personal';
