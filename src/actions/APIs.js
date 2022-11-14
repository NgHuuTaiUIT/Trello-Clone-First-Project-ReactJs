import axios from "axios";
import { API_URL } from "utilities/constants";

// export const apiGetDataBoard = async (id = "6180fe0d0ce3303fe2a94359") => {
//   try {
//     const url = `${API_URL}/v1/boards/${id}`;
//     const req = await axios.get(url);
//     return req.data;
//   } catch (error) {
//     throw new Error(error).message;
//   }
// };

export const apiGetDataBoard = async (id = "61cbf9ee1589c242f7f4bb6c") => {
  try {
    const url = `${API_URL}/v1/boards/${id}`;
    const req = await axios.get(url);
    return req.data;
  } catch (error) {
    throw new Error(error).message;
  }
};

export const updateBoard = async (id, data) => {
  const req = await axios.put(`${API_URL}/v1/boards/${id}`, data);
  return req.data;
};

export const createNewColumn = async data => {
  const req = await axios.post(`${API_URL}/v1/columns`, data);
  return req.data;
};

export const updateColumn = async (id, data) => {
  const req = await axios.put(`${API_URL}/v1/columns/update/${id}`, data);
  return req.data;
};

export const createNewCard = async data => {
  const req = await axios.post(`${API_URL}/v1/cards`, data);
  return req.data;
};

export const updateCard = async (id, data) => {
  const req = await axios.put(`${API_URL}/v1/cards/update/${id}`, data);
  return req.data;
};
