-- DropForeignKey
ALTER TABLE `goal` DROP FOREIGN KEY `Goal_userId_fkey`;

-- DropIndex
DROP INDEX `Goal_userId_fkey` ON `goal`;

-- AlterTable
ALTER TABLE `goal` MODIFY `description` VARCHAR(191) NULL,
    MODIFY `status` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Goal` ADD CONSTRAINT `Goal_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
