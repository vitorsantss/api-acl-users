import AuthService from '../services/authService.js';

class AuthController {
    // Método para processar a solicitação de login
    static async login(req, res, next) {
        const { email, password } = req.body;
        
        try {
            // Chamar o serviço de autenticação para realizar o login
            const login = await AuthService.login({ email, password });
            res.status(200).send(login);
        } catch (error) {
            // Encaminhar quaisquer erros para o middleware de tratamento de erros
            next(error);
        }
    }
}

export default AuthController;
