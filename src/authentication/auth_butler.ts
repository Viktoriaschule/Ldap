import checkLogin from './ldap_client';
import express from 'express';

export const authRouter = express.Router();

authRouter.get('/', (req, res) => {
    const status = checkLogin(req.params.username, req.params.password);
    return res.json({status: status});
});

function authorizer(username: string, password: string): Promise<boolean>{
    return checkLogin(username, password);
}

export default authorizer;