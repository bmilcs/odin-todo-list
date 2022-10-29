import { endOfMonth, endOfWeek, isBefore, addDays, parseISO } from "date-fns";
import Project from "./project";
import Task from "./task";

const Storage = [];

// DATA STRUCTURE:
//
// Storage = [
//  Project {
//    name: Project Name
//    tasks: [
//      Task {
//        description: Task description
//        dueDate: ...
//        getDescription()
//      }
//    ]
//  }
// ]

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

const isProjectEmpty = (projectName) => {
  return getAllTasksFromProject(projectName).length === 0 ? true : false;
};

const deleteProject = (projectName) => {
  const index = Storage.findIndex((project) => project.name === projectName);
  Storage.splice(index, 1);
  saveToLocalStorage();
};

const getATaskFromProject = (description, projectName) => {
  const tasksArray = getProjectObj(projectName).tasks;
  const index = tasksArray.findIndex(
    (task) => task.description === description
  );
  return tasksArray[index];
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

  // recreate the same data structure, filtering tasks by date
  // create a new array: filteredStorage[] > filteredProject{}.tasks[] > filteredTasks{}
  const filteredStorage = Storage.reduce((filteredStorage, project) => {
    // tasks []: contains Task objects
    const allTasks = project.tasks;
    // remove any tasks that aren't before the date restriction
    const filteredTasks = allTasks.filter((task) => {
      const parsedDuedate = parseISO(task.dueDate);
      return isBefore(parsedDuedate, dateRestriction);
    });
    // if no tasks remain, return without adding the project to the new array
    if (filteredTasks.length === 0) {
      return filteredStorage;
    }
    // filtered tasks exist: recreate the Project w/ filtered tasks
    const filteredProject = {};
    filteredProject.name = project.getName();
    filteredProject.tasks = [...filteredTasks];
    // add the project to the new filteredStorage
    filteredStorage.push(filteredProject);
    return filteredStorage;
  }, []);
  return filteredStorage;
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
  list.addTask("Lorem ipsum2", "2022-10-29");
  list.addTask("Lorem ipsum", "2022-10-30");

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
  getTasksFilteredByDate,
  isProjectEmpty,
  deleteProject,
};
