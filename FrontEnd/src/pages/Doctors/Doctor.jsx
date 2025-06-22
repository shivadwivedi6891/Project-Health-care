


import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Doctor.css";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("http://localhost:5088/api/Doctor/getAllDoctor");
        setDoctors(response.data);
      } catch (error) {
        console.error("Failed to fetch doctors", error);
      }
    };

    fetchDoctors();
  }, []);

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="doctor-page">
      <h1 className="doctor-title">Available Doctors</h1>
      <p className="doctor-subtitle">Find and connect with healthcare professionals</p>

      <div className="doctor-search-container">
        <input
          type="text"
          placeholder="Search doctors by name or specialization..."
          className="doctor-search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="doctor-list">
        {filteredDoctors.map((doctor) => (
          <div className="doctor-row" key={doctor.doctorId}>
            <div className="doctor-info">
              <span className="icon">👤</span>
              <div>
                <h2>{doctor.name}</h2>
                <p><strong>Specialization:</strong> {doctor.specialization}</p>
                <p><strong>Email:</strong> {doctor.email}</p>
                <p><strong>Joined:</strong> {new Date(doctor.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}</p>
              </div>
            </div>
            <div className="doctor-buttons">
              <button className="btn primary">View Profile</button>
              <button className="btn secondary">Contact Doctor</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Doctors;
