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
  Storage.generateSampleData();
  renderLayout();
  renderSidebar();
  renderAllProjects();
};

const renderLayout = () => {
  const body = document.querySelector("body");
  const elements = [header, main.parent, footer];
  elements.forEach((element) => body.appendChild(element));
};

const renderSidebar = () => {
  const elements = [];
  // add title: "Projects"
  elements.push(makeElement("h2", "sidebar-title", "Projects"));
  // add array of project buttons
  const swapProjectButtonsArray = prepSwapProjectButtons();
  swapProjectButtonsArray.forEach((btn) => elements.push(btn));
  // add "add project" section
  const addProject = prepAddProject();
  elements.push(addProject);
  // render elements to the sidebar
  elements.forEach((ele) => main.sidebar.appendChild(ele));
};

const prepSwapProjectButtons = () => {
  const elements = [];
  // create a 'view all' projects button
  const viewAllBtn = makeElement("button", "nav-button", "View All");
  viewAllBtn.addEventListener("click", swapProjectEvent);
  elements.push(viewAllBtn);
  // create array of buttons for each project
  const projectsArray = getAllListsFromStorage();
  const swapProjectBtnsArray = projectsArray.map((listObj) => {
    const listName = listObj.getName();
    const button = makeElement("button", "nav-button", listName);
    button.addEventListener("click", swapProjectEvent);
    return button;
  });
  elements.push(...swapProjectBtnsArray);
  return elements;
};

const swapProjectEvent = (e) => {
  // swap to project on button click
  const projectName = e.target.textContent;
  projectName === "View All"
    ? renderAllProjects()
    : renderOneProject(getProjectFromStorage(projectName));
};

const renderAllProjects = () => {
  // triggered on first page load & 'view all' button click
  clearMainContent();
  const allListObjs = getAllListsFromStorage();
  allListObjs.forEach((listObj) => {
    renderTaskList(listObj);
  });
};

const renderOneProject = (listObj) => {
  // triggered on a single project view
  clearMainContent();
  renderTaskList(listObj);
};

const renderTaskList = (listObj) => {
  // used by display one & all project buttons
  // prevents clearing page on renderAllProjects
  const elements = prepProjectView(listObj);
  main.content.appendChild(elements);
};

const prepAddProject = () => {
  const container = makeElement("div", "add-new-project-container");
  const label = makeElement("label", "add-project-label", "Add Project");
  const textbox = makeElement(
    "input",
    "add-project-textbox",
    "",
    "add-project-textbox"
  );
  const button = makeElement("button", "add-project-btn");
  const image = makeElement(
    "img",
    "add-project-img",
    "Add Project",
    "",
    plusSignSVG
  );
  button.appendChild(image);
  button.addEventListener("click", addProjectEvent);
  textbox.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addProjectEvent(e);
  });
  return containerize(
    container,
    label,
    containerize("add-project-textbox-container", textbox, button)
  );
};

const addProjectEvent = (e) => {
  const element = e.target;
  const projectName = element.closest("div").firstChild.value;
  // prevent empty & duplicate list names
  const allProjects = getAllListsFromStorage();
  const allProjectNames = allProjects.map((project) => project.name);
  if (
    projectName === "" ||
    projectName === null ||
    projectName === "View All" ||
    allProjectNames.some((name) => projectName === name)
  )
    return;
  // project doesn't eixst
  addNewProjectToStorage(projectName);
  clearSidebar();
  renderSidebar();

  // display new project in main.content
  const newProjectObj = getProjectFromStorage(projectName);
  renderOneProject(newProjectObj);
};

const prepProjectView = (listObj) => {
  const container = makeElement("div", "list-container");
  const listName = listObj.getName();
  const titleBar = makeElement("h2", "list-title", listName);
  container.appendChild(titleBar);
  const addTask = prepAddNewTask();
  container.appendChild(addTask);
  const tasksArray = listObj.getTasks();
  const taskElements = prepAllTasks(tasksArray);
  taskElements.forEach((element) => container.appendChild(element));
  return container;
};

const prepAllTasks = (tasksArray) => {
  return tasksArray.map((task) => prepTask(task));
};

const prepTask = (task) => {
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

//
// event handler callback functions
//

const addTaskEvent = (e) => {
  const element = e.target;
  const parentList = getParentListElement(element);
  const textbox = parentList.querySelector("input");

  // make sure text was entered
  const description = textbox.value;
  if (description === "") return;

  // add new task to storage
  const listTitle = getListTitle(element);
  const tasksArray = getProjectFromStorage(listTitle);
  tasksArray.addTask(description);

  // create task elements & append it to the page
  const taskElement = prepTask(tasksArray.getLastTask());
  parentList.appendChild(taskElement);
  textbox.value = "";
};

const toggleTaskStatus = (e) => {
  const element = e.target;

  // update status of the task in storage
  const listTitle = getListTitle(element);
  const taskDescription = getTaskDescription(element);

  const taskObj = getTaskFromStorage(taskDescription, listTitle);
  taskObj.toggleStatus();

  // change icon to reflect its status
  taskObj.getStatus() === "Complete"
    ? markTaskComplete(element)
    : markTaskIncomplete(element);
};

const deleteTask = (e) => {
  const element = e.target;
  const listTitle = getListTitle(element);
  const taskDescription = getTaskDescription(element);
  deleteTaskFromStorage(taskDescription, listTitle);
  const taskContainer = element.closest(".task-container");
  taskContainer.remove();
};

//
// utility functions
//

const clearContainer = (element) => {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};

const clearSidebar = () => clearContainer(main.sidebar);

const clearMainContent = () => clearContainer(main.content);

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

const addNewProjectToStorage = (name) => {
  Storage.addList(name);
};

const getProjectFromStorage = (name) => {
  return Storage.findList(name);
};

const getAllListsFromStorage = () => {
  return Storage.getLists();
};

const getTaskFromStorage = (taskDescription, listTitle) => {
  return Storage.getTaskFromList(taskDescription, listTitle);
};

const deleteTaskFromStorage = (taskDescription, listTitle) => {
  Storage.deleteTaskFromList(taskDescription, listTitle);
};
