import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getUserProfile, updateUserProfile } from '../../api/Axios';
import { useAuth } from '../../context/AuthContext';
import './Profile.css';

const Profile = () => {
  const { user } = useAuth();
  const userId = user?.userId;
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    bloodGroup: '',
    allergies: '',
    emergencyContact: '',
  });

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  useEffect(() => {
    if (!userId) {
      navigate('/login');
      return;
    }

    const fetchUserData = async () => {
      try {
        const profile = await getUserProfile(userId);
        setUserData(profile);
        setFormData({
          name: profile.name || '',
          age: profile.age || '',
          bloodGroup: profile.bloodGroup || '',
          allergies: profile.allergies || '',
          emergencyContact: profile.emergencyContact || '',
        });
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Failed to load user data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setUpdating(true);

    try {
      await updateUserProfile(userId, formData);
      setSuccess('Profile updated successfully!');
      setUserData({ ...userData, ...formData });
      setIsEditing(false);
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile. Please try again.');
    } finally {
      setUpdating(false);
    }
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    setError('');
    setSuccess('');
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="profile-page">
      <div className="container profile-container">
        <motion.div
          className="profile-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="profile-header">
            <h2>Your Profile</h2>
            {!isEditing && (
              <button className="btn btn-outline" onClick={toggleEdit}>
                Edit Profile
              </button>
            )}
          </div>

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          {isEditing ? (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
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

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="age">Age</label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    className="form-control"
                    value={formData.age}
                    onChange={handleChange}
                    required
                    min="1"
                    max="120"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="bloodGroup">Blood Group</label>
                  <select
                    id="bloodGroup"
                    name="bloodGroup"
                    className="form-control"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Blood Group</option>
                    {bloodGroups.map((group) => (
                      <option key={group} value={group}>
                        {group}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="allergies">Allergies (if any)</label>
                <textarea
                  id="allergies"
                  name="allergies"
                  className="form-control"
                  value={formData.allergies}
                  onChange={handleChange}
                  rows="2"
                ></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="emergencyContact">Emergency Contact</label>
                <input
                  type="tel"
                  id="emergencyContact"
                  name="emergencyContact"
                  className="form-control"
                  value={formData.emergencyContact}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={toggleEdit}
                  disabled={updating}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={updating}
                >
                  {updating ? 'Updating...' : 'Save Changes'}
                </button>
              </div>
            </form>
          ) : (
            <div className="profile-details">
              <div className="detail-group">
                <span className="detail-label">Name:</span>
                <span className="detail-value">{userData.name}</span>
              </div>

              <div className="detail-row">
                <div className="detail-group">
                  <span className="detail-label">Age:</span>
                  <span className="detail-value">{userData.age}</span>
                </div>
                <div className="detail-group">
                  <span className="detail-label">Blood Group:</span>
                  <span className="detail-value">{userData.bloodGroup}</span>
                </div>
              </div>

              <div className="detail-group">
                <span className="detail-label">Allergies:</span>
                <span className="detail-value">{userData.allergies || 'None'}</span>
              </div>

              <div className="detail-group">
                <span className="detail-label">Emergency Contact:</span>
                <span className="detail-value">{userData.emergencyContact}</span>
              </div>

              <div className="detail-group">
                <span className="detail-label">Email:</span>
                <span className="detail-value">{userData.email}</span>
              </div>

              <button
                className="btn btn-primary btn-block"
                onClick={() => navigate(`/dashboard/${userId}`)}
              >
                Back to Dashboard
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
