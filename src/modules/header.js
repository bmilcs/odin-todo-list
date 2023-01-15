import makeElement from "./utils/make-element";
import containerize from "./utils/containerize";
import headerIcon from "../assets/header-icon-2.svg";
import * as FB from "./firebase";

export const createHeader = () => {
  let userDetailsOrSignIn = null;

  if (FB.isUserSignedIn()) {
    const signOutButton = makeElement(
      "button",
      "sign-out-button",
      "(Sign Out)"
    );
    signOutButton.addEventListener("click", FB.userSignOut);

    userDetailsOrSignIn = containerize(
      "signed-in-container",
      signOutButton,
      makeElement("h2", "user-name", FB.getUserName()),
      makeElement("img", "user-avatar", "", "", FB.getProfilePicUrl())
    );
  } else {
    userDetailsOrSignIn = makeElement("button", "sign-in-button", "Sign In");
    userDetailsOrSignIn.addEventListener("click", FB.signIn);
  }

  const staticElements = [
    containerize(
      "title-container",
      makeElement("img", "header-icon", "Todo List Icon", "", headerIcon),
      makeElement("h1", "title-h1", "TODO")
    ),
  ];

  return containerize("header-container", staticElements, userDetailsOrSignIn);
};
