import axios from "axios";

const API = axios.create({
  baseURL: "https://expense-tracker-utnk.onrender.com/api/auth",
});

export const login = (data) => API.post("/login", data);
export const register = (data) => API.post("/register", data);
