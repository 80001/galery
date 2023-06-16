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
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, setDoc, updateDoc } from 'firebase/firestore'
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
const postsCollection = collection(db, "posts");

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
        const createAt = new Date()

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createAt,
                photoURL
            })
        } catch (error) {
            console.log('error creating the user', error.message)
        }
    }

    return userDocRef
}
//Check Log changes ??
export const onAuthStateChangedListner = (callback) => {
    onAuthStateChanged(auth, callback)
}

//addPost
export const addPosts = async (title, subtitle, image, text, author) => {
    if (title === '' || subtitle === '' || image === '' || text === '') {
        alert('Fill all lines!')
        return
    }
    try {
        const querySnapshot = await getDocs(postsCollection)
        const docCount = querySnapshot.size

        await addDoc(postsCollection, {
            id: docCount + 1,
            title,
            subtitle,
            image,
            text,
            author,
            date: new Date(),
        });

    } catch (e) {
        console.error('Error: ', e)
    }
}
//Get all posts
export const getPosts = async () => {
    const postsSnapshot = await getDocs(postsCollection);
    const posts = [];

    postsSnapshot.forEach((postDoc) => {
        const postData = postDoc.data();
        const postId = postDoc.id; // отримуємо id документа
        posts.push({ ...postData, id: postId });
    });

    return posts;
};

//Get post by ID
export const getPostById = async (id) => {
    try {
        const docRef = doc(db, 'posts', id)
        const docSnapshot = await getDoc(docRef)
        if (docSnapshot.exists()) {
            const documentData = docSnapshot.data()
            return documentData
        } else {
            console.log('wrong ID')
        }
    } catch (error) {
        console.error('Error', error)
    }
}
//Get posts by author
export const getPostsByEmail = async (email) => {
    const postsSnapshot = await getDocs(postsCollection)
    const posts = []
    postsSnapshot.forEach((doc) => {
        const postData = doc.data()
        const postId = doc.id
        if (postData.author === email) {
            posts.push({ ...postData, id: postId })
        }
    })
    return posts
}
//Edit post
export const changePost = async (id, newData) => {
    const postRef = doc(db, 'posts', id)
    try {
        await updateDoc(postRef, newData)
        console.log('Doc is update')
    } catch (error) {
        console.error('Error', error)
    }
}
//deletePost
export const deletePosts = async (postId) => {
    try {
        await deleteDoc(doc(db, "posts", postId));
        console.log(`Документ з id ${postId} успішно видалено`);
    } catch (error) {
        console.error("Помилка видалення документа:", error);
    }
};

