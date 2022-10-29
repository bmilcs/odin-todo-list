import Task from "./task";

//
// todo list: group of task components
// object role: aggregate
//

export default function Project(name) {
  this.name = name;
  this.tasks = [];
}

Project.prototype.getTasks = function () {
  return this.tasks;
};

Project.prototype.getName = function () {
  return this.name;
};

Project.prototype.addTask = function (task, dueDate) {
  this.tasks.push(new Task(task, dueDate));
};

Project.prototype.deleteTask = function (description) {
  const index = this.getIndexForTask(description);
  this.tasks.splice(index, 1);
};

Project.prototype.getIndexForTask = function (description) {
  return this.tasks.findIndex((task) => task.description === description);
};
