import axios from "axios";

//const url = "https://eventpora.karyakreasi.id";
const url = "http://127.0.0.1:8000";

export const API = axios.create({
    baseURL: `${url}/api`
})
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
export const confirmationImage = `${url}/storage/confirmations`;
export const packagesImage = `${url}/storage/packages`;
export const storageUrl = `${url}/storage`;
