import { useUser } from '@clerk/clerk-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClerk } from '@clerk/clerk-react';

const RoleCheckRedirect = () => {
    const { signOut } = useClerk();
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && user) {
      const role = localStorage.getItem('role');
      
      const clerkId = user.emailAddresses[0]?.emailAddress;
      console.log("Clerk ID:", clerkId);
      if (role === 'manager') {
        fetch(`/api/managers/email/${clerkId}`)
          .then(res => res.json())
          .then(async data => {
            if (data.exists) navigate('/manager');
            else {
                await signOut();
                navigate('/');

            }
          });
      } else if (role === 'employee') {
        fetch(`/api/employees/email/${clerkId}`)
          .then(res => res.json())
          .then(async data => {
            if (data[1].exists) navigate('/employee');
            else {
                await signOut();
                navigate('/');
            }
          });
      }
    }
  }, [isLoaded, user, navigate]);

  return null;
};

export default RoleCheckRedirect;
