import express from "express";
import {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  filterEmployees,
  getEmployeeByEmail,
} from "../controllers/employeeController.js";
import { get } from "mongoose";

const router = express.Router();

router.post("/", createEmployee);
router.get("/", getEmployees);
router.get("/filter", filterEmployees);
router.get("/email/:email", getEmployeeByEmail); 
router.get("/:id", getEmployeeById);
router.put("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);

export default router;
