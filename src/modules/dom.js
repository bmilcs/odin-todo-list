import makeElement from "./utils/make-element";
import containerize from "./utils/containerize";
import header from "./header.js";
import footer from "./footer.js";
import main from "./main.js";
import sampleList from "./sample-data";
import checkedImg from "../assets/checkbox-filled.svg";
import uncheckedImg from "../assets/checkbox-empty.svg";

//
// .renderPage(): render body of the page
//

export const renderPage = () => {
  renderMainLayout();
  renderSidebar();
  renderSampleData();
};

const renderMainLayout = () => {
  const body = document.querySelector("body");
  const elements = [header, main.parent, footer];
  elements.forEach((element) => body.appendChild(element));
};

const renderSidebar = () => {
  const title = makeElement("h2", "sidebar-title", "Sidebar Title");
  const p = makeElement("p", "sidebar-p", "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.");
  main.sidebar.appendChild(title);
  main.sidebar.appendChild(p);
}

//
// .renderList(): renders a todo list
//

export const prepListElement = (listObj) => {
  const container = makeElement("div", "list-container");
  const title = makeElement("h2", "list-title", listObj.getName());
  const tasks = prepAllTaskElements(listObj.getTasks());
  container.appendChild(title);
  tasks.forEach((element) => container.appendChild(element));
  return container;
};

const prepAllTaskElements = (taskArray) => {
  return taskArray.map((task) => prepTaskElement(task));
};

const prepTaskElement = (task) => {
  // const container = makeElement("div", "task-container");
  // const checkbox = makeElement("img", "task-checkbox unchecked", "", "", uncheckedImg);
  // const descriptionElement = makeElement("p", "task-description", task.description)

  return containerize(
    "task-container",
    makeElement("img", "task-status unchecked", "", "", uncheckedImg),
    makeElement("p", "task-description", task.getDescription()),
    makeElement("p", "task-date", task.getDate())
  );
};

//
// .renderSampleData
//

const renderSampleData = () => {
  const list = prepListElement(sampleList);
  main.content.appendChild(list);
};
