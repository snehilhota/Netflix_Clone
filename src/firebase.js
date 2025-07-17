import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
    apiKey: "AIzaSyCPT6ORSiO3mAKKiYJuyjDl8oGq04mFx8A",
    authDomain: "netflix-clone-97afd.firebaseapp.com",
    projectId: "netflix-clone-97afd",
    storageBucket: "netflix-clone-97afd.firebasestorage.app",
    messagingSenderId: "65358638617",
    appId: "1:65358638617:web:a707507d84f45f97030488"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signUp = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email
        })
    } catch (err) {
        console.log(err)
        toast.error(err.code.split('/')[1].split('-').join(" "));
    }
}

const logIn = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
        console.log(err);
        toast.error(err.code.split('/')[1].split('-').join(" "));
    }
}

const logOut = () => {
    signOut(auth);
}

export { auth, db, logIn, signUp, logOut };