import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Low"
  },
  status: {
    type: String,
    enum: ["To Do", "In Progress", "Completed"],
    default: "To Do"
  },
  startDate: Date,
  dueDate: Date,
  assignees: [
    {
      employeeId: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
      assignedOn: { type: Date, default: Date.now }
    }
  ]
});

export default mongoose.model("Task", taskSchema);

