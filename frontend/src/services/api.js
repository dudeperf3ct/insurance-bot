import axios from 'axios';

const API_BASE_URL = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_API_URL : 'http://localhost:8000';


export async function uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post(`${API_BASE_URL}/analyse_doc`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });

    return response.data.task_id;
}

export async function getAnalysisStatus(taskId) {
    const response = await axios.get(`${API_BASE_URL}/status/${taskId}`);
    return response.data;
}

export async function sendMessage(taskId, message) {
    const response = await axios.post(`${API_BASE_URL}/chat/${taskId}`, null, {
        params: { query: message }
    });
    console.log(response.data)
    return response.data;
}
