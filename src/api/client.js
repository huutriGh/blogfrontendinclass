import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/",
  withCredentials: true,
  auth: {
    username: "user",
    password: "password",
  },
});

export default instance;
