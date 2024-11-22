import axios from "axios";

export const API_URL = axios.create({ baseURL: "http://localhost:3000" });
export const apiTerceros = axios.create({
  baseURL: "https://api-terceros.com",
});
