import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AllUsers.css' ;
function AllDoctors() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5088/api/Admin/doctors', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUsers(response.data);
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <h2>All Doctors</h2>
      <table>
        <thead>
          <tr><th>ID</th><th>Name</th><th>Email</th><th> Specialization</th></tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.doctorId}>
              <td>{u.doctorId}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u. specialization}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AllDoctors;
