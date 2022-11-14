import axios from "axios";

import { useMutation, queryCache, useQueryClient } from "react-query";
import { API_URL } from "utilities/constants";

export const addNewColumn = async data => {
  const req = await axios.post(`${API_URL}/v1/columns`, data);
  return req.data;
};

export default function useAddColumn() {
  const queryClient = useQueryClient();
  return useMutation(addNewColumn, {
    onSuccess: data => {
      queryClient.refetchQueries("board");
      queryClient.setQueryData("board", oldData => {
        return {
          ...oldData,
          data: [...oldData.data, data.data]
        };
      });
    }
  });
}
