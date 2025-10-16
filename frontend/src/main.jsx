import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-react';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';

import SetRolePage from './pages/SetRolePage.jsx';
import RoleCheckRedirect from './pages/RoleCheckRedirect.jsx';
const clerkPubKey = "pk_test_Y29uY2lzZS1tYXJ0aW4tODEuY2xlcmsuYWNjb3VudHMuZGV2JA";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={clerkPubKey}>
      <BrowserRouter>
        <SignedIn>
          <RoleCheckRedirect />
          <App />
        </SignedIn>
        <SignedOut>
          <SetRolePage />
        </SignedOut>
      </BrowserRouter>
    </ClerkProvider>
  </StrictMode>
);
