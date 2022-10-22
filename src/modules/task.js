//
// todo tasks
// object role: information holder
//

export default function Task(description, dueDate = "No Date") {
  this.description = description;
  this.dueDate = dueDate;
  this.status = 0;
}

Task.prototype.getDescription = function () {
  return this.description;
};

Task.prototype.getDate = function () {
  return this.dueDate;
};

Task.prototype.getStatus = function () {
  if (this.status === 0) return "Incomplete";
  else return "Completed";
};

Task.prototype.setDescription = function (description) {
  this.description = description;
};

Task.prototype.setDate = function (date) {
  this.dueDate = date;
};

Task.prototype.toggleStatus = function () {
  this.status = !this.status;
};
