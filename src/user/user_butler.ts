import express from 'express';
import getAuth from '../utils/auth';
import { checkUser, getFullName } from '../authentication/ldap_client';

const userRouter = express.Router();

userRouter.get('/:username', async (req, res) => {
    const status = await checkUser(req.params.username, getAuth(req));
    res.json(status);
});

userRouter.get('/name/:username', async (req, res) => {
    const name = await getFullName(req.params.username, getAuth(req));
    res.json({name: name});
});

export default userRouter;