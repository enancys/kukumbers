import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8000", // sesuaikan jika pakai domain lain
});

// Tambahkan token ke setiap permintaan secara otomatis
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token"); // pastikan token disimpan saat login
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
