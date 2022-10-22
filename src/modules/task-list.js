import Task from "./task";

//
// todo list: group of task components
// object role: aggregate
//

export default function TaskList(name) {
  this.name = name;
  this.tasks = [];
}

TaskList.prototype.getTasks = function () {
  return this.tasks;
};

TaskList.prototype.getLastTask = function () {
  return this.tasks[this.tasks.length - 1];
};

TaskList.prototype.getName = function () {
  return this.name;
};

TaskList.prototype.addTask = function (task, dueDate) {
  this.tasks.push(new Task(task, dueDate));
};

TaskList.prototype.deleteTask = function (description) {
  const index = this.getIndexForTask(description);
  this.tasks.splice(index, 1);
};

TaskList.prototype.getIndexForTask = function (description) {
  return this.tasks.findIndex((task) => task.description === description);
};
