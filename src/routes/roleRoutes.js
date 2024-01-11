import express from 'express';
import roleController from '../controllers/roleController.js';
import roles from '../middlewares/roles.js';
import permissionsRoles from '../middlewares/permissionsRoles.js';
const routes = express.Router();

// Define rotas CRUD para operações relacionadas as Roles
routes.get('/roles', permissionsRoles(['listar']), roleController.listRoles);
routes.get('/roles/:id', permissionsRoles(['listar']), roleController.listRole);
routes.post('/roles', roles(['administrador']), roleController.createRole);
routes.put('/roles/:id', roles(['administrador']), roleController.updateRole);
routes.delete('/roles/:id', roles(['administrador']), roleController.deleteRole);

export default routes;