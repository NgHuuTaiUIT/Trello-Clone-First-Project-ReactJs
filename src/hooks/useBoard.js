import { useQuery } from "react-query";
import axios from "axios";
import { API_URL } from "utilities/constants";

export const fetchBoard = async (id = "61cbf9ee1589c242f7f4bb6c") => {
  try {
    const url = `${API_URL}/v1/boards/${id}`;
    const req = await axios.get(url);
    return req.data;
  } catch (error) {
    throw new Error(error).message;
  }
};

export default function useBoard(boardId, { onSuccess, onError }) {
  return useQuery(boardId && ["board", boardId], () => fetchBoard(boardId), {
    onSuccess,
    onError
  });
}
