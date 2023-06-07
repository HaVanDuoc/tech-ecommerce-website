import axios from "axios";

const token = localStorage.getItem("access_token");

export default axios.create({
  baseURL:
    process.env.REACT_APP_AXIOS_BASE_URL || "http://localhost:5000/api/v1",
  // timeout: 10000,
  headers: {
    Authorization: token,
  },
});
