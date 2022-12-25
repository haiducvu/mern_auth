import axios from "axios";

const axiosConfig = () => {
  axios.defaults.baseURL = "http://localhost:5000";

  // add a request interceptor
  axios.interceptors.request.use(
    // do something before request is sent
    function (config) {
      // do something before request is sent
      config.headers["Authorization"] =
        "Bearer " + localStorage.getItem("accessToken");
      return config;
    },
    function (error) {
      // do something with request error
      return Promise.reject(error);
    }
  );
};
export default axiosConfig;
