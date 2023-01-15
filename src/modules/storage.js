import {
  endOfMonth,
  endOfWeek,
  isBefore,
  subDays,
  addDays,
  parseISO,
  isAfter,
} from "date-fns";
import Project from "./project";
import Task from "./task";
import { loadDataFromFirebase, saveDataToFirebase } from "./firebase";

const Storage = [];

// DATA STRUCTURE:
//
// Storage = []
//   Project {}
//     name: Project Name
//     tasks: [
//       Task {
//         description: Task description
//         dueDate: ...
//         getDescription()

const saveToLocalStorage = () => {
  localStorage.setItem("bmilcs-todolist", JSON.stringify(Storage));
  saveDataToFirebase(Storage);
};

const loadProjects = () => {
  loadProjectsFromLocalStorage();
  // TODO:
  // if logged in,
  //     Fetch FireBase data
  //     Compare local data to firebase data
  //     If different, add localdata to firebase data
  //     Else load firebase
  //  Not logged in,
  //     LocalStorage
  //     SampleData fall back
  // ----------------------------------------
  // if (localStorage.getItem("bmilcs-todolist")) {
  // loadProjectsFromLocalStorage();
  // } else {
  // generateSampleData();
  // }
};

const addProject = (projectName) => {
  const project = new Project(projectName);
  Storage.push(project);
  saveToLocalStorage();
  return project;
};

const getProjectObj = (projectName) => {
  return Storage.find((project) => {
    return project.name == projectName;
  });
};

const getAllProjectNames = () => {
  return Storage.map((project) => project.getName());
};

const getAllTasksFromProject = (projectName) => {
  return getProjectObj(projectName).tasks;
};

const getATaskFromProject = (description, projectName) => {
  const tasksArray = getAllTasksFromProject(projectName);
  const index = tasksArray.findIndex(
    (task) => task.description === description
  );
  return tasksArray[index];
};

const getLastTaskFromProject = (projectName) => {
  const allTasks = getAllTasksFromProject(projectName);
  return allTasks[allTasks.length - 1];
};

const isProjectEmpty = (projectName) => {
  return getAllTasksFromProject(projectName).length === 0 ? true : false;
};

const deleteProject = (projectName) => {
  const index = Storage.findIndex((project) => project.name === projectName);
  Storage.splice(index, 1);
  saveToLocalStorage();
};

const getTasksFilteredByDate = (timeframeDescription) => {
  let dateRestriction;
  const todaysDate = new Date();
  // determine cut off date
  if (timeframeDescription === "Today") dateRestriction = todaysDate;
  else if (timeframeDescription === "This Week") {
    dateRestriction = addDays(endOfWeek(todaysDate), 1);
  } else if (timeframeDescription === "This Month")
    dateRestriction = endOfMonth(todaysDate);
  else if (timeframeDescription === "Overdue") {
    dateRestriction = todaysDate;
  }
  // recreate the same data structure, filtering tasks by date
  // create a new array: filteredStorage[] > filteredProject{}.tasks[] > filteredTasks{}
  const filteredStorage = Storage.reduce((filteredData, project) => {
    // tasks []: contains Task objects
    const allTasks = project.tasks;
    // remove any tasks that aren't before the date restriction
    const filteredTasks = allTasks.filter((task) => {
      const parsedDueDate = parseISO(task.dueDate);
      const overDue = !isAfter(parsedDueDate, subDays(todaysDate, 1));
      const beforeDateRestriction = isBefore(parsedDueDate, dateRestriction);
      return timeframeDescription === "Overdue"
        ? overDue
        : !overDue && beforeDateRestriction;
    });
    // if no tasks remain, return without adding the project to the new array
    if (filteredTasks.length === 0) {
      return filteredData;
    }
    // filtered tasks exist: recreate the Project w/ filtered tasks
    const filteredProject = {};
    filteredProject.name = project.getName();
    filteredProject.tasks = [...filteredTasks];
    // add the project to the new filteredStorage
    filteredData.push(filteredProject);
    return filteredData;
  }, []);
  return filteredStorage;
};

const changeTaskDescription = (originalValue, newValue, projectName) => {
  const taskObj = getATaskFromProject(originalValue, projectName);
  taskObj.description = newValue;
  saveToLocalStorage;
};

const toggleTaskStatus = (taskDescription, projectName) => {
  const taskObj = getATaskFromProject(taskDescription, projectName);
  taskObj.toggleStatus();
  saveToLocalStorage();
};

const getTaskStatus = (taskDescription, projectName) => {
  const taskObj = getATaskFromProject(taskDescription, projectName);
  return taskObj.getStatus();
};

const addTaskToProject = (description, projectName) => {
  const taskList = getProjectObj(projectName);
  taskList.addTask(description);
  saveToLocalStorage();
};

const deleteTaskFromProject = (description, projectName) => {
  const taskList = getProjectObj(projectName);
  taskList.deleteTask(description);
  saveToLocalStorage();
};

const changeTaskDueDate = (date, description, projectName) => {
  const task = getATaskFromProject(description, projectName);
  task.setDate(date);
  saveToLocalStorage();
};

const loadProjectsFromLocalStorage = () => {
  const importedData = JSON.parse(localStorage.getItem("bmilcs-todolist"));
  console.log("localStorage", importedData);
  // reassembleStorageDataStructure(importedData);
};

const reassembleData = (importedData) => {
  const reassembledArrayofProjectObjects = importedData.map((project) => {
    // localStorage strips away prototype/methods/constructors
    // convert Storage[] > Project{}.tasks[] > task{} to new Task objects
    const tasksWithPrototype = project["tasks"].map((task) => {
      return new Task(task.description, task.dueDate, task.status);
    });
    // convert Storage[] > project{} to Project objects
    const projectWithPrototype = Object.assign(new Project(project.name));
    // reassmble the final data structure:
    projectWithPrototype.tasks = tasksWithPrototype;
    return projectWithPrototype;
  });
  reassembledArrayofProjectObjects.forEach((project) => Storage.push(project));
};

const generateSampleData = () => {
  const list = addProject("Web Development");
  list.addTask("Finish my todo list project", "2022-11-01");
  list.addTask("Complete Odin Project", "2023-01-01");
  const list2 = addProject("Home Renovation");
  list2.addTask("Install living room windows", "2023-01-01");
  list2.addTask(
    "Spray foam insulation in window rough opening gaps",
    "2023-01-01"
  );
  list2.addTask("Cut & install window casing", "2023-01-01");
  list2.addTask("Prime window trim", "2023-01-01");
  list2.addTask("Caulk interior & exterior", "2023-01-01");
  list2.addTask("Paint window", "2023-01-01");
  saveToLocalStorage();
};

export {
  addProject,
  addTaskToProject,
  getProjectObj,
  getAllProjectNames,
  getATaskFromProject,
  getAllTasksFromProject,
  getLastTaskFromProject,
  toggleTaskStatus,
  getTaskStatus,
  loadProjects,
  changeTaskDescription,
  deleteTaskFromProject,
  changeTaskDueDate,
  generateSampleData,
  getTasksFilteredByDate,
  isProjectEmpty,
  deleteProject,
  reassembleData,
};
