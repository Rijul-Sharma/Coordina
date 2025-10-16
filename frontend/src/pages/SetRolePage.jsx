import React, { useState } from 'react';
import { RedirectToSignIn } from '@clerk/clerk-react';

const SetRolePage = () => {
  const [role, setRole] = useState('');
  const [redirect, setRedirect] = useState(false);

  const handleGo = () => {
    if (role) {
      localStorage.setItem('role', role); // Store role in localStorage
      setRedirect(true);
    }
  };

  if (redirect && role) {
    return <RedirectToSignIn />;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '100px' }}>
      <select value={role} onChange={e => setRole(e.target.value)} style={{ marginBottom: '20px', padding: '8px', fontSize: '16px' }}>
        <option value="">Select Role</option>
        <option value="manager">Manager</option>
        <option value="employee">Employee</option>
      </select>
      <button onClick={handleGo} disabled={!role} style={{ padding: '8px 16px', fontSize: '16px' }}>Go</button>
    </div>
  );
};

export default SetRolePage;
