import React, { useEffect, useState} from 'react'
import PersonInfo from '../components/PersonInfo'
import { useUser } from '@clerk/clerk-react';

function EmpHome() {
  const user = useUser();
  const [employee, setEmployee] = useState(null);
  useEffect(() => {
    
    const fetchEmployees = async () => {
      const email = user.user.emailAddresses[0]?.emailAddress;
      try {
        const response = await fetch(`/api/employees/email/${email}`);
        if (!response.ok) throw new Error('Failed to fetch employees');
        const data = await response.json();
        console.log("Employee data:", data[0].employee);
        setEmployee(data[0].employee);
      } catch (err) {
        console.error(err);
      }
    };
    fetchEmployees();
  }, []);
  return (
    <div>EmpHome
      <div>
        <PersonInfo/>
        {employee && employee.name}
      </div>
      <div>
        <div>
          Performance <br/>
          Skills <br/>
          <ul>
          {employee && employee.skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
          </ul>
          Total Tasks Done: {employee && employee.totalTasks} 
        </div>
        <div>
          Tasks
          <div>
            Assigned
          </div>
          <div>
            Completed
          </div>

        </div>
      </div>
    </div>
  )
}

export default EmpHome