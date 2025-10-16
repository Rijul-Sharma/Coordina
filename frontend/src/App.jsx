<<<<<<< HEAD
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Project from './pages/Project'
import './App.css'
=======


import { Routes, Route } from 'react-router-dom';
import ManagerHome from './pages/ManagerHome/ManagerHome.jsx';
import EmpHome from './pages/EmpHome.jsx';
import SetRolePage from './pages/SetRolePage.jsx';



>>>>>>> c094aa8 (changes)

function App() {
  return (
<<<<<<< HEAD
    <>
      {/* <div>Helloooo</div> */}
      {/* <ManagerHome /> */}
      <Project />
    </>
  )
=======
    <Routes>
      <Route path="/" element={<SetRolePage />} />
      <Route path="/manager" element={<ManagerHome />} />
      <Route path="/employee" element={<EmpHome />} />
    </Routes>
  );
>>>>>>> c094aa8 (changes)
}
  
export default App;
