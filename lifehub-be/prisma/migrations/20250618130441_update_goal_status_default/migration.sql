/*
  Warnings:

  - Made the column `status` on table `goal` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `goal` MODIFY `status` VARCHAR(191) NOT NULL DEFAULT 'Not Started';
