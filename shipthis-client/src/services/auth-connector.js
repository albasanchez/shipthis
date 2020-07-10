import axios from "axios";

const conn = axios.create({
  baseURL: process.env.VUE_APP_AUTH_URL,
  timeout: 10000,
});

export default conn;
