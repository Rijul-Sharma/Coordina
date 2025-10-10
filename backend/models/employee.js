import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contact: String,
    // position: { type: String, default: "Employee" },
    skills: [String],
    department : String,
    // availability: { type: Number, default: 1.0 }, // 1.0 = fully available
    isActive: { type: Boolean, default: true },
    assignedTasks: [
      {
        projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Task" },
        assignedOn: { type: Date, default: Date.now }
      }
    ],
    totalTasks: Number,
    onTimeCompletions : Number
  },
  { timestamps: true }
);

export default mongoose.model("Employee", employeeSchema);