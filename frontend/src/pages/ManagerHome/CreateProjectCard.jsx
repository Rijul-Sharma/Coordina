import React, { useState } from 'react';

const CreateProjectCard = ({ onClose }) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    status: 'Planning',
    startDate: '',
    endDate: '',
    deadline: '',
    createdBy: '',
    tasks: '',
    employees: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Prepare data for backend
    const payload = {
      ...form,
      tasks: form.tasks ? form.tasks.split(',').map(t => t.trim()) : [],
      employees: form.employees ? form.employees.split(',').map(e => e.trim()) : []
    };
    try {
      await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      // Optionally close or reset form here
      onClose();
    } catch (err) {
      console.log("eeeeee", err);
    }
  };

  return (
    <div className="createProjectCard">
      <div className="cardHeader">
        <h2>Create Project</h2>
        <button className="closeBtn" onClick={onClose}>×</button>
      </div>
      <form className="cardForm" onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" name="title" value={form.title} onChange={handleChange} />
        </label>
        <label>
          Description:
          <input type="text" name="description" value={form.description} onChange={handleChange} />
        </label>
        <label>
          Priority:
          <select name="priority" value={form.priority} onChange={handleChange}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </label>
        <label>
          Status:
          <select name="status" value={form.status} onChange={handleChange}>
            <option value="Planning">Planning</option>
            <option value="Development">Development</option>
            <option value="Testing">Testing</option>
            <option value="Deployment">Deployment</option>
            <option value="Completed">Completed</option>
          </select>
        </label>
        <label>
          Start Date:
          <input type="date" name="startDate" value={form.startDate} onChange={handleChange} />
        </label>
        <label>
          End Date:
          <input type="date" name="endDate" value={form.endDate} onChange={handleChange} />
        </label>
        <label>
          Deadline:
          <input type="date" name="deadline" value={form.deadline} onChange={handleChange} />
        </label>
        <label>
          Created By (Employee ID):
          <input type="text" name="createdBy" value={form.createdBy} onChange={handleChange} />
        </label>
        {/* Tasks and employees fields removed as they need not be assigned now */}
        <button type="submit" className="submitBtn">Submit</button>
      </form>
    </div>
  );
};

export default CreateProjectCard;
