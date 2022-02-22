import express from 'express';
// import userRouter from './routes/UserRoutes';
import UserController from './controllers/UserController';

const app = express();

app.use(express.json());

app.post('/users', UserController.cadastrarUsuario);
// app.use('/users', userRouter);

export default app;
