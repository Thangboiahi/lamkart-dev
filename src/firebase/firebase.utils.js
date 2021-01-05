import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyAikzClfnxCi2TpVu4RY2ZGB3soYv1xHhI",
  authDomain: "e-commerce-dd.firebaseapp.com",
  databaseURL: "https://e-commerce-dd.firebaseio.com",
  projectId: "e-commerce-dd",
  storageBucket: "e-commerce-dd.appspot.com",
  messagingSenderId: "587424463826",
  appId: "1:587424463826:web:bb10994d0b5faf437ee60b",
  measurementId: "G-BWZTK067ER"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log("Error creating user", error.message);
    }
  }

  return userRef;
}

export const addCollectionAndDoucuments = async (collectionKey, objectsToAdd) => {
  const collectionRef  = firestore.collection(collectionKey);

  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
}

export const convertCollectionsSnapshotToMap = collections => {
  const transformedCollection = collections.docs.map(doc => {
    const {title, items} = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    }
  });

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;

    return accumulator
  }, {});
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account"
});

export const SignInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;