import axios from "axios";
import { API_URL } from "utilities/constants";

export const apiGetDataBoard = async (id) => {
  try {
    const url = `${API_URL}/v1/boards/${id}`;
    const req = axios.get(url);
    return req;
  } catch (error) {
    throw new Error(error).message;
  }
};

export const createNewCreateColumn = async (data) => {
  const req = axios.post(`${API_URL}/v1/columns`, data);
  return req;
};

export const updateColumn = async (id, data) => {
  console.log(id);
  const req = axios.put(`${API_URL}/v1/columns/update/${id}`, data);
  return req;
};

export const createNewCreateCard = async (data) => {
  const req = axios.post(`${API_URL}/v1/cards/`, data);
  return req;
};

export const updateCard = async (id, data) => {
  const req = axios.put(`${API_URL}/v1/cards/update/${id}`, data);
  return req;
};
