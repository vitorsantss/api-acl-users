import express  from 'express';
import SegurancaController from '../controllers/segurancaController.js';
import roles from '../middlewares/roles.js';
const routes = express.Router();

// Define rotas para operações relacionadas à segurança
routes.post('/seguranca/acl', roles(['administrador']), SegurancaController.createAcl);
routes.post('/seguranca/permissions-roles', roles(['administrador']), SegurancaController.createPermissionsRoles);


export default routes;