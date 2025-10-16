// Check manager by email
import Manager from "../models/manager.js";
import Project from "../models/project.js";

export const getManagerByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const manager = await Manager.findOne({ email });
    res.status(200).json({ exists: !!manager });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



export const createProject = async (req, res) => {
  try {
    const { managerId, ...projectData } = req.body;
    const project = new Project({ ...projectData, createdBy: managerId });
    await project.save();

    await Manager.findByIdAndUpdate(managerId, {
      $push: { managedProjects: { projectId: project._id } },
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getManagerProjects = async (req, res) => {
  try {
    const { managerId } = req.params;
    const projects = await Project.find({ createdBy: managerId });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getManagerById = async (req, res) => {
  try {
    const { id } = req.params;
    const manager = await Manager.findById(id);
    if (!manager) {
      return res.status(404).json({ message: "Manager not found" });
    }
    res.status(200).json(manager);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const updateManager = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedManager = await Manager.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedManager) {
      return res.status(404).json({ message: "Manager not found" });
    }
    res.status(200).json(updatedManager);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const deleteManager = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedManager = await Manager.findByIdAndDelete(id);
    if (!deletedManager) {
      return res.status(404).json({ message: "Manager not found" });
    }
    res.status(200).json({ message: "Manager deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
