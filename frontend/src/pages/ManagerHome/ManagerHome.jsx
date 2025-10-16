
import React, { useEffect, useState } from 'react';
import PersonInfo from '../../components/PersonInfo';
import ProjectsList from '../../components/ProjectsList';

import CreateProjectCard from './CreateProjectCard';

const ManagerHome = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateCard, setShowCreateCard] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        if (!response.ok) throw new Error('Failed to fetch projects');
        const data = await response.json();
        setProjects(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [showCreateCard]);


  function handleCreate() {
    setShowCreateCard(true);
  }

  function handleCloseCreateCard() {
    setShowCreateCard(false);
  }

  const activeProjects = projects.filter(p => p.status !== 'Completed');
  const completedProjects = projects.filter(p => p.status === 'Completed');
  console.log("Projects:", activeProjects)

  return (
    <div className="main">
      <div className="personInfo">
        <PersonInfo/>
      </div>
      <div style={{ flex: 1, position: 'relative' }}>
        <div className="projectTitle">Projects</div>
        <div style={{ marginBottom: '20px' }}>
          <button className="createBtn" onClick={handleCreate}>Create</button>
        </div>
        {showCreateCard && (
          <CreateProjectCard onClose={handleCloseCreateCard} />
        )}
        <div style={{ display: 'flex', gap: '40px' }}>
          <div className="projectSection">
            <div className="sectionTitle activeTitle">Active</div>
            {loading ? <div>Loading projects...</div> : error ? <div>Error: {error}</div> : <ProjectsList projects={activeProjects} />}
          </div>
          <div className="projectSection">
            <div className="sectionTitle completedTitle">Completed</div>
            {loading ? <div>Loading projects...</div> : error ? <div>Error: {error}</div> : <ProjectsList projects={completedProjects} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerHome;