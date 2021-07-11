import nookies from 'nookies'
import { adminAuth, adminFirestore } from '../app/firebaseAdmin'


// TODO: Handle breaking of await declarations
// TODO: Improve the collection ref, by considering additional queries
export async function getCollectionSnapshot(ctx, collectionPath) {
    const {requesterId, redirect} = await onRequestAuthorization(ctx);

    if (redirect) {
        return {redirect}
    } else if (requesterId) {
        // query firestore and handle authorization
        const collectionSnapshot = await adminFirestore
                                        .collection(collectionPath)
                                        .where('ownerId', '==', requesterId)
                                        .get();
        return {collectionSnapshot}
    }
    return
}

export async function getDocData(ctx, docPath) {
    const {requesterId, redirect} = await onRequestAuthorization(ctx);

    if (redirect) {
        return {redirect}
    } else if (requesterId) {
        const docSnapshot = await adminFirestore.doc(docPath).get()
        if (docSnapshot.exists) {
            // convert timestamp to be JSON serializable
            const docData = docSnapshot.data()
            docData["time added"] = Date(docData["time added"])

            return (docData && docData.ownerId === requesterId)
                    ? {props: {data: docData}}
                    : {redirect: {destination: '/forbidden', permanent: false}}
        } else {
            return {notFound: true}
        }
    }
    return
}

async function onRequestAuthorization(ctx) {
    const cookies = nookies.get(ctx)
    const {token} = cookies
    try {
        const requester = await adminAuth.verifyIdToken(token);
        return {requesterId: requester.uid}
    } catch (error) {
        return {redirect: {destination: '/login', permanent: false}}
    }
}
