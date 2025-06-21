


// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import axios from 'axios';
// import { useAuth } from '../../context/AuthContext';
// import './UploadMedicalReport.css';

// const UploadMedicalReport = () => {
//   const { userId } = useAuth();
  

//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     reportName: '',
//     reportFile: null
//   });

//   const [fileName, setFileName] = useState('');
//   const [uploading, setUploading] = useState(false);
//   const [error, setError] = useState('');
//   const [reports, setReports] = useState([]);
//   const [loadingReports, setLoadingReports] = useState(true);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFormData(prev => ({ ...prev, reportFile: file }));
//       setFileName(file.name);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');

//     if (!formData.reportFile) {
//       setError('Please select a file to upload.');
//       return;
//     }

//     setUploading(true);

//     try {
      
//       const token = localStorage.getItem("token");
//       const data = new FormData();
//       data.append('reportName', formData.reportName);
//       data.append('reportFile', formData.reportFile);

//       const response = await axios.post(
//         `http://localhost:5088/api/MedicalReport/upload/${userId}`,
//         data,
//         {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'multipart/form-data',
//           },
//         }
//       );

//       console.log("Upload success:", response.data);
//       navigate(`/dashboard/${userId}`);
//     } catch (err) {
//       console.error('Error uploading report:', err);
//       setError('Authentication error. Please log in again.');
//     } finally {
//       setUploading(false);
//     }
//   };

//   useEffect(() => {
//     const fetchReports = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await axios.get(
//           `http://localhost:5088/api/MedicalReport/userId?userId=${userId}`,
//           {
//             headers: {
//               'Authorization': `Bearer ${token}`,
//             },
//           }
//         );
//         setReports(response.data);
//       } catch (err) {
//         console.error('Error fetching reports:', err);
//         setError('Authentication error. Please log in again.');
//       } finally {
//         setLoadingReports(false);
//       }
//     };

//     if (userId) fetchReports();
//     else setError('Authentication error. Please log in again.');
//   }, [userId]);

//   return (
//     <div className="upload-page">
//       <div className="container upload-container">
//         <motion.div
//           className="upload-card"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           <h2>Upload Medical Report</h2>
//           {error && <div className="error-message">{error}</div>}

//           <form onSubmit={handleSubmit}>
//             <div className="form-group">
//               <label htmlFor="reportName">Report Name</label>
//               <input
//                 id="reportName"
//                 name="reportName"
//                 className="form-control"
//                 value={formData.reportName}
//                 onChange={handleChange}
//                 placeholder="e.g., Blood Test Report"
//                 required
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="reportFile">Report File</label>
//               <div className="file-input-container">
//                 <input
//                   type="file"
//                   id="reportFile"
//                   name="reportFile"
//                   className="file-input"
//                   onChange={handleFileChange}
//                   accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
//                 />
//                 <label htmlFor="reportFile" className="file-label">
//                   {fileName || 'Choose a file'}
//                 </label>
//                 <span className="browse-btn">Browse</span>
//               </div>
//               <small className="form-text">
//                 Accepted: PDF, DOC, DOCX, JPG, JPEG, PNG
//               </small>
//             </div>

//             <div className="form-actions">
//               <button
//                 type="button"
//                 className="btn btn-secondary"
//                 onClick={() => navigate(`/dashboard/${userId}`)}
//                 disabled={uploading}
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="btn btn-primary"
//                 disabled={uploading}
//               >
//                 {uploading ? 'Uploading...' : 'Upload Report'}
//               </button>
//             </div>
//           </form>
//         </motion.div>

//         <h2>View Medical Reports</h2>
//         {loadingReports ? (
//           <p>Loading reports...</p>
//         ) : reports.length === 0 ? (
//           <p>No reports found.</p>
//         ) : (
//           <ul className="report-list">
//             {reports.map((report) => {
//               const fileName = report.reportFilePath?.split('\\').pop();
//               return (
//                 <li key={report.reportId}>
//                   <strong>{report.reportName}</strong> –{' '}
//                   <a
//                     href={`http://localhost:5088/uploads/${fileName}`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     <button className="btn btn-primary">View</button>
//                   </a>
//                 </li>
//               );
//             })}
//           </ul>
//         )}

//         <h2>Analyze Report</h2>
//         {/* Future analysis feature goes here */}
//       </div>
//     </div>
//   );
// };

// export default UploadMedicalReport;




import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import './UploadMedicalReport.css';

const UploadMedicalReport = () => {
  const { user } = useAuth(); // ✅ fixed
  const userId = user?.userId; // ✅ safely extracted

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    reportName: '',
    reportFile: null
  });

  const [fileName, setFileName] = useState('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [reports, setReports] = useState([]);
  const [loadingReports, setLoadingReports] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, reportFile: file }));
      setFileName(file.name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.reportFile) {
      setError('Please select a file to upload.');
      return;
    }

    if (!userId) {
      setError('User not authenticated. Please log in again.');
      return;
    }

    setUploading(true);

    try {
      const token = localStorage.getItem("token");
      const data = new FormData();
      data.append('reportName', formData.reportName);
      data.append('reportFile', formData.reportFile);

      const response = await axios.post(
        `http://localhost:5088/api/MedicalReport/upload/${userId}`, // ✅ userId used correctly
        data,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log("Upload success:", response.data);
      navigate(`/dashboard/${userId}`);
    } catch (err) {
      console.error('Error uploading report:', err);
      setError('Authentication error. Please log in again.');
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `http://localhost:5088/api/MedicalReport/userId?userId=${userId}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          }
        );
        setReports(response.data);
      } catch (err) {
        console.error('Error fetching reports:', err);
        setError('Authentication error. Please log in again.');
      } finally {
        setLoadingReports(false);
      }
    };

    if (userId) fetchReports();
    else setError('Authentication error. Please log in again.');
  }, [userId]);

  return (
    <div className="upload-page">
      <div className="container upload-container">
        <motion.div
          className="upload-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2>Upload Medical Report</h2>
          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="reportName">Report Name</label>
              <input
                id="reportName"
                name="reportName"
                className="form-control"
                value={formData.reportName}
                onChange={handleChange}
                placeholder="e.g., Blood Test Report"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="reportFile">Report File</label>
              <div className="file-input-container">
                <input
                  type="file"
                  id="reportFile"
                  name="reportFile"
                  className="file-input"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
                <label htmlFor="reportFile" className="file-label">
                  {fileName || 'Choose a file'}
                </label>
                <span className="browse-btn">Browse</span>
              </div>
              <small className="form-text">
                Accepted: PDF, DOC, DOCX, JPG, JPEG, PNG
              </small>
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate(`/dashboard/${userId}`)}
                disabled={uploading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={uploading}
              >
                {uploading ? 'Uploading...' : 'Upload Report'}
              </button>
            </div>
          </form>
        </motion.div>

        <h2>View Medical Reports</h2>
        {loadingReports ? (
          <p>Loading reports...</p>
        ) : reports.length === 0 ? (
          <p>No reports found.</p>
        ) : (
          <ul className="report-list">
            {reports.map((report) => {
              const fileName = report.reportFilePath?.split('\\').pop();
              return (
                <li key={report.reportId}>
                  <strong>{report.reportName}</strong> –{' '}
                  <a
                    href={`http://localhost:5088/uploads/${fileName}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="btn btn-primary">View</button>
                  </a>
                </li>
              );
            })}
          </ul>
        )}

        <h2>Analyze Report</h2>
        {/* Future analysis feature goes here */}
      </div>
    </div>
  );
};

export default UploadMedicalReport;

