import { adminAuth } from '../../app/firebaseAdmin';

export default async function hitApi(req, res) {
    // NOTE: THE FACT THAT THIS IS PARSED BY THE CLIENT SHOWS THAT IT WORKS!!!
    const {cookies} = req;
    const decoded = await adminAuth.verifyIdToken(cookies.token);
    res.json(decoded);
    res.end();
}
