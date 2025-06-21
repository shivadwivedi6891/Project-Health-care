import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { addHospital } from '../../api/Axios';
import './AdminAddHospital.css';

const AdminAddHospital = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    // latitude: '',
    // longitude: '',
    contactNumber: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSubmitting(true);

    try {
      await addHospital(formData);
      setSuccess('Hospital added successfully!');
      setFormData({
        name: '',
        address: '',
        // latitude: '',
        // longitude: '',
        contactNumber: ''
      });
    } catch (error) {
      console.error('Error adding hospital:', error);
      setError('Failed to add hospital. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="admin-page">
      <div className="container admin-container">
        <motion.div 
          className="admin-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2>Add New Hospital</h2>
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Hospital Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <textarea
                id="address"
                name="address"
                className="form-control"
                value={formData.address}
                onChange={handleChange}
                rows="3"
                required
              ></textarea>
            </div>
            
           
            
            <div className="form-group">
              <label htmlFor="contactNumber">Contact Number</label>
              <input
                type="tel"
                id="contactNumber"
                name="contactNumber"
                className="form-control"
                value={formData.contactNumber}
                onChange={handleChange}
                placeholder="e.g., +1 (555) 123-4567"
                required
              />
            </div>
            
            <div className="form-tip">
              <p>
                <strong>Tip:</strong> You can find latitude and longitude coordinates by searching for the hospital on Google Maps, right-clicking on the location, and selecting "What's here?".
              </p>
            </div>
            
            <button 
              type="submit" 
              className="btn btn-primary btn-block"
              disabled={submitting}
            >
              {submitting ? 'Adding Hospital...' : 'Add Hospital'}
            </button>
          </form>
          
          <div className="admin-footer">
            <button 
              className="btn btn-link"
              onClick={() => navigate('/home')}
            >
              Back to Home
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminAddHospital;