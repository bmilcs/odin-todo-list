import makeElement from "./utils/make-element";
import containerize from "./utils/containerize";

const createMain = () => {
  return containerize("main-container", 
   makeElement("div", "side-bar"),
    makeElement("div", "main-content"));
}

const main = createMain();
export default main;
