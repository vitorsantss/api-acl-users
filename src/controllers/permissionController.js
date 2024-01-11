import PermissionService from '../services/permissionService.js';


class PermissionController {
    
    // Método para listar todas as permissões
    static async listPermissions(req, res, next) {
        try {
            const permissions = await PermissionService.listPermissions();
            res.status(200).json({ permissions: permissions });
        } catch (error) {
            next(error);
        }
    }

    // Método para obter detalhes de uma permissão específica
    static async listPermission(req, res, next) {      
        try {
            const { id } = req.params;
            const permission = await PermissionService.listPermission(id);
            res.status(200).json({ permissions: permission });
        } catch (error) {
            next(error);
        }
    }

    // Método para criar uma nova permissão
    static async createPermission(req, res, next) {
        const { name, description } = req.body;
        try {
            const permission = await PermissionService.createPermission({ name, description });
            res.status(200).json({ permission: permission });
        } catch (error) {
            next(error);
        }
    }

    // Método para atualizar uma permissão existente
    static async updatePermission(req, res, next) {
        const { id } = req.params;
        const { nome, descricao } = req.body;
        try {
            const permission = await PermissionService.updatePermission({ id, nome, descricao });
            res.status(200).json({ message: `Permissão atualizada com sucesso! ${permission}` });
        } catch (error) {
            next(error);
        }
    }

    // Método para excluir uma permissão existente
    static async deletePermission(req, res, next) {
        const { id } = req.params;
        try {
            await PermissionService.deletePermission(id);
            res.status(200).send({ message: 'Permissão deletada com sucesso!' });
        } catch (error) {
            next(error);
        }
    }
}


export default PermissionController;
