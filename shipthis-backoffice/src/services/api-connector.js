import axios from "axios";

const baseDomain = process.env.VUE_APP_API_URL;

const conn = axios.create({
  baseURL: baseDomain, //|| "http://localhost:3000/shipthisapi/v1",
  timeout: 10000,
});

conn.interceptors.response.use((response) => response.data);

export default conn;
