import TaskList from "./task-list";

const Storage = [];

const addList = (list) => {
  const newList = new TaskList(list);
  Storage.push(newList);
  return newList;
};

const getLists = () => {
  return Storage;
};

const findList = (listTitle) => {
  return Storage.find((list) => {
    return list.name == listTitle;
  });
};

const getTaskFromList = (taskDesc, listTitle) => {
  const taskList = findList(listTitle).tasks;
  const index = taskList.findIndex((task) => task.description === taskDesc);
  return taskList[index];
};

const deleteTaskFromList = (description, listTitle) => {
  const taskList = findList(listTitle);
  taskList.deleteTask(description);
};

const generateSampleData = () => {
  // List #1
  const list = addList("Web Development");
  list.addTask("Finish my todo list project", "11/2/2022");
  list.addTask("Complete Odin Project", "1/1/2023");

  // List #2
  const list2 = addList("Home Renovation");
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
  addList,
  getLists,
  findList,
  getTaskFromList,
  deleteTaskFromList,
  generateSampleData as generateSampleData,
};
