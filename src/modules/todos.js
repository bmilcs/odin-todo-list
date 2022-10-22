import TaskList from "./task-list";

const todoData = [];

const addList = (list) => {
  todoData.push(list);
};

const getLists = () => {
  return todoData;
};

const findList = (title) => {
  return todoData.find((list) => {
    return list.name == title;
  });
};

const addSampleData = () => {
  const list = new TaskList("Default List");
  list.addTask("Finish my todo list project", "11/2/2022");
  list.addTask("Complete Odin Project", "1/1/2023");
  addList(list);
};

export { addList, getLists, findList, addSampleData };
