import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:27017:5000/api", // à adapter selon ton backend
});

// Ajouter token JWT à chaque requête si connecté
API.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
