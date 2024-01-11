/* eslint-disable no-unused-vars */
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import bcrypt from 'bcryptjs';


async function main() {
    // Gerar um salt e criar um hash da senha root usando bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(process.env.ROOT_PASSWORD, salt);

    // Criar o usuário root no banco de dados
    const root = await prisma.user.upsert({
        where: { email: process.env.ROOT_EMAIL },
        update: {},
        create: {
            name: 'root',
            email: process.env.ROOT_EMAIL,
            password: hashPassword
        }
    });

    // Criar as roles 'user' e 'administrador'
    const roleUser = await prisma.role.create({
        data: {
            name: 'user',
            description: 'Usuário padrão'
        }
    });

    const roleAdmin = await prisma.role.create({
        data: {
            name: 'administrador',
            description: 'Usuário administrador'
        }
    });

    // Criar as permissões 'listar', 'cadastrar', 'editar' e 'deletar'
    const newPermissions = await prisma.permission.createMany({
        data: [
            { name: 'listar', description: 'Permissão de listar dados no sistema.' },
            { name: 'cadastrar', description: 'Permissão de cadastrar dados no sistema.' },
            { name: 'editar', description: 'Permissão de editar dados no sistema.' },
            { name: 'deletar', description: 'Permissão de deletar dados no sistema.' }
        ]
    });

    // Obter todas as permissões existentes no banco de dados
    const permissionsAdmin = await prisma.permission.findMany({});

    // Encontrar uma permissão específica ('Listar') para usuários
    const permissionsUser = await prisma.permission.findFirst({
        where: { name: 'Listar' }
    });

    // Associar a permissão 'Listar' à role 'user'
    const permissionsRoleUser = await prisma.rolesOnPermissions.create({
        data: { roleId: roleUser.id, permissionId: permissionsUser.id }
    });

    // Associar todas as permissões existentes à role 'administrador'
    const permissionsRoleAdmin = await prisma.rolesOnPermissions.createMany({
        data: permissionsAdmin.map(permission => ({
            roleId: roleAdmin.id,
            permissionId: permission.id,
        })),
    });

    // Associar a role 'administrador' ao usuário root
    const rootRole = await prisma.usersOnRoles.create({
        data: { userId: root.id, roleId: roleAdmin.id }
    });

    // Buscar informações detalhadas sobre o usuário root após a criação
    const rootCreated = await prisma.user.findMany({
        where: { id: root.id },
        select: {
            id: true,
            name: true,
            email: true,
            user_roles: { select: { role: true } },
            user_permissions: { select: { permission: true } },
        },
    });

    // Imprimir mensagem de sucesso e informações sobre o usuário root
    console.log({ message: 'Seed executada com sucesso', root: rootCreated });
}

// Executar a função principal e desconectar do banco de dados após a conclusão
main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
