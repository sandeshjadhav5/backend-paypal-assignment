const express = require("express");
const { connection } = require("./configs/db");
const { userRouter } = require("./routes/User.routes");
const { taskRouter } = require("./routes/Tasks.routes");
const { sprintRouter } = require("./routes/Sprint.routes");

const cors = require("cors");

require("dotenv").config();
const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.send("Welcome to Task Planner");
});

app.use("/users", userRouter);
app.use("/tasks", taskRouter);
app.use("/sprints", sprintRouter);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connected to the DB");
  } catch (err) {
    console.log(err);
  }
  console.log(`server running on port : ${process.env.PORT}`);
});
