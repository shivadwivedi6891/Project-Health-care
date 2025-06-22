import axios from "axios";

const API_BASE = "http://localhost:5088/api";


const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};



export const getUserProfile = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE}/User/GetProfile/`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

export const updateUserProfile = async ( data) => {
  try {
    const response = await axios.put(`${API_BASE}/User/updateProfile/`, data, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
};



export const getEmergencyQR = async () => {
  try {
    const response = await axios.get(`${API_BASE}/Emergency/qr/`, {
      ...getAuthHeaders(),
      responseType: "blob",
    });
    return URL.createObjectURL(response.data);
  } catch (error) {
    console.error("Error fetching emergency QR code:", error);
    throw error;
  }
};



export const addHospital = async (data) => {
  try {
    const response = await axios.post(`${API_BASE}/Hospital/add`, data, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Error adding hospital:", error);
    throw error;
  }
};



export const uploadMedicalReport = async (userId, formData) => {
  try {
    const response = await axios.post(`${API_BASE}/MedicalReport/upload/${userId}`, formData, {
      ...getAuthHeaders(),
      headers: {
        ...getAuthHeaders().headers,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error uploading medical report:", error);
    throw error;
  }
};

export const getMedicalReport = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE}/MedicalReport/userId?userId=${userId}`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Error fetching medical reports:", error);
    throw error;
  }
};

