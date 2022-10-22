import "../scss/index.scss";
import makeElement from "./utils/make-element";
import containerize from "./utils/containerize";
import header from "./header.js";
import footer from "./footer.js";
import main from "./main.js";
import * as Storage from "./todos";
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
  Storage.addSampleData();
  const sampleData = Storage.findList("Default List");
  const sampleTodo = prepTodoListElements(sampleData);
  main.content.appendChild(sampleTodo);
};

const prepTodoListElements = (listObj) => {
  const container = makeElement("div", "list-container");
  const title = makeElement("h2", "list-title", listObj.getName());
  const addTask = prepAddNewTaskSection();
  const tasks = prepAllTaskElements(listObj.getTasks());
  container.appendChild(title);
  container.appendChild(addTask);
  tasks.forEach((element) => container.appendChild(element));
  return container;
};

const prepAddNewTaskSection = () => {
  const container = makeElement("div", "add-task-section");
  const label = makeElement("label", "add-task-label", "Add task");
  const textbox = makeElement(
    "input",
    "add-task-textbox",
    "",
    "add-task-textbox"
  );
  const button = makeElement("button", "add-task-btn");
  const image = makeElement("img", "add-task-img", "Add Task", "", plusSignSVG);
  button.appendChild(image);
  button.addEventListener("click", addTaskEvent);
  return containerize(
    container,
    label,
    containerize("add-task-textbox-container", textbox, button)
  );
};

const addTaskEvent = (e) => {
  // find current list's corresponding object
  const listTitle = e.target.closest(".list-container").firstChild.textContent;

  alert(findList(listTitle));
  // add textbox value to object
  // append to the page
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
  // determine what task was clicked on
  // determine the list object it belongs to
  // find the index of the task within the task list's array
  // toggle completion status
  // update dom w/ status (change image)
};
