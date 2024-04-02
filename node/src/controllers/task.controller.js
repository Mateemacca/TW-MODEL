import Task from "../models/task.model.js";

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).populate("user");
    res.json(tasks);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const createTask = async (req, res) => {
  try {
    const { title, description, date } = req.body;
    const newTask = new Task({
      user: req.user.id,
      title,
      description,
      date,
    });
    const savedTask = await newTask.save();
    res.json(savedTask);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getTask = async (req, res) => {
  const { id } = req.params;
  try {
    const taskFound = await Task.findById(id).populate("user");
    if (!taskFound) return res.status(404).send({ message: "Task not found" });
    res.json(taskFound);
  } catch (error) {
    return res.status(404).json({ message: "Task Not Found" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const taskFound = await Task.findByIdAndDelete(id);
    if (!taskFound) return res.status(404).send({ message: "Task not found" });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(404).json({ message: "Task Not Found" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const taskFound = await Task.findByIdAndUpdate(id, req.body, { new: true });
    if (!taskFound) return res.status(404).send({ message: "task not found" });
    res.json(taskFound);
  } catch (error) {
    return res.status(404).json({ message: "Task Not Found" });
  }
};
