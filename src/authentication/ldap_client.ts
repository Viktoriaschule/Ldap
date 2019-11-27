import fs from 'fs';
import path from 'path';
import ldap from 'ldapjs';
import config from '../utils/config';
import { create } from 'domain';

const checkLogin = async (username: string, password: string): Promise<boolean> => {
    const client = getClient()
    const success = await bind(username, password, client);
    if (success) {
        await getGrade(client);
    }
    return success;
}

const getClient = (): ldap.Client => ldap.createClient({
    url: config.url
});

const bind = (username: string, password: string, client: ldap.Client): Promise<boolean> => {
    return new Promise<boolean>((resolve, reject) => {
        client.bind(`CN=${username},CN=Users,DC=ad,DC=aachen-vsa,DC=logodidact,DC=net`, password, (err: any, res: any) => {
            if (err) {
                resolve(false);
                console.log('failed to login');
                return;
            }
            resolve(true);
            console.log('logged in');
            return;
        });
    });
}

export const getGrade = (client: ldap.Client): Promise<string> => {
    
    return new Promise<string>((resolve, reject) => {
        const searchOptions: ldap.SearchOptions = {
        };
        client.search('CN=Users,DC=ad,DC=aachen-vsa,DC=logodidact,DC=net', searchOptions, (err, res) => {
            console.log(err, res);
            resolve();
        });
    });
}

export default checkLogin;