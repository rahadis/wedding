import { API } from "../_api";

export const getPackages = async () => {
  const { data } = await API.get("/packages");
  return data.data;
};

export const createPackages = async (data) => {
  try {
    const response = await API.post("/packages", data, {
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

export const showPackages = async (id) => {
  try {
    const { data } = await API.get(`/packages/${id}`);
    return data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updatePackages = async (id, data) => {
  try {
    const response = await API.post(`/packages/${id}`, data, {
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

export const deletePackages = async (id) => {
  try {
    await API.delete(`/packages/${id}`, {
      headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
