import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { getFirestore, setDoc, doc, getDoc } from "firebase/firestore";
import * as DOM from "./dom";
import * as Storage from "./storage";

//
// firebase setup (baas)
//

const CONFIG = {
  apiKey: "AIzaSyAu23HZunl-09YtbNr75EaIF4CCftJVno8",
  authDomain: "odin-todo-list-ce596.firebaseapp.com",
  projectId: "odin-todo-list-ce596",
  storageBucket: "odin-todo-list-ce596.appspot.com",
  messagingSenderId: "86009918486",
  appId: "1:86009918486:web:6dc6734715c72ac9f83137",
};

const app = initializeApp(CONFIG);
const db = getFirestore(app);

// assigned on user auth change (user email)
let dbDocument = null;
const DB_COLLECTION = "users";

//
// authentication
//

export async function signIn() {
  const provider = new GoogleAuthProvider();
  await signInWithPopup(getAuth(), provider);
}

export function userSignOut() {
  signOut(getAuth())
    .then(() => {
      Storage.clearStorageArray();
      Storage.loadLocally();
    })
    .then(() => DOM.reRenderPage());
}

// enable auth state observer
export function initAuthentication() {
  onAuthStateChanged(getAuth(), authStateObserver);
}

// fired on authentication changes (sign in vs out)
async function authStateObserver(user) {
  if (user) {
    // user is logged in
    dbDocument = getUserEmail();
    Storage.clearStorageArray();
    await loadData();
    DOM.reRenderPage();
  } else {
    // user is signed out
    DOM.reRenderPage();
  }
}

//
// user info
//

// returns the signed-in user's profile Pic URL.
export function getProfilePicUrl() {
  return getAuth().currentUser.photoURL;
}

// returns the signed-in user's display name.
export function getUserName() {
  return getAuth().currentUser.displayName;
}

// returns the signed-in user's gmail account
export function getUserEmail() {
  return getAuth().currentUser.email;
}

// returns true if a user is signed-in.
export function isUserSignedIn() {
  return !!getAuth().currentUser;
}

//
// database
//

// save user data to database
// triggered on changes to the local Storage Array in /storage.js module.
export async function saveData(storageArray) {
  try {
    const projects = JSON.parse(JSON.stringify(storageArray));
    await setDoc(doc(db, DB_COLLECTION, dbDocument), {
      projects,
    });
  } catch (error) {
    console.error("Error writing new message to Firebase Database", error);
  }
}

// load data from database
export async function loadData() {
  const docRef = doc(db, DB_COLLECTION, dbDocument);
  const docSnap = await getDoc(docRef);
  const fetchedData = docSnap.data();
  if (!fetchedData) return;
  const rawProjectData = fetchedData.projects;
  Storage.reassembleData(rawProjectData);
}

initAuthentication();
