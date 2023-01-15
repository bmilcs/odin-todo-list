import { initializeApp } from "firebase/app";
import { reassembleData, getAllProjectNames } from "./storage";
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

const DB_COLLECTION = "users";
let dbDocument = null;

//
// authentication
//

export async function signIn() {
  const provider = new GoogleAuthProvider();
  await signInWithPopup(getAuth(), provider);
}

// enable auth state observer
function initAuthentication() {
  onAuthStateChanged(getAuth(), authStateObserver);
}

// fired on authentication changes (sign in vs out)
async function authStateObserver(user) {
  if (user) {
    // user is logged in
    // set global firebase collection > document to user's email
    dbDocument = getUserEmail();
    await loadDataFromFirebase();
    DOM.reRenderPage();
  } else {
    // User is signed out!
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
export async function saveDataToFirebase(storageArray) {
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
export async function loadDataFromFirebase() {
  const docRef = doc(db, DB_COLLECTION, dbDocument);
  const docSnap = await getDoc(docRef);
  const fetchedData = docSnap.data();
  if (!fetchedData) return;
  const projectsArray = fetchedData.projects;
  reassembleData(projectsArray);
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
