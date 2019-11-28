import checkLogin, { getUser } from './ldap_client';
import express from 'express';
import getAuth from '../utils/auth';

export const authRouter = express.Router();

authRouter.get('/', async (req, res) => {
    const user = await getUser(getAuth(req));
    if (user) return res.json({
        status: true,
        grade: user.grade,
        isTeacher: user.isTeacher
    });
    return res.json({status: true});
});

async function authorizer(username: string, password: string, authorize: any): Promise<void>{
    authorize(null, await checkLogin(username, password));
}

export default authorizer;