// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import 'firebase/auth';
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signOut,
    signInWithRedirect
} from "firebase/auth";
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, setDoc } from 'firebase/firestore'
import { firebaseConfig } from "../configs/FirebaseConfig";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
})
export const db = getFirestore(app)
const usersCollection = collection(db, 'users')
//Google Sign In
export const signInWithGooglePopUp = () => signInWithPopup(auth, provider)
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider)


//Sign Out
export const googleSignOut = () => {
    try {
        signOut(auth)
            .then(() => console.log('SignOut'))
    }
    catch (error) { console.log(error) }
}
//CreateUserInfo
export const userInfo = async (user) => {
    const userDocRef = doc(db, 'users', user.uid)
    const userData = {
        name: user.displayName,
        email: user.email,
        img: user.photoURL,
        uid: user.uid
    }
    await setDoc(userDocRef, userData)
}

//addPost
/* export const addPosts = async (title, subtitle, img, text, id) => {
    if (title === '' || subtitle === '' || img === '' || text === '') return
    try {
        const docRef = await addDoc(collection(db, 'posts', 'myhaEGaAMS9fY3q4nT'), {
            title,
            subtitle,
            img,
            text,
            id
        })
        console.log('Doc', docRef.id)
    } catch (e) {
        console.error('Error: ', e)
    }
} */
export const getPosts = async () => {
    const postsCollection = collection(db, "posts");
    const postsSnapshot = await getDocs(postsCollection);
    const posts = [];

    postsSnapshot.forEach((postDoc) => {
        const postData = postDoc.data();
        const postId = postDoc.id; // отримуємо id документа
        posts.push({ ...postData, id: postId });
    });

    return posts;
};
//deletePost
export const deletePosts = async (postId) => {
    try {
        await deleteDoc(doc(db, "posts", postId));
        console.log(`Документ з id ${postId} успішно видалено`);
    } catch (error) {
        console.error("Помилка видалення документа:", error);
    }
};

