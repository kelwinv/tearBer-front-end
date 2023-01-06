import axios from "axios";

const Api = axios.create({
  baseURL: process.env.BASE_URL_API
});

export { Api };
