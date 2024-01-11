/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import UserService from '../services/userService.js';

class UserController {

    // Listar todos os usuários
    static async listUsers(req, res, next) {
        try {
            const users = await UserService.listUsers();     
            res.status(200).json({ users: users });
        } catch (error) {
            next(error);
        }
    }

    // Obter detalhes de um usuário específico
    static async listUser(req, res, next) {
        try {
            const { id } = req.params;
            const user = await UserService.listUser({ id });  
            res.status(200).json({ user: user });
        } catch (error) {
            next(error);
        }
    }

    // Criar um novo usuário
    static async createUser(req, res, next) {
        const { name, email, password } = req.body;
        try {
            const user = await UserService.createUser({ name, email, password });
            res.status(201).json({ message: 'Usuário criado com sucesso!', user: user });
        } catch (error) {
            next(error);
        }
    }

    // Atualizar um usuário existente
    static async updateUser(req, res, next) {
        const id = req.params;
        const { name, email } = req.body;
        
        try {
            const user = await UserService.updateUser({ id, name, email });
            res.status(200).json({ message: 'Usuário atualizado com sucesso!', user: user });
        } catch (error) {
            next(error);
        }
    }

    // Excluir um usuário existente
    static async deleteUser(req, res, next) {
        const id = req.params;

        try {
            await UserService.deleteUser(id);
            res.status(200).json({ message: 'Usuário deletado com sucesso!' });
        } catch (error) {
            next(error);
        }
    }
}

export default UserController;
