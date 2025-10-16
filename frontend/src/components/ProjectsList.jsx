
import React from "react";


const ProjectsList = ({ projects }) => {
	if (!projects) return null;
	if (projects.length === 0) return <div>No projects found.</div>;

	const handleUpdate = async (id) => {
		// Example: update status to 'Completed' (customize as needed)
		await fetch(`/api/projects/${id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ id: id, status: 'Completed' })
		});
		window.location.reload(); 
	};

	const handleDelete = async (id) => {
		await fetch(`/api/projects/${id}`, {
			method: 'DELETE'
		});
		window.location.reload(); 
	};

	return (
		<ul>
			{projects.map((project) => (
				<li key={project._id || project.id} style={{ marginBottom: '16px', borderBottom: '1px solid #eee', paddingBottom: '8px' }}>
					<strong>{project.title}</strong>
					<br />
					{project.description}
					<br />
					Priority: {project.priority}
					<br />
					Status: {project.status}
					<br />
					<button style={{ marginRight: '8px' }} onClick={() => handleUpdate(project._id || project.id)}>Update</button>
					<button style={{ color: 'red' }} onClick={() => handleDelete(project._id || project.id)}>Delete</button>
				</li>
			))}
		</ul>
	);
};

export default ProjectsList;
