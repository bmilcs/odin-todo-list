//
// todo tasks
// object role: information holder
//

export default function Task(task, dueDate = 'No Date') {
  this.task = task;
  this.dueDate = dueDate;
  this.status = 0;
}

Task.prototype.getTask = function() {
  return this.task;
}

Task.prototype.getDate = function() {
  return this.dueDate;
}

Task.prototype.getStatus = function() {
  if (this.status === 0) return "Incomplete";
  else return "Completed";
}

Task.prototype.setTask = function(task) {
  this.task = task;
}

Task.prototype.setDate = function(date) {
  this.dueDate = date;
}

Task.prototype.toggleStatus = function() {
  this.status = !this.status;
}

