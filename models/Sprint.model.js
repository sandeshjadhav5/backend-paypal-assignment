const mongoose = require("mongoose");

const sprintSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  start_Date: {
    type: Date,
    required: true,
  },
  end_Date: {
    type: Date,
    required: true,
  },
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "task",
    },
  ],
});

const SprintModel = mongoose.model("sprint", sprintSchema);

module.exports = { SprintModel };
