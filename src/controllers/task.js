const db = require("../config/db");

const task = async (req, res) => {
  try {
    const filter = req.query.filter || "all";

    let tasks = [
      { task: "task1", status: "completed" },
      { task: "task2", status: "pending" },
      { task: "task3", status: "completed" },
    ];

    if (filter === "completed") {
      tasks = tasks.filter((task) => task.status === "completed");
    } else if (filter === "pending") {
      tasks = tasks.filter((task) => task.status === "pending");
    }

    res.status(200).json(tasks);
  } catch (error) {
    console.log(error);

    res.status(400).json({
      message: "task send failed",
    });
  }
};

module.exports = task;
