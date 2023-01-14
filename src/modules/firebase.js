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
  query,
  orderBy,
  limit,
  onSnapshot,
  setDoc,
  updateDoc,
  doc,
  serverTimestamp,
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

console.log("isUserSignedIn()", isUserSignedIn());

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

    console.log(userName);

    DOM.reRenderPage();

    // We save the Firebase Messaging Device token and enable notifications.
    // saveMessagingDeviceToken();
  } else {
    // User is signed out!
  }
}

// Returns the signed-in user's profile Pic URL.
export function getProfilePicUrl() {
  return getAuth().currentUser.photoURL;
}

// Returns the signed-in user's display name.
export function getUserName() {
  return getAuth().currentUser.displayName;
}

// Returns true if a user is signed-in.
export function isUserSignedIn() {
  return !!getAuth().currentUser;
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
