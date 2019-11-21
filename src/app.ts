import express from 'express';
import cors from 'cors';
import basicAuth from 'express-basic-auth';
import authorizer, { authRouter } from './authentication/auth_butler';

const app = express();
app.use(cors());
app.use(basicAuth({ authorizer: authorizer, challenge: true, authorizeAsync: true }));

app.get('/', (req, res) => {
    res.send('Hello world!');
});

app.use('/login', authRouter);

export default app;