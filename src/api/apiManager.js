import axios from "axios";

const API_URL = "http://localhost:8080";

const ApiManager = axios.create({
  baseURL: API_URL,
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
  },
});

export default ApiManager;