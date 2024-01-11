import jsonwebtoken from 'jsonwebtoken';
import Unauthorized from '../errors/unauthorized.js';

const { verify, decode } = jsonwebtoken;

// Middleware para autenticação via JSON Web Tokens (JWT)
export default async function (req, res, next) {
    const token = req.headers.authorization;

    // Verifica se o token está ausente e retorna erro de não autorizado se for o caso
    if (!token) {
        return new Unauthorized('Access token não informado').sendReply(res);
    }

    // Extrai o token do cabeçalho
    const [, accessToken] = token.split(' ');

    try {
        // Verifica a validade do token usando a chave secreta
        verify(accessToken, process.env.SECRET_KEY);

        // Decodifica as informações do token (ID e email do usuário) e as adiciona ao objeto req
        const { id, email } = await decode(accessToken);
        req.userId = id;
        req.userEmail = email;

        // Continua para o próximo middleware ou rota
        return next();

    } catch (error) {
        // Retorna um erro de não autorizado se houver algum problema na verificação ou decodificação do token
        new Unauthorized('Usuário não autorizado.').sendReply(res);
    }
}
