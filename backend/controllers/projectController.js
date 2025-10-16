import Project from "../models/project.js";


export const createProject = async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const updateProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const updatedProject = await Project.findByIdAndUpdate(projectId, req.body, { new: true });
    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProject = await Project.findByIdAndDelete(id);
    if (!deletedProject) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getProjectTasks = async (req, res) => {
  try {
    const { id } = req.params;
  
    const project = await Project.findById(id).populate({
      path: 'tasks',
      select: 'title description dueDate startDate priority assignees'
    });

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }


    const tasks = (project.tasks || []).map((t) => ({
      id: t._id,
      title: t.title,
      description : t.description,
      deadline: t.dueDate,
      startDate: t.startDate,
      priority: t.priority,
      employeeNum: Array.isArray(t.assignees) ? t.assignees.length : 0,
    }));

    res.status(200).json({ projectId: project._id, tasks });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
