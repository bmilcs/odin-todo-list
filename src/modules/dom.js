import makeElement from "./utils/make-element";
import containerize from "./utils/containerize";
import header from "./header.js";
import main from "./main.js";
import footer from "./footer.js";
import { sampleList } from "./sample-data";
import checkedImg from "../assets/checkbox-filled.svg";
import uncheckedImg from "../assets/checkbox-empty.svg";

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

//
// .renderList(): renders a todo list
//

export const renderList = (listObj) => {
  const container = makeElement("div", "list-container");
  const title = makeElement("h2", "list-title", listObj.getName());
  const tasks = renderAllTasks(listObj.getTasks());
  container.appendChild(title);
  tasks.forEach((node) => container.appendChild(node));
  return container;
}

const renderAllTasks = (taskArray) => {
  return taskArray.map(task => renderTask(task));
}

const renderTask = (task) => {
  // const container = makeElement("div", "task-container");
  // const checkbox = makeElement("img", "task-checkbox unchecked", "", "", uncheckedImg);
  // const descriptionNode = makeElement("p", "task-description", task.description)

  return containerize("task-container", 
    makeElement("img", "task-status unchecked", "", "", uncheckedImg),
    makeElement("p", "task-description", task.getDescription()),
    makeElement("p", "task-date", task.getDate()));
}


document.querySelector("body").appendChild(renderList(sampleList()));
