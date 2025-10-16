import mongoose from "mongoose";
import Task from "./task.js";
import Employee from "./employee.js";
import Manager from "./manager.js";

const projectSchema = mongoose.Schema(
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
      default: "Planning",
    },
    startDate: {
      type: Date,
      required: true
    },
    endDate: Date,
    deadline: {
      type: Date,
      required: true
    },
    tasks: [{type: mongoose.Schema.Types.ObjectId, ref: "Task"}],
    employees: [{type: mongoose.Schema.Types.ObjectId, ref: "Employee"}],
    managedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Manager" },
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
