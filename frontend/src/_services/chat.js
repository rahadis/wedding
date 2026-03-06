import { API } from "../_api";

export const getChat = async (userId) => {
  const { data } = await API.get(`/chat/${userId}`);
  return data;
};

export const sendUserMessage = async (message) => {
  const { data } = await API.post("/chat/user", { message });
  return data;
};

export const sendAdminMessage = async (userId, message) => {
  const { data } = await API.post(`/chat/admin/${userId}`, { message });
  return data;
};
