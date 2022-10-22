import "../scss/index.scss";
import makeElement from "./utils/make-element";
import containerize from "./utils/containerize";
import header from "./header";
import footer from "./footer";
import main from "./main";
import * as Storage from "./storage";
import plusSignSVG from "../assets/add.svg";
import deleteSVG from "../assets/delete.svg";
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
  const deleteIcon = makeElement("img", "delete-task", "", "", deleteSVG);
  deleteIcon.addEventListener("click", deleteTask);
  checkbox.addEventListener("click", toggleTaskStatus);
  return containerize(container, checkbox, description, dueDate, deleteIcon);
};

const addTaskEvent = (e) => {
  const element = e.target;

  // add new task to its corresponding object
  const listTitle = getListTitle(element);
  const targetList = Storage.findList(listTitle);
  const newTaskDescription = getNewTaskText(element);
  targetList.addTask(newTaskDescription);

  // create task elements & append it to the page
  const taskElement = prepTaskElement(targetList.getLastTask());
  const parentList = getParentListElement(element);
  parentList.appendChild(taskElement);
};

const toggleTaskStatus = (e) => {
  const element = e.target;

  // update status in it's object
  const task = getTaskFromStorage(element);
  task.toggleStatus();

  // update dom w/ status
  task.getStatus() === "Complete"
    ? markTaskComplete(element)
    : markTaskIncomplete(element);
};

const deleteTask = (e) => {
  const element = e.target;
  const task = deleteTaskFromStorage(element);
  const taskContainer = element.closest(".task-container");
  taskContainer.remove();
};

const markTaskComplete = (element) => {
  element.src = checkedImg;
};

const markTaskIncomplete = (element) => {
  element.src = uncheckedImg;
};

// used as a reference point for other functions
const getParentListElement = (element) => {
  return element.closest(".list-container");
};

const getNewTaskText = (element) => {
  const parentList = getParentListElement(element);
  return parentList.querySelector("input").value;
};

const getListTitle = (element) => {
  const parentList = getParentListElement(element);
  return parentList.firstChild.textContent;
};

const getTaskDescription = (element) => {
  return element.parentElement.children.item(1).textContent;
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
