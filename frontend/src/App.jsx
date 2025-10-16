

import { Routes, Route } from 'react-router-dom';
import ManagerHome from './pages/ManagerHome/ManagerHome.jsx';
import EmpHome from './pages/EmpHome.jsx';
import SetRolePage from './pages/SetRolePage.jsx';




function App() {
  return (
    <Routes>
      <Route path="/" element={<SetRolePage />} />
      <Route path="/manager" element={<ManagerHome />} />
      <Route path="/employee" element={<EmpHome />} />
    </Routes>
  );
}
  
export default App;
