import express from 'express';
import userRouter from './routes/UserRoutes';
import productRouter from './routes/ProductRoutes';
import loginController from './controllers/loginController';

const app = express();

app.use(express.json());

app.use('/users', userRouter);
app.use('/products', productRouter);

app.post('/login', loginController.login);

export default app;
