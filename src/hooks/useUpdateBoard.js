import axios from "axios";
import { useMutation, queryCache } from "react-query";
import { API_URL } from "utilities/constants";

export const updateBoard = async (id, data) => {
  const req = await axios.put(`${API_URL}/v1/columns/update/${id}`, data);
  return req.data;
};

export default function useUpdateBoard() {
  return useMutation(updateBoard, {
    onSuccess: () => queryCache.refetchQueries("board")
  });
}
