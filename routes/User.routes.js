const express = require("express");
const { TaskModel } = require("../models/Task.model");

const { UserModel } = require("../models/User.model");

const userRouter = express.Router();

// N E W   U S E R
userRouter.post("/newuser", async (req, res) => {
  try {
    const user = new UserModel(req.body);
    await user.save();
    res.status(201).send({ msg: "user created", user: user });
  } catch (err) {
    res.status(400).send(err);
  }
});

// G E T     A L L    U S E R S
userRouter.get("/allusers", async (req, res) => {
  try {
    allUsers = await await UserModel.find();
    res.send(allUsers);
  } catch (err) {
    res.status(500).send(err);
  }
});

// G E T   U S E R   B Y  I D
userRouter.get("/:id", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

// U P D A T E   U S E R   D A T A
userRouter.patch("/:id", async (req, res) => {
  const updatedData = Object.keys(req.body);
  const authorizedUpdates = ["name", "email", "tasks"];
  const isAuthorizesUpdate = authorizedUpdates.every((updatedData) =>
    authorizedUpdates.includes(updatedData)
  );

  if (!isAuthorizesUpdate) {
    return res.status(400).send({ error: "Invalid Updates!" });
  }
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) {
      return res.status(404).send();
    }
    updatedData.forEach((el) => (user[el] = req.body[el]));

    if (req.body.tasks) {
      const newTasks = req.body.tasks;
      console.log("newTask", newTasks);
      newTasks.forEach((task) => {
        const newTask = new TaskModel({
          type: task.type,
          name: task.title,
          description: task.description,
          assignee: task.assignee,
          status: task.status,
        });
        user.tasks.push(newTask);
        console.log("user", user);
      });
    }
    await user.save();
    res.send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

// D E L E T E   U S E R
userRouter.delete("/:id", async (req, res) => {
  try {
    const user = await UserModel.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user, "Deleted");
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = { userRouter };
