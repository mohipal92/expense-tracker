import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
});

// Attach token automatically
API.interceptors.request.use((req) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user?.token) {
    req.headers.Authorization = `Bearer ${user.token}`;
  }
  return req;
});

export const createExpense = (data) => API.post("/expenses", data);
export const fetchExpenses = (params) =>
  API.get("/expenses", { params });
