import axios from "axios";
const AUTH_API_ROOT = "https://dev-api.mymy.io/v1/login";

export const login = async (data) => {
  const req = await axios.post(`${AUTH_API_ROOT}`, data);
  return req;
};
