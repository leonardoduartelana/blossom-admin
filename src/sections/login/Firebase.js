// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getFirestore} from "firebase/firestore";
import {getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA8luRKCv8YBYdXxJuCF07ZqoiZ43rX7S8",
    authDomain: "blossombodyworks-7741a.firebaseapp.com",
    projectId: "blossombodyworks-7741a",
    storageBucket: "blossombodyworks-7741a.appspot.com",
    messagingSenderId: "870783655586",
    appId: "1:870783655586:web:4450889dc5ce7b119a41fb",
    measurementId: "G-V4725DVF9V"
};


// const firebaseConfig = {
//     apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//     authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//     databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
//     projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//     storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//     appId: process.env.REACT_APP_FIREBASE_APP_ID
// };

initializeApp(firebaseConfig);

const auth = getAuth();

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account "
});
const signInWithGooglePopup = () => signInWithPopup(auth, provider);
const db = getFirestore();

const signIn = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) =>
                // Signed in
                 userCredential.user
                // ...
            )
            .catch((error) => {
                const errorMessage = error.message;

                console.error(error);
                alert(errorMessage);
            });
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const logout = () => {
    auth.signOut();
};

const getUserToken = () => auth.currentUser ? auth.currentUser.getIdToken(false) : new Promise(((resolve, reject) => reject()))

export {
    db,
    auth,
    signIn,
    logout,
    getUserToken,
    signInWithGooglePopup
}