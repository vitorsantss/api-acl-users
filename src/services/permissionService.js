/* eslint-disable no-unused-vars */
import { PrismaClient } from '@prisma/client';
import AlreadyExist from '../errors/alreadyExist.js';
import NotFound from '../errors/notFound.js';
const prisma = new PrismaClient();

class PermissionService {

    // Método para criar uma nova permissão
    static async createPermission(dto) {
        const permission = await prisma.permission.findUnique({
            where: {
                name: dto.name
            }
        });
        if (permission) {
            throw new AlreadyExist('Permissão já cadastrada.');
        }
        try {
        // Cria uma nova permissão no banco de dados
            const newPermission = await prisma.permission.create({
                data: {
                    name: dto.name,
                    description: dto.description
                }
            });
            return newPermission;
        } catch (error) {
            if (error instanceof AlreadyExist) {
                throw error;
            } else {
                throw Error(error);
            }
        }
    }

    // Método para listar todas as permissões
    static async listPermissions() {
        try {
            const permissions = await prisma.permission.findMany();
            return permissions;
        } catch (error) {
            throw new Error(error);
        }
    }

    // Método para obter detalhes de uma permissão específica
    static async listPermission(id) {
        try {
            const permission = await prisma.permission.findFirst({
                where: {
                    id: id
                }
            });
            if (!permission) {
                throw new NotFound('Permissão não encontrada.');
            }
            return permission;
        } catch (error) {
            if (error instanceof NotFound) {
                throw error;
            } else {
                throw Error(error);
            }
        }
    }

    // Método para atualizar uma permissão existente
    static async updatePermission(dto) {
        const permission = await this.listPermission(dto.id);
        try {
            permission.name = dto.name;
            permission.description = dto.description;
            await prisma.permission.update(permission);
            return await permission.reload();
        } catch (error) {
            throw new Error(error);
        }
    }

    // Método para excluir uma permissão existente
    static async deletePermission(id) {
        const permission = await this.listPermission(id);
        try {
            await prisma.permission.delete({
                where: {
                    id: id
                }
            });
        } catch (error) {
            throw new Error(error);
        }
    }
}

export default PermissionService;