// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import 'firebase/auth';
import {
    GoogleAuthProvider,
    updateProfile,
    getAuth,
    signInWithPopup,
    signOut,
    signInWithRedirect,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged
} from "firebase/auth";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, setDoc } from 'firebase/firestore'
import { firebaseConfig } from "../configs/FirebaseConfig";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
})
export const auth = getAuth()
export const db = getFirestore(app)
const usersCollection = collection(db, 'users')

//Google Sign In
export const signInWithGooglePopUp = () => signInWithPopup(auth, provider)
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider)
//Mail Sign In
export const signInWithEmail = async (email, password) => {
    if (!email || !password) return
    return await signInWithEmailAndPassword(auth, email, password)
}
//Sign Out
export const googleSignOut = () => {
    try {
        signOut(auth)
            .then(() => console.log('SignOut'))
    }
    catch (error) { console.log(error) }
}
//SignIn with UID

//Mail Sign Up
export const signUpWithEmail = async (email, password, name) => {
    if (!email || !password || !name) return;

    try {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        const user = result.user;

        await updateProfile(user, {
            displayName: name,
            photoURL: `robohash.org/${email}`
        });

        return result;
    } catch (error) {
        throw error;
    }
};


//CreateUserInfo from Sign Up
export const createUserDoc = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);


    const userSnapshot = await getDoc(userDocRef)

    if (!userSnapshot.exists()) {
        let { email, displayName, photoURL } = userAuth
        console.log(userAuth)
        const createAt = new Date()

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createAt,
                photoURL
            })
            console.log(userSnapshot)
        } catch (error) {
            console.log('error creating the user', error.message)
        }
    }

    return userDocRef
}
//CreateUserInfo
/* export const userInfo = async (user) => {
    const userDocRef = doc(db, 'users', user.uid);

    try {
        const docSnapshot = await getDoc(userDocRef);
        if (!docSnapshot.exists()) {
            const userData = {
                name: user.displayName,
                email: user.email,
                img: user.photoURL,
                uid: user.uid
            };

            await setDoc(userDocRef, userData);
        }
    } catch (error) {
        throw error;
    }
}; */


export const addUser = async (email, name, password) => {
    try {
        const date = new Date()
        const docRef = await addDoc(usersCollection, {
            email,
            name,
            password,
            date,
            id: docRef.id,
        })
        console.log('Doc', docRef.id)
    } catch (e) {
        console.error('Error: ', e)
    }
}


export const onAuthStateChangedListner = (callback) => {
    onAuthStateChanged(auth, callback)
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

