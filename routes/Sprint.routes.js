const express = require("express");

const sprintRouter = express.Router();
const { SprintModel } = require("../models/Sprint.model");

// G E T
sprintRouter.get("/", async (req, res) => {
  try {
    const sprints = await SprintModel.find({});
    res.send(sprints);
  } catch (e) {
    res.status(500).send();
  }
});

// C R E A T E   S P R I N T
sprintRouter.post("/createsprint", async (req, res) => {
  const sprint = new SprintModel(req.body);
  try {
    await sprint.save();
    res.status(201).send(sprint);
  } catch (e) {
    res.status(400).send(e);
  }
});

// G E T   S P R I N T   B Y    I D
sprintRouter.get("/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const sprint = await SprintModel.findById(_id);
    if (!sprint) {
      return res.status(404).send();
    }
    res.send(sprint);
  } catch (e) {
    res.status(500).send();
  }
});

// U P D A T E
sprintRouter.patch("/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["title", "startDate", "endDate", "tasks"];
  const isValidUpdate = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidUpdate) {
    return res.status(400).send({ error: "Invalid update" });
  }

  try {
    const sprint = await SprintModel.findById(req.params.id);
    if (!sprint) {
      return res.status(404).send();
    }

    updates.forEach((update) => {
      sprint[update] = req.body[update];
    });

    await sprint.save();
    res.send(sprint);
  } catch (e) {
    res.status(400).send(e);
  }
});

//  D E L E T E
sprintRouter.delete("/:id", async (req, res) => {
  try {
    const sprint = await SprintModel.findByIdAndDelete(req.params.id);
    if (!sprint) {
      return res.status(404).send();
    }
    res.send(sprint);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = { sprintRouter };
