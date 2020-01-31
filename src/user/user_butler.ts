import express from 'express';
import getAuth from '../utils/auth';
import { checkUser } from '../authentication/ldap_client';

const userRouter = express.Router();

userRouter.get('/:username', async (req, res) => {
    const status = await checkUser(req.params.username, getAuth(req));
    res.json(status);
});

export default userRouter;