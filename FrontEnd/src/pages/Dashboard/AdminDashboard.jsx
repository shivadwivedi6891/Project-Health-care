import React, { useEffect, useState } from 'react';
import { useNavigate,Link, useParams } from 'react-router-dom';
import './AdminDashboard.css';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

const AdminDashboard = () => {
  const { id } = useParams();
  const {authData} = useAuth();
  const navigate = useNavigate();


const [adminData , setAdminData] = useState(null);

useEffect(()=>{
    const fetchAdminData = async ()=>{
        try{
             console.log("id is here "+ authData?.id)
            const response = await axios.get(`http://localhost:5088/api/Admin/GetAdminProfile`,
                {

                    headers:{
                        Authorization : `Bearer ${authData?.token}`,
                    },

            }

        );
        console.log("FetchAdmin",response);

        setAdminData(response.data);

        }
        catch(err){
            console.error("unable ro fetch Admin",err);
        }
    };
    fetchAdminData();
}, [authData?.id]);


  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <h1>Welcome  {adminData?.name|| "admin"}</h1>
        <p>Manage users, doctors, hospitals and reports</p>
      </header>

      <main className="admin-main">
        <div className="admin-card">
          <h3>View All Users</h3>
          <Link to={`/allUser/`} className="btn-primary">
                         Manage Profile
                       </Link>
        </div>

        <div className="admin-card">
          <h3>View All Doctors</h3>
           <Link to={`/allDoctors/`} className="btn-primary">
                         See All Doctors
                       </Link>
        </div>

        <div className="admin-card">
          <h3>Manage Hospitals</h3>
           
           <Link to={`/admin/add-hospital/`} className="btn-primary">
                         Manage Hospital
                       </Link>
        
        </div>
        <div className="admin-card">
          <h3>Approve Doctors</h3>
           
           <Link to={`/admin/approve-doctors/`} className="btn-primary">
                         Approve Doctors
                       </Link>
        
        </div>

     
      </main>
    </div>
  );
};

export default AdminDashboard;
