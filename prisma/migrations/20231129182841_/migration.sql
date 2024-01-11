/*
  Warnings:

  - You are about to drop the column `nameCollaborator` on the `termos` table. All the data in the column will be lost.
  - Added the required column `collaborator` to the `termos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `termos` DROP COLUMN `nameCollaborator`,
    ADD COLUMN `collaborator` VARCHAR(191) NOT NULL;
