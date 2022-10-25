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
import editSVG from "../assets/edit.svg";
import arrowSVG from "../assets/arrow.svg";

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
  containerize(body, header, main.sidebar, main.content, footer);
};

const renderSidebar = () => {
  containerize(
    main.sidebar,
    makeElement("h2", "sidebar-title", "Projects"),
    prepProjectBtn("View All"),
    prepAllProjectBtns(),
    prepAddNewProject()
  );
};

const prepProjectBtn = (name) => {
  const button = containerize(
    makeElement("button", "nav-button"),
    makeElement("img", "arrow-svg", "", "", arrowSVG),
    makeElement("p", "button-p", name)
  );
  button.addEventListener("click", swapProjectEvent);
  return button;
};

const prepAllProjectBtns = () => {
  const projectNamesArray = getAllProjectNamesFromStorage();
  return projectNamesArray.map((name) => {
    return prepProjectBtn(name);
  });
};

const prepAddNewProject = () => {
  const label = makeElement("label", "add-project-label", "Add Project");
  label.htmlFor = "add-project-textbox";
  const textbox = makeElement(
    "input",
    "add-project-textbox",
    "",
    "add-project-textbox"
  );
  textbox.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addProjectEvent(e);
  });
  const button = containerize(
    makeElement("button", "add-project-btn"),
    makeElement("img", "add-project-img", "Add Project", "", plusSignSVG)
  );
  button.addEventListener("click", addProjectEvent);
  return containerize(
    "add-new-project-container",
    label,
    containerize("add-project-textbox-container", textbox, button)
  );
};

const addProjectEvent = (e) => {
  const element = e.target;
  const projectName = element.closest("div").firstChild.value;
  const allProjectNames = getAllProjectNamesFromStorage();
  // prevent empty & duplicate names
  if (
    projectName === "" ||
    projectName === null ||
    projectName === "View All" ||
    allProjectNames.some((name) => projectName === name)
  )
    return;
  // project doesn't exist & is valid
  addNewProjectToStorage(projectName);
  clearSidebar();
  renderSidebar();
  // swap to new project
  clearMainContent();
  renderProject(projectName);
};

const swapProjectEvent = (e) => {
  const projectName = e.target.textContent;
  clearMainContent();
  projectName === "View All" ? renderAllProjects() : renderProject(projectName);
};

const renderAllProjects = () => {
  const projectNamesArray = getAllProjectNamesFromStorage();
  projectNamesArray.forEach((projectName) => {
    renderProject(projectName);
  });
};

const renderProject = (projectName) => {
  const elements = prepProjectView(projectName);
  main.content.appendChild(elements);
};

const prepProjectView = (projectName) => {
  const tasksArray = getAllTasksFromStorage(projectName);
  return containerize(
    "project-container",
    makeElement("h2", "project-title", projectName),
    prepAddNewTask(projectName),
    prepAllTasks(tasksArray)
  );
};

const prepAddNewTask = (projectName) => {
  const label = makeElement("label", "add-task-label", "Add task");
  label.htmlFor = `add-task-textbox-${projectName}`;
  const textbox = makeElement(
    "input",
    "add-task-textbox",
    "",
    `add-task-textbox-${projectName}`
  );
  textbox.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addTaskEvent(e);
  });
  const button = containerize(
    makeElement("button", "add-task-btn"),
    makeElement("img", "add-task-img", "Add Task", "", plusSignSVG)
  );
  button.addEventListener("click", addTaskEvent);
  return containerize(
    "add-task-section",
    label,
    containerize("add-task-textbox-container", textbox, button)
  );
};

const addTaskEvent = (e) => {
  const element = e.target;
  const parentProject = getParentProjectElement(element);
  const textbox = parentProject.querySelector("input");
  // make sure text was entered
  if (textbox.value === "") return;
  // add new task to storage
  const projectName = getParentProjectName(element);
  addTaskToStorage(textbox.value, projectName);
  // create task elements & append it to the page
  const tasksArray = getProjectFromStorage(projectName);
  const taskElement = prepTask(tasksArray.getLastTask());
  parentProject.appendChild(taskElement);
  textbox.value = "";
};

const prepAllTasks = (tasksArray) => {
  return tasksArray.map((task) => prepTask(task));
};

const prepTask = (task) => {
  const checkbox = makeElement(
    "img",
    "task-status unchecked",
    "",
    "",
    checkboxEmptySVG
  );
  const descriptionInput = makeElement(
    "input",
    "task-description-input",
    task.getDescription()
  );
  descriptionInput.disabled = true;
  const dueDate = makeElement("p", "task-date", task.getDate());
  const deleteIcon = makeElement(
    "img",
    "delete-task",
    "Delete Task",
    "",
    deleteSVG
  );
  const editIcon = makeElement(
    "img",
    "edit-task-description",
    "Edit Task Description",
    "",
    editSVG
  );
  editIcon.addEventListener("click", editTaskDescriptionEvent);
  deleteIcon.addEventListener("click", deleteTaskEvent);
  checkbox.addEventListener("click", toggleStatusEvent);
  return containerize(
    "task-container",
    checkbox,
    descriptionInput,
    dueDate,
    editIcon,
    deleteIcon
  );
};

const toggleStatusEvent = (e) => {
  const element = e.target;
  // update status of the task in storage
  const projectName = getParentProjectName(element);
  const taskDescription = getTaskDescription(element);
  const taskObj = getTaskFromStorage(taskDescription, projectName);
  taskObj.toggleStatus();
  // change icon to reflect its status
  taskObj.getStatus() === "Complete"
    ? renderTaskComplete(element)
    : renderTaskIncomplete(element);
};

const renderTaskComplete = (element) => {
  const taskContainer = getParentTaskContainer(element);
  taskContainer.classList.add("completed");
  element.src = checkboxFilledSVG;
  const description = getTaskDescriptionElement(element);
  description.style.textDecoration = "line-through";
  description.style.fontStyle = "italic";
};

const renderTaskIncomplete = (element) => {
  const taskContainer = getParentTaskContainer(element);
  taskContainer.classList.remove("completed");
  element.src = checkboxEmptySVG;
  const description = getTaskDescriptionElement(element);
  description.style.textDecoration = "none";
  description.style.fontStyle = "normal";
};

const editTaskDescriptionEvent = (e) => {
  const editIcon = e.target;
  const input = getTaskDescriptionElement(editIcon);
  const originalValue = input.value;
  input.disabled = false;
  input.focus();
  const taskContainer = getParentTaskContainer(editIcon);
  taskContainer.classList.add("edit-task-mode");
  const submitEditedDescription = (e) => {
    // "enter" or clicking edit icon while in edit mode
    if (e.key === "Enter" || e.target === editIcon) {
      input.disabled = true;
      taskContainer.classList.remove("edit-task-mode");
      const newValue = input.value;
      if (newValue !== originalValue) {
        const projectName = getParentProjectName(editIcon);
        changeTaskDescriptionInStorage(originalValue, newValue, projectName);
      }
      editIcon.removeEventListener("click", submitEditedDescription);
      input.removeEventListener("keydown", submitEditedDescription);
      editIcon.addEventListener("click", editTaskDescriptionEvent, {
        once: true,
      });
    }
  };
  editIcon.removeEventListener("click", editTaskDescriptionEvent);
  editIcon.addEventListener("click", submitEditedDescription);
  input.addEventListener("keydown", submitEditedDescription);
};

const deleteTaskEvent = (e) => {
  const element = e.target;
  const projectName = getParentProjectName(element);
  const taskDescription = getTaskDescription(element);
  deleteTaskFromStorage(taskDescription, projectName);
  const taskContainer = getParentTaskContainer(element);
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

const getParentProjectElement = (element) => {
  return element.closest(".project-container");
};

const getParentTaskContainer = (element) => {
  return element.closest(".task-container");
};

const getParentProjectName = (element) => {
  const parentProject = getParentProjectElement(element);
  return parentProject.firstChild.textContent;
};

const getTaskDescription = (element) => {
  return element.parentElement.children.item(1).value;
};

const getTaskDescriptionElement = (element) => {
  return element.parentElement.children.item(1);
};

//
// storage related functions
//

const addNewProjectToStorage = (name) => {
  return Storage.addProject(name);
};

const getProjectFromStorage = (name) => {
  return Storage.getProjectObj(name);
};

const getAllProjectNamesFromStorage = () => {
  return Storage.getAllProjectNames();
};

const getAllTasksFromStorage = (projectName) => {
  return Storage.getAllTasksFromProject(projectName);
};

const getTaskFromStorage = (description, projectName) => {
  return Storage.getATaskFromProject(description, projectName);
};

const addTaskToStorage = (description, projectName) => {
  Storage.addTaskToProject(description, projectName);
};

const deleteTaskFromStorage = (description, projectName) => {
  Storage.deleteTaskFromProject(description, projectName);
};

const changeTaskDescriptionInStorage = (
  originalValue,
  newValue,
  projectName
) => {
  Storage.changeTaskDescription(originalValue, newValue, projectName);
};
