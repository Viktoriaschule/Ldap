import fs from 'fs';
import path from 'path';
import ldap from 'ldapjs';
import config from '../utils/config';
import { create } from 'domain';

const checkLogin = async (username: string, password: string): Promise<boolean> => {
    const client = getClient()
    const success = await bind(username, password, client);
    return success;
}

export const checkUser = async (username: string, auth: any): Promise<boolean | undefined> => {
    const client = getClient()
    const success = await bind(auth.username, auth.password, client);
    if (success) {
        const groups = await getGroups(client, username);
        return groups.length > 0;
    }
    return undefined;
}

export const getUser = async (auth: any) => {
    const client = getClient()
    const success = await bind(auth.username, auth.password, client);
    if (success) {
        const groups = await getGroups(client, auth.username);
        const grade = groups.filter((group) => group.length === 2)[0];
        const isTeacher = groups.includes('lehrer');
        return { grade, isTeacher };
    }
    return undefined;
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
            // console.log('logged in');
            return;
        });
    });
}

const getGroups = (client: ldap.Client, username: string): Promise<string[]> => {

    return new Promise<string[]>((resolve, reject) => {
        const searchOptions: ldap.SearchOptions = {
            scope: 'sub',
            attributes: ['cn'],
            filter: `(member=CN=${username},CN=Users,DC=ad,DC=aachen-vsa,DC=logodidact,DC=net)`
        };
        const groups: any = [];
        client.search('CN=Users,DC=ad,DC=aachen-vsa,DC=logodidact,DC=net', searchOptions, (err, res) => {
            res.on('searchEntry', function (entry) {
                groups.push(entry.object.cn);
            });
            res.on('searchReference', function (referral) {
                console.log('referral: ' + referral.uris.join());
            });
            res.on('error', function (err) {
            });
            res.on('end', function (result: any) {
                if (result.status !== 0) reject();
                else resolve(groups);
            });
        });
    });
}

export default checkLogin;