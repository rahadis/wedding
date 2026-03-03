import { API } from "../_api";

// CREATE laporan
export const createEventReport = async (data) => {
  const response = await API.post("/event-reports", data);
  return response.data;
};

// GET semua laporan
export const getEventReports = async () => {
  const response = await API.get("/event-reports");
  return response.data;
};

// GET laporan by id
export const getEventReport = async (id) => {
  const response = await API.get(`/event-reports/${id}`);
  return response.data;
};

// UPDATE laporan
export const updateEventReport = async (id, data) => {
  const response = await API.post(`/event-reports/${id}?_method=PUT`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// DELETE laporan
export const deleteEventReport = async (id) => {
  const response = await API.delete(`/event-reports/${id}`);
  return response.data;
};

// GET laporan by transaksi
export const getEventReportByTransaction = async (transactionId) => {
  const response = await API.get(`/event-reports/${transactionId}`);
  return response.data;
};
