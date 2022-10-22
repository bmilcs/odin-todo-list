import TaskList from "./task-list";

const Storage = [];

const addList = (list) => {
  Storage.push(list);
};

const getLists = () => {
  return Storage;
};

const findList = (listTitle) => {
  return Storage.find((list) => {
    return list.name == listTitle;
  });
};

const findTaskInList = (taskDesc, listTitle) => {
  const taskList = findList(listTitle).tasks;
  const index = taskList.findIndex((task) => task.description == taskDesc);
  return taskList[index];
};

const addSampleData = () => {
  const list = new TaskList("Default List");
  list.addTask("Finish my todo list project", "11/2/2022");
  list.addTask("Complete Odin Project", "1/1/2023");
  addList(list);
};

export { addList, getLists, findList, findTaskInList, addSampleData };
