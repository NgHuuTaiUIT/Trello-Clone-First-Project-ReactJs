import axios from "axios";
import { useMutation, queryCache } from "react-query";
import { API_URL } from "utilities/constants";

export const updateColumn = async (id, data) => {
  const req = await axios.put(`${API_URL}/v1/columns/update/${id}`, data);
  return req.data;
};

export default function useUpdateColumn() {
  return useMutation(updateColumn, {
    onSuccess: () => queryCache.refetchQueries("board")
  });
}
