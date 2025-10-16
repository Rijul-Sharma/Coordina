import express from "express";
import {
  createProject,
  getManagerProjects,
  getManagerById,
  getManagerByEmail,
  updateManager,
  deleteManager
} from "../controllers/managerController.js";

const router = express.Router();


router.post("/projects", createProject);
router.get("/projects/:managerId", getManagerProjects);
router.get("/email/:email", getManagerByEmail);
router.put("/:id", updateManager);
router.delete("/:id", deleteManager);

export default router;
