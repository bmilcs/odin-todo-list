import TaskList from "./task-list";

const prepSampleList = () => {
  const list = new TaskList("Default");
  list.addTask("Finish my todo list project", "11/2/2022");
  list.addTask("Complete Odin Project", "1/1/2023");
  return list;
}

const list = prepSampleList();
export default list;
