import makeElement from "./utils/make-element";
import containerize from "./utils/containerize";
import headerIcon from "../assets/header-icon-2.svg";
// firebase additions
import {
  signIn,
  isUserSignedIn,
  getUserName,
  getProfilePicUrl,
} from "./firebase";

export const createHeader = () => {
  let signInButtunOrUserName = null;

  if (isUserSignedIn()) {
    signInButtunOrUserName = containerize(
      "signed-in-container",
      makeElement("h2", "user-name", getUserName()),
      makeElement("img", "user-avatar", "", "", getProfilePicUrl())
    );
  } else {
    signInButtunOrUserName = makeElement("button", "sign-in-button", "Sign In");
    signInButtunOrUserName.addEventListener("click", signIn);
  }

  const staticElements = [
    containerize(
      "title-container",
      makeElement("img", "header-icon", "Todo List Icon", "", headerIcon),
      makeElement("h1", "title-h1", "TODO")
    ),
  ];

  return containerize(
    "header-container",
    staticElements,
    signInButtunOrUserName
  );
};
