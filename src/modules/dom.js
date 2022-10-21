import makeElement from "./utils/make-element";
import containerize from "./utils/containerize";
import Task from "./task";
import TaskList from "./task-list";
import header from "./header.js";
import main from "./main.js";
import footer from "./footer.js";

//
// .renderPage(): render body of the page
//

export const renderPage = () => {
  const body = document.querySelector("body");
  const elements = [
    header,
    main,
    footer
  ];
  elements.forEach(element => body.appendChild(element));
}


