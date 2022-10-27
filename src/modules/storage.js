import Project from "./project";
import Task from "./task";

const Storage = [];

const saveToLocalStorage = () => {
  localStorage.setItem("bmilcs-todolist", JSON.stringify(Storage));
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

const changeTaskDueDate = (date, description, projectName) => {
  const task = getATaskFromProject(description, projectName);
  task.setDate(date);
  saveToLocalStorage();
};

// data structure:
// Storage = [
//  Project {
//    name: Project Name
//    tasks: [
//      Task {
//        description: Task description
//        dueDate: ...
//        getDescription()
//      } task obj
//    ] tasks array
//  } project obj
// ] storage array

const loadProjects = () => {
  if (localStorage.getItem("bmilcs-todolist") !== null) {
    const importedData = JSON.parse(localStorage.getItem("bmilcs-todolist"));
    const reassembledProjectObjects = importedData.map((project) => {
      // localStorage strips away prototype methods & constructor function
      // convert Storage[] > Project.tasks[] > task{} to Task objects
      // in order to regain its prototype methods
      const tasksWithPrototype = project["tasks"].map((task) => {
        return new Task(task.description, task.dueDate, task.status);
      });
      // convert Storage[] > project{} to Project objects to regain its
      // prototype methods & constructor function
      const projectWithPrototype = Object.assign(new Project(project.name));
      // reassmble the final data structure:
      projectWithPrototype.tasks = tasksWithPrototype;
      return projectWithPrototype;
    });
    reassembledProjectObjects.forEach((project) => Storage.push(project));
  } else {
    generateSampleData();
  }
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
  loadProjects,
  changeTaskDescription,
  deleteTaskFromProject,
  changeTaskDueDate,
  generateSampleData,
};
