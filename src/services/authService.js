import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import NotFound from '../errors/notFound.js';
import Unauthorized from '../errors/unauthorized.js';

const prisma = new PrismaClient();
const { sign } = jsonwebtoken;

// Classe que define serviços de autenticação
class AuthService {
    static async login(dto) {
        try {
            // Busca o usuário no banco de dados com base no email fornecido
            const user = await prisma.user.findFirst({ 
                where: {
                    email: dto.email
                }
            });
    
            // Verifica se o usuário existe
            if (!user) {
                throw new NotFound('Usuário não encontrado.');
            }
    
            // Compara a senha fornecida com a senha armazenada no banco de dados
            const comparePassword = await bcrypt.compare(dto.password, user.password);
    
            // Verifica se a senha é válida
            if (!comparePassword) {
                throw new Unauthorized('Email ou senha inválidos.');
            }
    
            // Gera um token de acesso com informações do usuário
            const accessToken = sign({
                id: user.id,
                email: user.email
            }, process.env.SECRET_KEY,
            {
                expiresIn: '2h'
            });
    
            // Retorna o token de acesso
            return { accessToken };
        } catch (error) {
            // Trata exceções específicas de NotFound e Unauthorized, relançando outras como erro genérico
            if (error instanceof NotFound || error instanceof Unauthorized) {
                throw error;
            } else {
                throw new Error(error);
            }
        }
    }
}

export default AuthService;
