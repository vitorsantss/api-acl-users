import { PrismaClient } from '@prisma/client';
import NotFound from '../errors/notFound.js';
import Unauthorized from '../errors/unauthorized.js';

const prisma = new PrismaClient();


const permissions = (arrayPermissions) => {
    return async (req, res, next) => {
        // Obtém o ID do usuário a partir do objeto req
        const { userId } = req;

        // Consulta o banco de dados para obter informações do usuário, incluindo suas permissões
        const user = await prisma.user.findFirst({
            where: {
                id: userId
            },
            select: {
                id: true,
                name: true,
                email: true,
                user_permissions: {
                    select: {
                        permission: true,
                    },
                },
            }
        });

        // Retorna um erro de usuário não encontrado se o usuário não existir
        if (!user) {
            return new NotFound('Usuário não encontrado').sendReply(res);
        }

        // Verifica se o usuário possui pelo menos uma das permissões necessárias
        const permissionsRegistered = user.user_permissions
            .map((userPermissions) => userPermissions.permission.name)
            .some((permissionName) => arrayPermissions.includes(permissionName));

        // Retorna um erro de não autorizado se o usuário não possuir as permissões necessárias
        if (!permissionsRegistered) {
            return new Unauthorized('Usuário não possui acesso a essa rota.').sendReply(res);
        }

        // Continua para o próximo middleware ou rota se as permissões forem atendidas
        return next();
    };
};

export default permissions;
