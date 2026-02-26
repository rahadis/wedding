import axios from "axios";

const url = "https://eventpora.karyakreasi.id";
// const url = "http://127.0.0.1:8000";

export const API = axios.create({
    baseURL: `${url}/api`
})

export const confirmationImage = `${url}/storage/confirmations`;
export const packagesImage = `${url}/storage/packages`;