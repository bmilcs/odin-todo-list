import Project from "./project";

let Storage = [];

const saveToLocalStorage = () => {
  const isLocalStorageSupported = typeof storage !== "undefined";
  // if (isLocalStorageSupported) {
  console.warn("Storage is supported.");
  localStorage.setItem("bmTodo", JSON.stringify(Storage));
  // }
  console.log(JSON.parse(localStorage.getItem("bmTodo")));
};

const addProject = (projectName) => {
  const project = new Project(projectName);
  Storage.push(project);
  saveToLocalStorage();
  return project;
};

const getAllProjects = () => {
  if (localStorage.getItem("bmTodo") !== null)
    if ("bmTodo" in localStorage) {
      Storage = JSON.parse(localStorage.getItem("bmTodo"));
    }
  return Storage;
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
  const tasksArray = getProjectObj(projectName).tasks;
  const index = tasksArray.findIndex(
    (task) => task.description === description
  );
  return tasksArray[index];
};

const changeTaskDescription = (originalValue, newValue, projectName) => {
  const listObj = getATaskFromProject(originalValue, projectName);
  listObj.description = newValue;
  saveToLocalStorage;
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

const generateSampleData = () => {
  const list = addProject("Web Development");
  list.addTask("Finish my todo list project", "11/2/2022");
  list.addTask("Complete Odin Project", "1/1/2023");
  const list2 = addProject("Home Renovation");
  list2.addTask("Install living room windows", "1/1/2023");
  list2.addTask(
    "Spray foam insulation in window rough opening gaps",
    "1/1/2023"
  );
  list2.addTask("Cut & install window casing", "1/1/2023");
  list2.addTask("Prime window trim", "1/1/2023");
  list2.addTask("Caulk interior & exterior", "1/1/2023");
  list2.addTask("Paint window", "1/1/2023");
};

export {
  addProject,
  addTaskToProject,
  getProjectObj,
  getAllProjects,
  getAllProjectNames,
  getATaskFromProject,
  getAllTasksFromProject,
  changeTaskDescription,
  deleteTaskFromProject,
  generateSampleData,
};
