import Task from "../models/task.js";
import Project from "../models/project.js";
import Employee from "../models/employee.js";


export const createTask = async (req, res) => {
  try {
    const { projectId, startDate, status, ...taskData } = req.body;
    if (!projectId) return res.status(400).json({ message: 'projectId is required' });

    const taskPayload = {
      ...taskData,
      projectId,
      startDate: startDate || Date.now(),
      status: status || 'In Progress'
    }

    const task = new Task(taskPayload)
    await task.save()

    const updated = await Project.findByIdAndUpdate(projectId, { $push: { tasks: task._id } })
    if (!updated) {
      // cleanup
      await Task.findByIdAndDelete(task._id).catch(() => {})
      return res.status(404).json({ message: 'Project not found' })
    }

    res.status(201).json(task)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
};


export const assignEmployeesToTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { employeeIds } = req.body;

    const task = await Task.findByIdAndUpdate(
      taskId,
      { $push: { assignees: employeeIds.map(id => ({ employeeId: id })) } },
      { new: true }
    );


    await Employee.updateMany(
      { _id: { $in: employeeIds } },
      { $push: { assignedTasks: { taskId } } }
    );

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


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
