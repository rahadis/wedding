import { API } from "../_api";

// CREATE laporan
export const createEventReport = async (data) => {
  try {
    const response = await API.post("/event-reports", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// GET semua laporan
export const getEventReports = async () => {
  try {
    const response = await API.get("/event-reports");
    return response.data; // sesuaikan dengan struktur backend
  } catch (error) {
    throw error;
  }
};

// GET laporan by transaksi
export const getEventReportByTransaction = async (transactionId) => {
  try {
    const response = await API.get(`/event-reports/${transactionId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};