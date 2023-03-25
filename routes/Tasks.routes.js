const express = require("express");
const taskRouter = express.Router();
const { TaskModel } = require("../models/Task.model");

//G E T    T A S K S
taskRouter.get("/", async (req, res) => {
  try {
    const tasks = await TaskModel.find();
    res.send(tasks);
  } catch (err) {
    res.status(500).send(err);
  }
});

// C R E A T E    T A S K
taskRouter.post("/createtask", async (req, res) => {
  try {
    const task = new TaskModel(req.body);
    await task.save();
    res.status(201).send(task);
  } catch (err) {
    res.status(400).send(err);
  }
});

// G E T   T A S K   B Y    I D
taskRouter.get("/:id", async (req, res) => {
  try {
    const task = await TaskModel.findById(req.params.id);
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (err) {
    res.status(500).send(err);
  }
});

// U P D A T E   T A S K
taskRouter.patch("/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "name",
    "description",
    "status",
    "assignee",
    "type",
    "sprintId",
  ];
  const isValidUpdate = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidUpdate) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const task = await TaskModel.findById(req.params.id);
    if (!task) {
      return res.status(404).send();
    }
    updates.forEach((update) => (task[update] = req.body[update]));
    await task.save();
    res.send(task);
  } catch (err) {
    res.status(400).send(err);
  }
});

// D E L E T E    T A S K
taskRouter.delete("/:id", async (req, res) => {
  try {
    const task = await TaskModel.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = { taskRouter };
