import makeElement from "./utils/make-element";
import containerize from "./utils/containerize";
import header from "./header.js";
import footer from "./footer.js";
import main from "./main.js";
import sampleList from "./sample-data";
import plusSignSVG from "../assets/add.svg";
import checkedImg from "../assets/checked.svg";
import uncheckedImg from "../assets/unchecked.svg";

export const renderPage = () => {
  renderLayout();
  renderSidebar();
  renderMainContent();
};

const renderLayout = () => {
  const body = document.querySelector("body");
  const elements = [header, main.parent, footer];
  elements.forEach((element) => body.appendChild(element));
};

const renderSidebar = () => {
  const title = makeElement("h2", "sidebar-title", "Sidebar Title");
  const p = makeElement(
    "p",
    "sidebar-p",
    "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat."
  );
  main.sidebar.appendChild(title);
  main.sidebar.appendChild(p);
};

const renderMainContent = () => {
  const defaultList = prepListElement(sampleList);
  main.content.appendChild(defaultList);
};

const prepListElement = (listObj) => {
  const container = makeElement("div", "list-container");
  const title = makeElement("h2", "list-title", listObj.getName());
  const addTaskContainer = prepAddTaskElements();
  const tasks = prepAllTaskElements(listObj.getTasks());
  container.appendChild(title);
  container.appendChild(addTaskContainer);
  tasks.forEach((element) => container.appendChild(element));
  return container;
};

const prepAddTaskElements = () => {
  const container = makeElement("div", "add-task-container");
  const newTaskTextbox = makeElement(
    "input",
    "new-task-textbox",
    "",
    "new-task-textbox"
  );
  const addTaskBtn = makeElement("button", "add-task-btn");
  const addTaskImg = makeElement(
    "img",
    "add-task-img",
    "Add Task",
    "",
    plusSignSVG
  );
  addTaskBtn.appendChild(addTaskImg);
  return containerize(container, newTaskTextbox, addTaskBtn);
};

const prepAllTaskElements = (taskArray) => {
  return taskArray.map((task) => prepTaskElement(task));
};

const prepTaskElement = (task) => {
  const container = makeElement("div", "task-container");
  const checkbox = makeElement(
    "img",
    "task-status unchecked",
    "",
    "",
    uncheckedImg
  );
  const description = makeElement(
    "p",
    "task-description",
    task.getDescription()
  );
  const dueDate = makeElement("p", "task-date", task.getDate());
  checkbox.addEventListener("click", toggleTaskStatus);
  return containerize(container, checkbox, description, dueDate);
};

const toggleTaskStatus = (e) => {
  const element = e.target;
  alert(`toggle status clicked on: ${element.classList}`);
};
