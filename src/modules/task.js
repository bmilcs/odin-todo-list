//
// todo tasks
// object role: information holder
//

export default function Task(description, dueDate = "No Date", status = 0) {
  this.description = description;
  this.dueDate = dueDate;
  this.status = status;
}

Task.prototype.getDescription = function () {
  return this.description;
};

Task.prototype.getDate = function () {
  return this.dueDate;
};

Task.prototype.getStatus = function () {
  return this.status ? "Complete" : "Incomplete";
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
