import mongoose from "mongoose";
import taskSchema from "./task.model.js";
import employeeSchema from "./employee.js"

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium"
    },
    status: {
      type: String,
      enum: ["Planning", "Development", "Testing", "Deployment", "Completed"],
      default: "Planning"
    },
    startDate: Date,
    endDate: Date,
    deadline: Date,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
    tasks: [taskSchema],
    employees: [employeeSchema]
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
