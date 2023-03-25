const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["New", "In Progress", "Done"],
    default: "New",
  },
  assignee: {
    type: mongoose.Schema.Types.ObjectId,
  },
  type: {
    type: String,
    enum: ["bug", "feature", "story"],
    required: true,
  },
  sprintId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "sprint",
  },
});

const TaskModel = mongoose.model("task", taskSchema);

module.exports = {
  TaskModel,
};
