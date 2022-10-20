import makeElement from "./utils/make-element";
import containerize from "./utils/containerize";
import headerIcon from "../assets/header-icon-2.svg";

const createHeader = () => {
  return containerize("header-container",
    makeElement("h1", "title-h1", "TODO"),
    makeElement("img", "header-icon", "Todo List Icon", "", headerIcon),
  );
}

const header = createHeader();
export { header };
