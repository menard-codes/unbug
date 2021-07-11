import { firebase } from '../app/firebaseApp';

export const uiConfig = {
    signInFlow: "popup",
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ],
    signInSuccessUrl: "/",
    tosUrl: "/terms-of-service",
    privacyPolicyUrl: "/privacy-policy"
}