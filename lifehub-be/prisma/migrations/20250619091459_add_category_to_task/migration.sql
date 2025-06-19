/*
  Warnings:

  - You are about to drop the column `completed` on the `task` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `task` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `task` DROP FOREIGN KEY `Task_userId_fkey`;

-- DropIndex
DROP INDEX `Task_userId_fkey` ON `task`;

-- AlterTable
ALTER TABLE `task` DROP COLUMN `completed`,
    DROP COLUMN `createdAt`,
    ADD COLUMN `category` VARCHAR(191) NOT NULL DEFAULT 'personal',
    ADD COLUMN `done` BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
