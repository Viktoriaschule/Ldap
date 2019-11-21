import fs from 'fs';
import path from 'path';
import ldap from 'ldapjs';
import config from '../utils/config';

const checkLogin = (username: string, password: string): Promise<boolean> => {
    return new Promise<boolean>((resolve, reject) => {
        const client = ldap.createClient({
            url: config.url
        });
        client.bind(`CN=${username},CN=Users,DC=ad,DC=aachen-vsa,DC=logodidact,DC=net,`, password, (err: any, res: any) => {
            if (err) return resolve(false);
            return resolve(true);
        });
    });
}

export const getGrade = (username: string, password: string): string => {
    const users = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'ldap.json')).toString());
    return (users[username] || {grade: ''}).grade;
}

export default checkLogin;