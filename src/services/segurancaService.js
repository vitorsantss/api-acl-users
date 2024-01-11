import { PrismaClient } from '@prisma/client';
import NotFound from '../errors/notFound.js';
const prisma = new PrismaClient();

class SegurancaService {

    // Método para criar uma nova Acl (Access Control List) associando roles e permissions a um usuário
    static async createAcl(dto) {
        const user = await prisma.user.findFirst({
            where: {
                id: dto.userId
            },
            include: {
                user_roles: {
                    include: {
                        role: true
                    }
                },
                user_permissions: {
                    include: {
                        permission: true
                    }
                }
            }
        });
        
        if (!user) {
            throw new NotFound('Usuário não encontrado');
        }

        const roles = await prisma.role.findMany({
            where: {
                id: {
                    in: dto.roles
                }
            }
        });

        const permissions = await prisma.permission.findMany({
            where: {
                id: {
                    in: dto.permissions
                }
            }
        });

        await prisma.UsersOnRoles.deleteMany({
            where: {
                userId: user.id,
            },
        });
      
        await prisma.UsersOnPermissions.deleteMany({
            where: {
                userId: user.id,
            },
        });

        await prisma.usersOnRoles.createMany({
            data: roles.map(role => ({
                userId: user.id,
                roleId: role.id,
            })),
        });
  
        await prisma.usersOnPermissions.createMany({
            data: permissions.map(permission => ({
                userId: user.id,
                permissionId: permission.id,
            })),
        });

        const newUser = await prisma.user.findMany({
            where: {
                id: dto.userId,
            },
            select: {
                id: true,
                name: true,
                email: true,
                user_roles: {
                    select: {
                        role: true,
                    },
                },
                user_permissions: {
                    select: {
                        permission: true,
                    },
                },
            },
        });

        return newUser;
    }

    
    // Método para associar permissions a uma role existente
    static async createPermissionsRoles(dto) {
        const role = await prisma.role.findFirst({
            where: {
                id: dto.roleId
            },
            include: {
                role_permissions: {
                    include: {
                        permission: true
                    }
                }
            }
        });

        if (!role) {
            throw new NotFound('Role não cadastrada.');
        }

        const permissions = await prisma.permission.findMany({
            where: {
                id: {
                    in: dto.permissions
                }
            }
        });

        await prisma.rolesOnPermissions.deleteMany({
            where: {
                roleId: role.id,
            },
        });

        await prisma.rolesOnPermissions.createMany({
            data: permissions.map(permission => ({
                roleId: role.id,
                permissionId: permission.id,
            })),
        });

        const newRole = await prisma.role.findMany({
            where: {
                id: role.id,
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

        return newRole;
    }
}

export default SegurancaService;