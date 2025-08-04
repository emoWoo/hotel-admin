import axios from "axios";

const http = axios.create({
  baseURL: "/api",
  timeout: 10000, // 10 seconds timeout
});

http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // 清空 token
      localStorage.removeItem("token");

      // 避免死循环跳转
      if (router.currentRoute.value.path !== "/login") {
        router.push("/login");
      }
    }
    return Promise.reject(error);
  }
);

export default http;
