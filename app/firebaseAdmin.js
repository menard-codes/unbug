import admin from 'firebase-admin';
import serviceAccount from '../config/supachat-7b8d3-firebase-adminsdk-y56qh-ba1c0bb729.json';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

export const adminAuth = admin.auth();
export const adminFirestore = admin.firestore();
export const adminStorage = admin.storage();
export {admin}
