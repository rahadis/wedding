import { API } from "../_api";

// CREATE laporan
export const createEventReport = async (data) => {
  const response = await API.post("/event-reports", data);
  return response.data;
};

// GET semua laporan
export const getEventReports = async () => {
  const response = await API.get("/event-reports");
  return response.data; // sesuaikan dengan struktur backend
};

// GET laporan by transaksi
export const getEventReportByTransaction = async (transactionId) => {
  const response = await API.get(`/event-reports/${transactionId}`);
  return response.data;
};