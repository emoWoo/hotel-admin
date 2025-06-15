import axios from "axios";

const http = axios.create({
  baseURL: "/api",
  timeout: 10000, // 10 seconds timeout
});

http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Token = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// http.interceptors.response.use(
//   (response) => {
//     if (response.data.code !== 200) {
//       return Promise.reject(response.data.message);
//     }
//     return response.data;
//   },
//   (error) => {
//     console.error("请求出错:", error.message);
//     return Promise.reject(error);
//   }
// );
export default http;
