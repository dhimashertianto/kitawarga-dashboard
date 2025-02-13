import { deleteAuthCookie } from "@/actions/auth.action";
import { BASE_URL } from "@/constants/constant";
import axios from "axios";
import Cookies from "js-cookie";
import Router from "next/router";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");

    if (token) {
      config.headers["x-access-token"] = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 401) {
      await deleteAuthCookie();
      Router.replace("/login");
    }
    return error;
  }
);

export default api;
