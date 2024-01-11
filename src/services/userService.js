/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import NotFound from '../errors/notFound.js';
import AlreadyExist from '../errors/alreadyExist.js';

class UserService {

    // Método para listar todos os usuários com suas informações e roles associadas
    static async listUsers() {
        try {
            const users = await prisma.user.findMany({
                select: {
                    id: true,
                    name: true,
                    email: true,
                    user_roles: {
                        select: {
                            role: true,
                        },
                    }
                }
            });
            return users;
        } catch (error) {
            throw new Error(error);
        }
        
    }

    // Método para listar informações detalhadas de um usuário, incluindo roles e permissions associadas
    static async listUser(dto) {
        try {
            const user = await prisma.user.findFirst({
                where: {
                    id: dto.id
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    user_roles: {
                        select: {
                            role: {
                                select: {
                                    id: true,
                                    name: true,
                                    description: true,
                                    role_permissions: {
                                        select: {
                                            permission: true,
                                        }
                                    }
                                
                                }
                            }
                        },
                    },
                    user_permissions: {
                        select: {
                            permission: true,
                        },
                    },
                }
            });

            if (!user) {
                throw new NotFound('Usuário não encontrado.');
            }

            return user;
        } catch (error) {
            if (error instanceof NotFound) {
                throw error;
            } else {
                throw Error(error);
            }
        }
    }
    
    // Método para criar um novo usuário, realizando hash da senha e associando a role 'user'
    static async createUser(dto) {
        const user = await prisma.user.findUnique({
            where: {
                email: dto.email
            }
        });

        if (user) {
            throw new AlreadyExist('Usuário já existente.');
        }

        try {
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(dto.password, salt);
            const newUser = {
                name: dto.name,
                email: dto.email
            };
            const user = await prisma.user.create({data: {
                name: dto.name,
                email: dto.email,
                password: hashPassword
            }});

            const role = await prisma.role.findFirst({
                where: {
                    name: 'user'
                }
            });

            const userRole = await prisma.usersOnRoles.create({
                data: {
                    userId: user.id,
                    roleId: role.id
                }
            });

            return newUser;

        } catch (error) {
            if (error instanceof AlreadyExist) {
                throw error;
            } else {
                throw Error(error);
            }
        }
    }

    
    // Método para atualizar as informações de um usuário
    static async updateUser(dto) {
        const user = await this.listUser(dto.id);

        try { 
            user.name = dto.name;
            user.email = dto.email;
            await prisma.user.update({data: {user}});
        } catch (error) {
            throw new Error(error);
        }
    }

    // Método para deletar um usuário, impedindo a exclusão do usuário root
    static async deleteUser(id) {
        const user = await this.listUser(id);
        try {
            if (user.email == process.env.ROOT_EMAIL) {
                throw new Error('Esse usuário não pode ser deletado.');
            }
            await prisma.user.delete({where: {id: user.id}});
        } catch (error) {
            throw new Error(error);
        }
    }
}


export default UserService;