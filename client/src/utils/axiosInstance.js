import axios from "axios";

const token = localStorage.getItem("access_token");

export default axios.create({
  baseURL: "http://localhost:4000/api/v1",
  timeout: 10000,
  headers: {
    Authorization: token,
  },
});
