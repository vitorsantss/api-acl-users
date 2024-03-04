/* eslint-disable no-unused-vars */
import { PrismaClient } from '@prisma/client';
import AlreadyExist from '../errors/alreadyExist.js';
import NotFound from '../errors/notFound.js';
const prisma = new PrismaClient();

class RoleService {

    // Método para criar uma nova role
    static async createRole(dto) {
        const role = await prisma.role.findFirst({
            where: {
                name: dto.name
            }
        });
        if (role) {
            throw new AlreadyExist('Role já cadastrada.');
        }
        try {
            const newRole =  await prisma.role.create({
                data: {
                    name: dto.name,
                    description: dto.description
                }
            });
            return newRole;
        } catch (error) {
            if (error instanceof AlreadyExist) {
                throw error;
            } else {
                throw Error(error);
            }
        }
    }

    // Método para listar todas as roles com suas permissões associadas
    static async listRoles() {
        try {
            const roles = await prisma.role.findMany({
                select: {
                    id: true,
                    name: true,
                    description: true,
                    role_permissions: {
                        select: {
                            permission: true,
                        },
                    }
                },
            });
            return roles;
        } catch (error) {
            throw new Error(error);
        }
        
    }

    // Método para obter detalhes de uma role específica com suas permissões associadas
    static async listRole(id) {
        try {
            const role = await prisma.role.findFirst({         
                where: {
                    id: id,
                },
                select: {
                    id: true,
                    name: true,
                    description: true,
                    role_permissions: {
                        select: {
                            permission: true,
                        },
                    }
                },
            });
            if (!role) {
                throw new NotFound('Role não encontrada.');
            }
            return role; 
        } catch (error) {
            if (error instanceof NotFound) {
                throw error;
            } else {
                throw Error(error);
            }
        }
    }

    
    // Método para atualizar uma role existente
    static async updateRole(dto) {
        const role = await this.listRole(dto.id);
        try {
            role.nome = dto.nome,
            role.descricao = dto.descricao;
            await prisma.role.update(role);
            return await role.reload();
        } catch (error) {
            throw new Error(error);
        }
    }

    // Método para excluir uma role existente
    static async deleteRole(id) {
        const role = await this.listRole(id);
        try {
            await prisma.role.delete({
                where: {
                    id: id
                }
            });
        } catch (error) {
            throw new Error(error);
        }
    }
}

export default RoleService;
