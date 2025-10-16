import express from "express";
import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject
  , getProjectTasks
} from "../controllers/projectController.js";

const router = express.Router();


router.post("/", createProject);
router.get("/", getProjects);
router.get("/:id", getProjectById);
router.get("/:id/tasks", getProjectTasks);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);

export default router;
