import RoleService from '../services/roleService.js';


class RoleController {
    
    // Método para listar todas as roles
    static async listRoles(req, res, next) {
        try {
            const roles = await RoleService.listRoles();
            res.status(200).json(roles);
        } catch (error) {
            next(error);
        }
    }

    // Método para obter detalhes de uma role específica
    static async listRole(req, res, next) {      
        try {
            const { id } = req.params;
            const role = await RoleService.listRole(id);
            res.status(200).json(role);
        } catch (error) {
            next(error);
        }
    }

    // Método para criar uma nova role
    static async createRole(req, res, next) {
        const { name, description } = req.body;
        try {
            const role = await RoleService.createRole({ name, description });
            res.status(200).json({ message: `Role criada com sucesso: ${role}` });
        } catch (error) {
            next(error);
        }
    }

    // Método para atualizar uma role existente
    static async updateRole(req, res, next) {
        const { id } = req.params;
        const { nome, descricao } = req.body;
        try {
            const role = await RoleService.updateRole({ id, nome, descricao });
            res.status(200).json({ message: `Role atualizado com sucesso! ${role}` });
        } catch (error) {
            next(error);
        }
    }

    // Método para excluir uma role existente
    static async deleteRole(req, res, next) {
        const { id } = req.params;
        try {
            await RoleService.deleteRole(id);
            res.status(200).send({ message: 'Role deletada com sucesso!' });
        } catch (error) {
            next(error);
        }
    }
}

export default RoleController;
