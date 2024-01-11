import express from 'express';
const routes = express.Router();
import AuthController from '../controllers/authController.js';

// Define a rota de Login
routes.post('/auth/login', AuthController.login);

export default routes;
