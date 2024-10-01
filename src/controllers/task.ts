import { Request, Response } from "express";


interface CustomRequest extends Request {
  query: {
    filter?: string; 
  };
}

interface Task {
  task:string;
  status:string
}

const task = async (req: CustomRequest, res: Response): Promise<Response> => {
  try {
    const filter:string = req.query.filter || "all";

    let tasks:Task[] = [
      { task: "task1", status: "completed" },
      { task: "task2", status: "pending" },
      { task: "task3", status: "completed" },
    ];

    // Filter tasks based on the query parameter
    if (filter === "completed") {
      tasks = tasks.filter((task) => task.status === "completed");
    } else if (filter === "pending") {
      tasks = tasks.filter((task) => task.status === "pending");
    }

    return res.status(200).json(tasks);
  } catch (error) {
    console.error(error);

    return res.status(400).json({
      message: "Task retrieval failed",
    });
  }
};


module.exports = task;
