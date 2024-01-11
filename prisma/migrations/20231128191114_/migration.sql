/*
  Warnings:

  - You are about to drop the `term` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `term` DROP FOREIGN KEY `Term_creatorId_fkey`;

-- DropTable
DROP TABLE `term`;

-- DropTable
DROP TABLE `user`;

-- CreateTable
CREATE TABLE `usuarios` (
    `id` VARCHAR(36) NOT NULL,
    `name` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `usuarios_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `termos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nameCollaborator` VARCHAR(191) NOT NULL,
    `creatorId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `perfis` (
    `id` VARCHAR(36) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,

    UNIQUE INDEX `perfis_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `permissoes` (
    `id` VARCHAR(36) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,

    UNIQUE INDEX `permissoes_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UsersOnRoles` (
    `UserOnRoleId` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(36) NOT NULL,
    `roleId` VARCHAR(36) NOT NULL,

    PRIMARY KEY (`UserOnRoleId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UsersOnPermissions` (
    `UserOnPermissionId` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(36) NOT NULL,
    `permissionId` VARCHAR(36) NOT NULL,

    PRIMARY KEY (`UserOnPermissionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RolesOnPermissions` (
    `RoleOnPermissionId` INTEGER NOT NULL AUTO_INCREMENT,
    `roleId` VARCHAR(36) NOT NULL,
    `permissionId` VARCHAR(36) NOT NULL,

    PRIMARY KEY (`RoleOnPermissionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `termos` ADD CONSTRAINT `termos_creatorId_fkey` FOREIGN KEY (`creatorId`) REFERENCES `usuarios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UsersOnRoles` ADD CONSTRAINT `UsersOnRoles_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `usuarios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UsersOnRoles` ADD CONSTRAINT `UsersOnRoles_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `perfis`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UsersOnPermissions` ADD CONSTRAINT `UsersOnPermissions_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `usuarios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UsersOnPermissions` ADD CONSTRAINT `UsersOnPermissions_permissionId_fkey` FOREIGN KEY (`permissionId`) REFERENCES `permissoes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RolesOnPermissions` ADD CONSTRAINT `RolesOnPermissions_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `perfis`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RolesOnPermissions` ADD CONSTRAINT `RolesOnPermissions_permissionId_fkey` FOREIGN KEY (`permissionId`) REFERENCES `permissoes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
