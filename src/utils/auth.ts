export const getAuth = (req: any): {username: string, password: string} => {
    const base64Credentials =  req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');
    return {username: username, password: password}
}

export default getAuth;