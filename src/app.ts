import express from 'express';
import userRouter from './routes/UserRoutes';
import loginController from './controllers/loginController';

const app = express();

app.use(express.json());

app.use('/users', userRouter);

app.post('/login', loginController.login);

export default app;
