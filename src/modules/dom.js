import "../scss/index.scss";
import makeElement from "./utils/make-element";
import containerize from "./utils/containerize";
import header from "./header";
import footer from "./footer";
import main from "./main";
import * as Storage from "./storage";
import plusSignSVG from "../assets/add.svg";
import deleteSVG from "../assets/delete.svg";
import checkboxFilledSVG from "../assets/checked.svg";
import checkboxEmptySVG from "../assets/unchecked.svg";

//
// creating & rendering elements
//

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
  const sampleElements = prepTodoListElements(sampleData);
  main.content.appendChild(sampleElements);
};

const prepTodoListElements = (listObj) => {
  const container = makeElement("div", "list-container");
  const title = makeElement("h2", "list-title", listObj.getName());
  const addTask = prepAddNewTask();
  const tasks = prepAllTaskElements(listObj.getTasks());
  container.appendChild(title);
  container.appendChild(addTask);
  tasks.forEach((element) => container.appendChild(element));
  return container;
};

const prepAddNewTask = () => {
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
  textbox.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addTaskEvent(e);
  });
  return containerize(
    container,
    label,
    containerize("add-task-textbox-container", textbox, button)
  );
};

const prepAllTaskElements = (tasksArray) => {
  return tasksArray.map((task) => prepTaskElement(task));
};

const prepTaskElement = (task) => {
  const container = makeElement("div", "task-container");
  const checkbox = makeElement(
    "img",
    "task-status unchecked",
    "",
    "",
    checkboxEmptySVG
  );
  const description = makeElement(
    "p",
    "task-description",
    task.getDescription()
  );
  const dueDate = makeElement("p", "task-date", task.getDate());
  const deleteIcon = makeElement("img", "delete-task", "", "", deleteSVG);
  deleteIcon.addEventListener("click", deleteTask);
  checkbox.addEventListener("click", toggleTaskStatus);
  return containerize(container, checkbox, description, dueDate, deleteIcon);
};

//
// event handler callback functions
//

const addTaskEvent = (e) => {
  const element = e.target;
  const textbox = getNewTaskTextbox(element);

  // make sure text was entered
  const description = textbox.value;
  if (description === "") return;

  // add new task to storage
  const listTitle = getListTitle(element);
  const tasksArray = Storage.findList(listTitle);
  tasksArray.addTask(description);

  // create task elements & append it to the page
  const taskElement = prepTaskElement(tasksArray.getLastTask());
  const parentList = getParentListElement(element);
  parentList.appendChild(taskElement);
  textbox.value = "";
};

const toggleTaskStatus = (e) => {
  const element = e.target;

  // update status of the task in storage
  const taskObj = getTaskFromStorage(element);
  taskObj.toggleStatus();

  // change icon to reflect its status
  taskObj.getStatus() === "Complete"
    ? markTaskComplete(element)
    : markTaskIncomplete(element);
};

const deleteTask = (e) => {
  const element = e.target;
  deleteTaskFromStorage(element);
  const taskContainer = element.closest(".task-container");
  taskContainer.remove();
};

//
// utility functions
//

const markTaskComplete = (element) => {
  element.src = checkboxFilledSVG;
  const description = getTaskDescriptionElement(element);
  description.style.textDecoration = "line-through";
  description.style.fontStyle = "italic";
};

const markTaskIncomplete = (element) => {
  element.src = checkboxEmptySVG;
  const description = getTaskDescriptionElement(element);
  description.style.textDecoration = "none";
  description.style.fontStyle = "normal";
};

// used as a reference point for other functions
const getParentListElement = (element) => {
  return element.closest(".list-container");
};

const getNewTaskTextbox = (element) => {
  const parentList = getParentListElement(element);
  return parentList.querySelector("input");
};

const getListTitle = (element) => {
  const parentList = getParentListElement(element);
  return parentList.firstChild.textContent;
};

const getTaskDescription = (element) => {
  return element.parentElement.children.item(1).textContent;
};

const getTaskDescriptionElement = (element) => {
  return element.parentElement.children.item(1);
};

//
// storage related functions
//

const getTaskFromStorage = (element) => {
  const listTitle = getListTitle(element);
  const taskDescription = getTaskDescription(element);
  return Storage.getTaskFromList(taskDescription, listTitle);
};

const deleteTaskFromStorage = (element) => {
  const listTitle = getListTitle(element);
  const taskDescription = getTaskDescription(element);
  Storage.deleteTaskFromList(taskDescription, listTitle);
};
