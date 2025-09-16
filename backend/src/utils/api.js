import axios from "axios";

const api = axios.create({
  baseURL: "https://krishnassfooddeliveryapp.onrender.com/api",
  withCredentials: true,
});

export default api;
