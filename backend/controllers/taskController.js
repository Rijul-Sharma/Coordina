import Task from "../models/task.js";
import Project from "../models/project.js";
import Employee from "../models/employee.js";

// Create a new task
export const createTask = async (req, res) => {
  try {
    const { projectId, ...taskData } = req.body;
    const task = new Task(taskData);
    await task.save();

    // Add task to project
    await Project.findByIdAndUpdate(projectId, {
      $push: { tasks: task._id },
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Assign employees to a task
export const assignEmployeesToTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { employeeIds } = req.body;

    const task = await Task.findByIdAndUpdate(
      taskId,
      { $push: { assignees: employeeIds.map(id => ({ employeeId: id })) } },
      { new: true }
    );

    // Update each employee's assignedTasks
    await Employee.updateMany(
      { _id: { $in: employeeIds } },
      { $push: { assignedTasks: { taskId } } }
    );

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single task by ID
export const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a task
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a task
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
