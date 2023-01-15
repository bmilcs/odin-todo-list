import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  deleteDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  setDoc,
  updateDoc,
  doc,
  serverTimestamp,
  getDocs,
  getDoc,
} from "firebase/firestore";
import * as DOM from "./dom";

//
// firebase (baas)
//

const config = {
  apiKey: "AIzaSyAu23HZunl-09YtbNr75EaIF4CCftJVno8",
  authDomain: "odin-todo-list-ce596.firebaseapp.com",
  projectId: "odin-todo-list-ce596",
  storageBucket: "odin-todo-list-ce596.appspot.com",
  messagingSenderId: "86009918486",
  appId: "1:86009918486:web:6dc6734715c72ac9f83137",
};

const app = initializeApp(config);

//
// firebase utility functions
//

export async function signIn() {
  const provider = new GoogleAuthProvider();
  await signInWithPopup(getAuth(), provider);
}

function initAuthentication() {
  onAuthStateChanged(getAuth(), authStateObserver);
}

function authStateObserver(user) {
  if (user) {
    console.log("observer: user logged in");

    // User is signed in!
    // Get the signed-in user's profile pic and name.
    var profilePicUrl = getProfilePicUrl();
    var userName = getUserName();

    DOM.reRenderPage();

    // We save the Firebase Messaging Device token and enable notifications.
    // saveMessagingDeviceToken();
  } else {
    // User is signed out!
  }
}

// returns the signed-in user's profile Pic URL.
export function getProfilePicUrl() {
  return getAuth().currentUser.photoURL;
}

// returns the signed-in user's display name.
export function getUserName() {
  return getAuth().currentUser.displayName;
}

// returns true if a user is signed-in.
export function isUserSignedIn() {
  return !!getAuth().currentUser;
}

// save user data to database
export async function saveDataToFirebase(storageArray) {
  const db = getFirestore(app);
  const user = getUserName();

  const unusedDocuments = await getUnusedDocuments(db, user, storageArray);

  if (unusedDocuments) await cleanUpOldDocuments(db, user, unusedDocuments);

  // delete a collection:

  try {
    storageArray.forEach(async (projectObj) => {
      const project = JSON.parse(JSON.stringify(projectObj));

      await setDoc(doc(db, `${user}/${project.name}`), {
        project,
      });
    });
  } catch (error) {
    console.error("Error writing new message to Firebase Database", error);
  }
}

async function getUnusedDocuments(db, user, storageArray) {
  const allCollections = query(collection(db, user));
  const querySnapshot = await getDocs(allCollections);
  let unusedDocuments = [];

  // loop through each document
  querySnapshot.forEach((doc) => {
    // check if document exists in project's storageArray
    const activeProject = storageArray.some((project) => {
      if (project.name === doc.id) {
        return true;
      }
    });

    if (!activeProject) unusedDocuments.push(doc.id);
  });

  return unusedDocuments;
}

async function cleanUpOldDocuments(db, user, unusedDocuments) {
  // delete all unused documents from firebase
  unusedDocuments.forEach(async (docID) => {
    await deleteDoc(doc(db, user, docID));
  });
}

// // Get a list of cities from your database
// async function getStorageFromFirebase(db) {
//   const data = collection(db, "todos");
//   console.log(data);
//   // const citiesCol = collection(db, "cities");
//   // const citySnapshot = await getDocs(citiesCol);
//   // const cityList = citySnapshot.docs.map((doc) => doc.data());
//   // return cityList;
// }
// getStorageFromFirebase(db);

initAuthentication();
