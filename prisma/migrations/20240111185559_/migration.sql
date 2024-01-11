/*
  Warnings:

  - You are about to drop the `perfis` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `permissoes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `termos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `usuarios` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `rolesonpermissions` DROP FOREIGN KEY `RolesOnPermissions_permissionId_fkey`;

-- DropForeignKey
ALTER TABLE `rolesonpermissions` DROP FOREIGN KEY `RolesOnPermissions_roleId_fkey`;

-- DropForeignKey
ALTER TABLE `termos` DROP FOREIGN KEY `termos_creatorId_fkey`;

-- DropForeignKey
ALTER TABLE `usersonpermissions` DROP FOREIGN KEY `UsersOnPermissions_permissionId_fkey`;

-- DropForeignKey
ALTER TABLE `usersonpermissions` DROP FOREIGN KEY `UsersOnPermissions_userId_fkey`;

-- DropForeignKey
ALTER TABLE `usersonroles` DROP FOREIGN KEY `UsersOnRoles_roleId_fkey`;

-- DropForeignKey
ALTER TABLE `usersonroles` DROP FOREIGN KEY `UsersOnRoles_userId_fkey`;

-- DropTable
DROP TABLE `perfis`;

-- DropTable
DROP TABLE `permissoes`;

-- DropTable
DROP TABLE `termos`;

-- DropTable
DROP TABLE `usuarios`;

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(36) NOT NULL,
    `name` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Role` (
    `id` VARCHAR(36) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,

    UNIQUE INDEX `Role_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Permission` (
    `id` VARCHAR(36) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,

    UNIQUE INDEX `Permission_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UsersOnRoles` ADD CONSTRAINT `UsersOnRoles_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UsersOnRoles` ADD CONSTRAINT `UsersOnRoles_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Role`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UsersOnPermissions` ADD CONSTRAINT `UsersOnPermissions_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UsersOnPermissions` ADD CONSTRAINT `UsersOnPermissions_permissionId_fkey` FOREIGN KEY (`permissionId`) REFERENCES `Permission`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RolesOnPermissions` ADD CONSTRAINT `RolesOnPermissions_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Role`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RolesOnPermissions` ADD CONSTRAINT `RolesOnPermissions_permissionId_fkey` FOREIGN KEY (`permissionId`) REFERENCES `Permission`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
