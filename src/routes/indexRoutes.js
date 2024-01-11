import express from 'express';

import user from './userRoutes.js';
import auth from './authRoutes.js';
import role from './roleRoutes.js';
import permission from './permissionRoutes.js';
import seguranca from './segurancaRoutes.js';

// Função que define as rotas da aplicação
const routes = (app) => {
    app.route('/').get((req, res) => res.status(200).send('API ON'));

    // Utiliza o middleware 'express.json()' e adiciona rotas dos módulos especificados
    app.use(
        express.json(), 
        auth, 
        user,
        role, 
        permission, 
        seguranca 
    );
}; 

export default routes;
