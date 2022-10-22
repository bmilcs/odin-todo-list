import Task from "./task"

//
// todo list: group of task components
// object role: aggregate
//

export default function TaskList(name) {
  this.name = name;
  this.tasks = [];
}

TaskList.prototype.getTasks = function() {
  return this.tasks;
}

TaskList.prototype.getName = function() {
  return this.name;
}

TaskList.prototype.addTask = function(task, dueDate) {
  this.tasks.push(new Task(task, dueDate));
}

TaskList.prototype.deleteTask = function(index) {
  this.tasks.splice(index, 1);
}

