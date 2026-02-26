import { API } from "../_api";

export const getConfirmations = async () => {
  const { data } = await API.get("/confirmations", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
  return data.data;
};

export const createConfirmations = async (data) => {
  try {
    const response = await API.post("/confirmations", data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const showConfirmations = async (id) => {
  try {
    const { data } = await API.get(`/confirmations/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateConfirmations = async (id, data) => {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await API.post(`/confirmations/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      },
    });

    return response.data;
  } catch (error) {
    console.log(error.response?.data || error.message);
    throw error;
  }
};


export const deleteConfirmations = async (id) => {
  try {
    await API.delete(`/confirmations/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
