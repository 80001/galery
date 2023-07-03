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
import { addDoc, arrayUnion, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, onSnapshot, setDoc, updateDoc } from 'firebase/firestore'
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
const postsDeletedCollection = collection(db, "postsDeleted");

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
}
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
export const getDeletedPostsByEmail = async (email) => {
    const postsSnapshot = await getDocs(postsDeletedCollection)
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
        console.log(newData)
    } catch (error) {
        console.error('Error', error)
    }
}
//deletePost
export const deletePosts = async (postId) => {
    try {
        const docRef = doc(db, 'posts', postId);
        const docSnapshot = await getDoc(docRef);
        if (docSnapshot.exists()) {
            const docData = docSnapshot.data();
            const newCollRef = doc(db, 'postsDeleted', postId);
            try {
                await deleteDoc(docRef);
                await setDoc(newCollRef, docData);
                console.log(`Документ з id ${postId} успішно перенесено в колекцію "postsDeleted" та видалено з колекції "posts"`);
            } catch (error) {
                console.log('Помилка перенесення документа:', error.message);
            }
        }
    } catch (error) {
        console.error("Помилка видалення документа:", error);
    }
};
//restore Post
export const restorePosts = async (postId) => {
    try {
        const docRef = doc(db, 'postsDeleted', postId)
        const docSnapshot = await getDoc(docRef)
        if (docSnapshot.exists()) {
            const docData = docSnapshot.data()
            const newCollRef = doc(db, 'posts', postId);
            try {
                await deleteDoc(docRef);
                await setDoc(newCollRef, docData);
                console.log(`Документ з id ${postId} успішно відновелений`);
            } catch (error) {
                console.log('Помилка перенесення документа:', error.message);
            }
        }
    } catch (error) {
        console.error("Помилка відновлення документа:", error);
    }
};
//create comment on post
export const createPostComment = async (postId, comment) => {
    const postRef = doc(db, 'posts', postId)
    try {
        await updateDoc(postRef, {
            comments: arrayUnion(comment)
        })
    } catch (error) {
        console.log('Error', error)
    }
}

export const onlineComments = (id) => {
    return new Promise((resolve, reject) => {
        onSnapshot(doc(db, 'posts', id), (snapshot) => {
            const data = snapshot.data();
            console.log(data);
            resolve(data);
        }, (error) => {
            console.log(error);
            reject(error);
        });
    });
};

//get comments
export const getCommentByEmail = async (email) => {
    const postsSnapshot = await getDocs(postsCollection)
    const comments = []
    const posts = []
    postsSnapshot.forEach((doc) => {
        const postData = doc.data()
        const postId = doc.id
        if (postData.comments) {
            postData.comments.forEach((comment) => {
                if (comment.author === email) {
                    let text = comment.text
                    comments.push(text)
                    posts.push({ ...postData, id: postId })
                }
            })
        }
    })
    return { comments, posts }
}
//delete comments
