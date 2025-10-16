
import React from 'react';
import { SignOutButton } from '@clerk/clerk-react';

function PersonInfo() {
  return (
    <div>
      PersonInfo
      <div style={{ marginTop: '16px' }}>
        <SignOutButton />
      </div>
    </div>
  );
}

export default PersonInfo