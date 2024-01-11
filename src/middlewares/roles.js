import { PrismaClient } from '@prisma/client';
import NotFound from '../errors/notFound.js';
import Unauthorized from '../errors/unauthorized.js';

const prisma = new PrismaClient();

const roles = (arrayRoles) => {
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
                email: true,
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

        // Verifica se o usuário possui pelo menos um das roles necessárias
        const rolesRegistered = user.user_roles
            .map((userRole) => userRole.role.name)
            .some((roleName) => arrayRoles.includes(roleName));

        // Retorna um erro de não autorizado se o usuário não possuir as roles necessárias
        if (!rolesRegistered) {
            return new Unauthorized('Usuário não possui acesso a essa rota.').sendReply(res);
        }

        // Continua para o próximo middleware ou rota se as roles forem atendidas
        return next();
    };
};

export default roles;
