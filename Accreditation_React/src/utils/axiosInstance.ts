import axios from "axios";
import { HOST_API_KEY } from "./globalConfig";

const token = localStorage.getItem("accessToken");
const axiosInstance = axios.create({
  baseURL: HOST_API_KEY,
  timeout: 1000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    // Do something before request is sent

    config.headers["Authorization"] = "Bearer " + token;
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response) || "General Axios Error happend"
    )
);

export default axiosInstance;
