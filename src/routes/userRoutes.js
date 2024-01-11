import express from 'express';
import UserController from '../controllers/userController.js';
import authenticated from '../middlewares/authenticated.js';
import roles from '../middlewares/roles.js';
import permissionsRoles from '../middlewares/permissionsRoles.js';

const routes = express.Router();

// Aplica o middleware de autenticação em todas as rotas a seguir
routes.use(authenticated);

// Define rotas CRUD para operações relacionadas a usuários
routes.post('/users', roles(['administrador']), UserController.createUser);
routes.get('/users', permissionsRoles(['listar']), UserController.listUsers);
routes.get('/users/:id', permissionsRoles(['listar']), UserController.listUser);
routes.put('/users/:id', roles(['administrador']), UserController.updateUser);
routes.delete('/users/:id', roles(['administrador']), UserController.deleteUser);

export default routes;