import axios from "axios";

const conn = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
});

export default conn;
