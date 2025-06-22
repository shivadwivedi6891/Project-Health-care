


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './HospitalPage.css';

const HospitalPage = () => {
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5088/api/Hospital/nearby')
      .then(response => setHospitals(response.data))
      .catch(error => console.error("Error fetching hospitals:", error));
  }, []);

  return (
    <div className="hospital-page">
      <div className="header">
        🏥 Hospital Directory
      </div>

      <div className="hospital-list">
        {hospitals.map(hospital => (
          <div key={hospital.hospitalId} className="hospital-card">
            <div className="hospital-name">{hospital.name}</div>
            <div className="rating">
              <span>★</span> 4.5 rating
            </div>
            <div className="details">📍 {hospital.address}</div>
            <div className="details">📞 {hospital.contactNumber}</div>
            <div className="details">✉️ contact@{hospital.name.toLowerCase().replace(/\s/g, '')}.com</div>

            <div className="specialties">
              <div className="specialties-title">Specialties:</div>
              <div>
                <span className="specialty-badge">Emergency</span>
                <span className="specialty-badge">Cardiology</span>
                <span className="specialty-badge">Orthopedics</span>
              </div>
            </div>

            <div className="contact-buttons">
              <a href={`tel:${hospital.contactNumber}`} className="call-btn">📞 Call</a>
              <a href={`mailto:contact@${hospital.name.toLowerCase().replace(/\s/g, '')}.com`} className="email-btn">✉️ Email</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HospitalPage;
