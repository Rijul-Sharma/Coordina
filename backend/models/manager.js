import mongoose from "mongoose";

const managerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contact: String,
    department: String,
    // role: { type: String, default: "Manager" },
    managedProjects: [
      {
        projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
        startedOn: { type: Date, default: Date.now }
      }
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Manager", managerSchema);
