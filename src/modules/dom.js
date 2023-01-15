import "../scss/index.scss";
import makeElement from "./utils/make-element";
import containerize from "./utils/containerize";
import { createHeader } from "./header";
import footer from "./footer";
import main from "./main";
import * as Storage from "./storage";
import plusSignSVG from "../assets/add.svg";
import deleteSVG from "../assets/delete.svg";
import checkboxFilledSVG from "../assets/checked.svg";
import checkboxEmptySVG from "../assets/unchecked.svg";
import editSVG from "../assets/edit.svg";
import arrowSVG from "../assets/arrow.svg";

export const startApp = () => {
  Storage.loadData();
  renderPage();
};

export const renderPage = () => {
  renderLayout();
  renderSidebar();
  renderAllProjects();
};

export const reRenderPage = () => {
  clearPage();
  clearMainContent();
  clearSidebar();
  renderPage();
};

const renderLayout = () => {
  const body = document.querySelector("body");
  containerize(body, createHeader(), main.sidebar, main.content, footer);
};

const renderSidebar = () => {
  containerize(
    main.sidebar,
    makeElement("h2", "sidebar-title", "Projects"),
    prepAllProjectNavBtns(),
    prepNavBtn("View All"),
    prepAddNewProject(),
    makeElement("h2", "sidebar-title", "By Date"),
    prepNavBtn("Overdue"),
    prepNavBtn("Today"),
    prepNavBtn("This Week"),
    prepNavBtn("This Month")
  );
};

const prepNavBtn = (name) => {
  const button = containerize(
    makeElement("button", "nav-button"),
    makeElement("img", "arrow-svg", "", "", arrowSVG),
    makeElement("p", "button-p", name)
  );
  button.addEventListener("click", swapProjectEvent);
  return button;
};

const swapProjectEvent = (e) => {
  const navTarget = e.target.textContent;
  clearMainContent();
  if (
    navTarget === "Today" ||
    navTarget === "This Week" ||
    navTarget === "This Month" ||
    navTarget === "Overdue"
  )
    renderDateFilteredProjects(navTarget);
  else if (navTarget === "View All") renderAllProjects();
  else renderProject(navTarget);
};

const prepAllProjectNavBtns = () => {
  const projectNamesArray = Storage.getAllProjectNames();
  return projectNamesArray.map((name) => {
    return prepNavBtn(name);
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
    if (e.key === "Enter") addNewProjectEvent(e);
  });
  const button = containerize(
    makeElement("button", "add-project-btn"),
    makeElement("img", "add-project-img", "Add Project", "", plusSignSVG)
  );
  button.addEventListener("click", addNewProjectEvent);
  return containerize(
    "add-new-project-container",
    label,
    containerize("add-project-textbox-container", textbox, button)
  );
};

const addNewProjectEvent = (e) => {
  const element = e.target;
  const newProjectName = element.closest("div").firstChild.value;
  const allProjectNames = Storage.getAllProjectNames();
  // prevent empty & duplicate names
  if (
    newProjectName === "" ||
    newProjectName === null ||
    newProjectName === "View All" ||
    allProjectNames.some((name) => newProjectName === name)
  )
    return;
  // project doesn't exist & is valid
  Storage.addProject(newProjectName);
  clearSidebar();
  renderSidebar();
  // swap to new project
  clearMainContent();
  renderProject(newProjectName);
};

const renderDateFilteredProjects = (timeframeDescription) => {
  const filteredData = Storage.getTasksFilteredByDate(timeframeDescription);
  const filteredProjectElements = filteredData.map((project) => {
    return prepDateFilteredProjects(project);
  });
  filteredProjectElements.forEach((project) =>
    main.content.appendChild(project)
  );
};

const renderAllProjects = () => {
  const projectNamesArray = Storage.getAllProjectNames();
  projectNamesArray.forEach((projectName) => {
    renderProject(projectName);
  });
};

const renderProject = (projectName) => {
  const elements = prepFullProjectView(projectName);
  main.content.appendChild(elements);
};

const prepDateFilteredProjects = (project) => {
  const projectName = project.name;
  const tasksArray = project.tasks;
  return containerize(
    "project-container",
    makeElement("h2", "project-title", projectName),
    prepAddNewTask(projectName),
    prepAllTasks(tasksArray)
  );
};

const prepFullProjectView = (projectName) => {
  const tasksArray = Storage.getAllTasksFromProject(projectName);
  return containerize(
    "project-container",
    makeElement("h2", "project-title", projectName),
    prepAddNewTask(projectName),
    prepAllTasks(tasksArray)
  );
};

const prepAddNewTask = (projectName) => {
  // format id for input: lowercase & remove whitespace
  const inputID = `add-task-textbox-${projectName
    .replace(/\s+/g, "")
    .toLowerCase()}`;
  const label = makeElement("label", "add-task-label", "Add task");
  label.htmlFor = inputID;
  const textbox = makeElement("input", "add-task-textbox", "", inputID);
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
  Storage.addTaskToProject(textbox.value, projectName);
  // create task elements & append it to the page
  const lastTaskObj = Storage.getLastTaskFromProject(projectName);
  const taskElement = prepTask(lastTaskObj);
  parentProject.appendChild(taskElement);
  textbox.value = "";
};

const prepAllTasks = (tasksArray) => {
  return tasksArray.map((task) => prepTask(task));
};

const prepTask = (taskObj) => {
  let checkbox, descriptionInputClasses, containerClasses;
  if (taskObj.getStatus() === "Complete") {
    containerClasses = "task-container completed";
    descriptionInputClasses = "task-description-input completed";
    checkbox = makeElement("img", "task-status", "", "", checkboxFilledSVG);
  } else {
    containerClasses = "task-container";
    descriptionInputClasses = "task-description-input";
    checkbox = makeElement(
      "img",
      "task-status unchecked",
      "",
      "",
      checkboxEmptySVG
    );
  }
  const container = makeElement("div", containerClasses);
  const descriptionInput = makeElement(
    "input",
    descriptionInputClasses,
    taskObj.getDescription()
  );
  descriptionInput.disabled = true;
  const dueDate = makeElement("input", "task-date", taskObj.getDate());
  dueDate.setAttribute("type", "date");
  dueDate.addEventListener("change", changeDateEvent);
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
    container,
    checkbox,
    descriptionInput,
    dueDate,
    editIcon,
    deleteIcon
  );
};

const changeDateEvent = (e) => {
  const element = e.target;
  const dueDate = e.target.value;
  const projectName = getParentProjectName(element);
  const taskDescription = getTaskDescriptionValue(element);
  Storage.changeTaskDueDate(dueDate, taskDescription, projectName);
};

const toggleStatusEvent = (e) => {
  const element = e.target;
  const projectName = getParentProjectName(element);
  const taskDescription = getTaskDescriptionValue(element);
  Storage.toggleTaskStatus(taskDescription, projectName);
  Storage.getTaskStatus(taskDescription, projectName) === "Complete"
    ? renderTaskComplete(element)
    : renderTaskIncomplete(element);
};

const renderTaskComplete = (element) => {
  const taskContainer = getParentTaskContainer(element);
  taskContainer.classList.add("completed");
  element.src = checkboxFilledSVG;
  const description = getTaskDescriptionElement(element);
  description.classList.add("completed");
};

const renderTaskIncomplete = (element) => {
  const taskContainer = getParentTaskContainer(element);
  taskContainer.classList.remove("completed");
  element.src = checkboxEmptySVG;
  const description = getTaskDescriptionElement(element);
  description.classList.remove("completed");
};

// toggles between edit & submit modes
const editTaskDescriptionEvent = (e) => {
  // edit mode: editIcon clicked
  const editIcon = e.target;
  const input = getTaskDescriptionElement(editIcon);
  const originalValue = input.value;
  input.disabled = false;
  input.focus();
  const taskContainer = getParentTaskContainer(editIcon);
  taskContainer.classList.add("edit-task-mode");
  // submit mode callback (explained at bottom of the parent scope)
  const submitEditedDescription = (e) => {
    if (e.key === "Enter" || e.key === "Escape" || e.target === editIcon) {
      // edit mode is over:
      input.disabled = true;
      taskContainer.classList.remove("edit-task-mode");
      // escape: restore original value only
      if (e.key === "Escape") {
        input.value = originalValue;
      } else {
        // enter/editIcon: if change was made, update storage
        const newValue = input.value;
        if (newValue !== originalValue) {
          const projectName = getParentProjectName(editIcon);
          Storage.changeTaskDescription(originalValue, newValue, projectName);
        }
      }
      editIcon.removeEventListener("click", submitEditedDescription);
      input.removeEventListener("keydown", submitEditedDescription);
      editIcon.addEventListener("click", editTaskDescriptionEvent, {
        once: true,
      });
    }
  };
  // after clicking editIcon, exit "edit mode"
  // and listen for submission of the edits:
  // clicking editIcon again, enter or escape on keyboard
  editIcon.removeEventListener("click", editTaskDescriptionEvent);
  editIcon.addEventListener("click", submitEditedDescription);
  input.addEventListener("keydown", submitEditedDescription);
};

const deleteTaskEvent = (e) => {
  const element = e.target;
  const projectName = getParentProjectName(element);
  const taskDescription = getTaskDescriptionValue(element);
  Storage.deleteTaskFromProject(taskDescription, projectName);
  const taskContainer = getParentTaskContainer(element);
  taskContainer.remove();
  deleteProjectIfEmpty(projectName);
};

const deleteProjectIfEmpty = (projectName) => {
  if (!Storage.isProjectEmpty(projectName)) return;
  Storage.deleteProject(projectName);
  clearMainContent();
  clearSidebar();
  renderSidebar();
  renderAllProjects();
};

//
// utility functions
//

const clearContainer = (element) => {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};

const clearPage = () =>
  clearContainer(document.getElementsByTagName("body")[0]);

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

const getTaskDescriptionValue = (element) => {
  return element.parentElement.children.item(1).value;
};

const getTaskDescriptionElement = (element) => {
  return element.parentElement.children.item(1);
};
