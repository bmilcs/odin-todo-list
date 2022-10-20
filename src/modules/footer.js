import makeElement from "./utils/make-element";
import containerize from "./utils/containerize";
import "../scss/index.scss";
import githubSVG from "../assets/github.svg";

const createFooter = () => {
  const linkContainer = makeElement("a", "", "", "",
    "https://github.com/bmilcs/odin-todo-list");

  const linkElements = [
    makeElement("img", "github-svg", "GitHub Logo", "", githubSVG),
    makeElement("p", "footer-p", "bmilcs")
  ];

  linkElements.forEach(element => linkContainer.appendChild(element));

  return containerize("footer-container", linkContainer);
}

const footer = createFooter();
export { footer };
