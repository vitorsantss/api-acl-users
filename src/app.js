import express from 'express';
import routes from './routes/indexRoutes.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();
routes(app);

// eslint-disable-next-line no-unused-vars
app.use(errorHandler);

export default app;