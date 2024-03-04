import { PrismaClient } from '@prisma/client';
import NotFound from '../errors/notFound.js';
import Unauthorized from '../errors/unauthorized.js';

const prisma = new PrismaClient();


const permissionsRoles = (arrayPermissions) => {
    return async (req, res, next) => {
        // Obtém o ID do usuário a partir do objeto req
        const { userId } = req;

        // Consulta o banco de dados para obter informações do usuário, incluindo as roles associadas
        const user = await prisma.user.findFirst({
            where: {
                id: userId
            },
            select: {
                id: true,
                name: true,
                user_roles: {
                    select: {
                        role: true,
                    },
                },
            }
        });

        // Retorna um erro de usuário não encontrado se o usuário não existir
        if (!user) {
            return new NotFound('Usuário não encontrado').sendReply(res);
        }

        let arrayRolesId = [];

        // Constrói um array de IDs de roles associadas ao usuário, se houver
        if (user.user_roles && user.user_roles.length > 0) {
            arrayRolesId = user.user_roles.map((userRole) => userRole.role.id);
        }

        // Retorna um erro de não autorizado se o usuário não tiver nenhuma role associada
        if (arrayRolesId.length === 0) {
            return new Unauthorized('Usuário não possui acesso a essa rota.').sendReply(res);
        }

        // Consulta o banco de dados para obter informações sobre as roles e suas permissões
        const roles = await prisma.role.findMany({
            where: {
                id: {
                    in: arrayRolesId
                }
            },
            select: {
                id: true,
                name: true,
                role_permissions: {
                    select: {
                        permission: true,
                    },
                },
            }
        });

        let hasPermission = false;

        // Verifica se o usuário possui pelo menos uma das permissões necessárias entre suas roles
        roles.map((role) => {
            hasPermission = role.role_permissions
                .map((permission) => permission.permission.name)
                .some((permission) => arrayPermissions.includes(permission));
        });

        // Retorna um erro de não autorizado se o usuário não possuir as permissões necessárias
        if (!hasPermission) {
            return new Unauthorized('Usuário não possui acesso a essa rota.').sendReply(res);
        }

        // Continua para o próximo middleware ou rota se as permissões forem atendidas
        return next();
    };
};


export default permissionsRoles;
