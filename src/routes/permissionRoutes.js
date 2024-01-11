import express from 'express';
import PermissionController from '../controllers/permissionController.js';
import roles from '../middlewares/roles.js';
import permissionsRoles from '../middlewares/permissionsRoles.js';
const routes = express.Router();

// Define rotas CRUD para operações relacionadas a permissões
routes.get('/permission', permissionsRoles(['listar']), PermissionController.listPermissions);
routes.get('/permission/:id', permissionsRoles(['listar']), PermissionController.listPermission);
routes.post('/permission', roles(['administrador']), PermissionController.createPermission);
routes.put('/permission/:id', roles(['administrador']), PermissionController.updatePermission);
routes.delete('/permission/:id', roles(['administrador']), PermissionController.deletePermission);

export default routes;