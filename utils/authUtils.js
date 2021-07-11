import nookies from 'nookies'
import { adminAuth } from '../app/firebaseAdmin'


export function getRequesterToken(ctx) {
    const cookies = nookies.get(ctx)
    const {token} = cookies
    return token
}

export async function verifyToken(token) {
    const decoded = await adminAuth.verifyIdToken(token)
    const requesterId = decoded.uid
    return requesterId
}
