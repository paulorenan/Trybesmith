import express from 'express'; // teste
import userRouter from './routes/UserRoutes';
import productRouter from './routes/ProductRoutes';
import orderRouter from './routes/OrderRoutes';
import loginController from './controllers/loginController';

const app = express();

app.use(express.json());

app.use('/users', userRouter);
app.use('/products', productRouter);
app.use('/orders', orderRouter);

app.post('/login', loginController.login);

export default app;
