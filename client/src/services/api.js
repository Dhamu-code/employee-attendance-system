import axios from "axios";

const API = axios.create({
  baseURL: "https://employee-attendance-system-wqyr.onrender.com/api",
});

API.interceptors.request.use(
  (req) => {
    const auth = localStorage.getItem("auth");

    if (!req.headers) req.headers = {};

    if (auth) {
      const token = JSON.parse(auth).token;
      req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
  },
  (error) => Promise.reject(error)
);

export default API;
