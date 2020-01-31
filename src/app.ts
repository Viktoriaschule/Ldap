import express from 'express';
import cors from 'cors';
import basicAuth from 'express-basic-auth';
import authorizer, { authRouter } from './authentication/auth_butler';
import userRouter from './user/user_butler';

const app = express();
app.use(cors());
app.use(basicAuth({ 
    authorizer: authorizer, 
    challenge: true, 
    authorizeAsync: true, 
    unauthorizedResponse: {status: false}
}));

app.get('/', (req, res) => {
    res.send('Hello world!');
});

app.use('/login', authRouter);

app.use('/user', userRouter);

export default app;