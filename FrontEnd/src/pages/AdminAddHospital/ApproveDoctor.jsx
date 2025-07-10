import React, { useEffect } from 'react'
import './ApproveDoctor.css';
import { useState } from 'react';
import axios from 'axios';

const ApproveDoctor = () => {

    const[doctors,setDoctors]= useState([]);

    useEffect(()=>{
           const fetchDoctor = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5088/api/Admin/unapproved-doctors', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setDoctors(response.data);
    };
    fetchDoctor();
  }, []);
  return (
   <div >
    <h1>Approve Doctor</h1>
    <div className="unApproved">
        <h2>See UnApproved Doctors</h2>

        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Status</th>

                </tr>
            </thead>
            <tbody>
                {
                    doctors.map(d=>(
                        <tr key={d.doctorId}>
                            <td> {d.doctorId}</td>
                            <td> {d.name}</td>
                            <td> {d.email}</td>
                            <td>{d.isApproved ? 'Approved' : 'Not Approved'}</td>
                        </tr>

                    ))}
            </tbody>
        </table>


    </div>

    <div className="Approvel">
        <h1>
            Approve Doctors
        </h1>
    </div>
   </div>
   
  )
}

export default ApproveDoctor
