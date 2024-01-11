import SegurancaService from '../services/segurancaService.js';


class SegurancaController {

    // Método para criar uma Lista de Controle de Acesso (ACL)
    static async createAcl(req, res, next) {
        const { roles, permissions } = req.body;
        const { userId } = req;

        try {
            // Chamar o serviço de segurança para criar uma ACL
            const acl = await SegurancaService.createAcl({ roles, permissions, userId });
            res.status(201).json({ message: 'Acl adicionada com sucesso', usuario: acl });
        } catch (error) {
            // Encaminhar quaisquer erros para o middleware de tratamento de erros
            next(error);
        }
    }

    // Método para associar permissões a uma role específica
    static async createPermissionsRoles(req, res, next) {
        const { roleId, permissions } = req.body;

        try {
            // Chamar o serviço de segurança para associar permissões a uma role
            const permissionsRole = await SegurancaService.createPermissionsRoles({ roleId, permissions });
            res.status(201).json({ message: 'Permissões adicionadas com sucesso', permissionsRole });
        } catch (error) {
            // Encaminhar quaisquer erros para o middleware de tratamento de erros
            next(error);
        }
    }

}

export default SegurancaController;
