import checkLogin from './ldap_client';
import express from 'express';
import getAuth from '../utils/auth';

export const authRouter = express.Router();

authRouter.get('/', async (req, res) => {
    return res.json({status: true});
});

async function authorizer(username: string, password: string, authorize: any): Promise<void>{
    authorize(null, await checkLogin(username, password));
}

export default authorizer;