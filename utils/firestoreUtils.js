import { adminFirestore } from '../app/firebaseAdmin'


export async function getDocSnapshot(collection, docId) {
    return await adminFirestore.doc(`${collection}/${docId}`).get()
}
