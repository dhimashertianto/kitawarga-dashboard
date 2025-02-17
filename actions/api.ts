// utils/api.ts
import { deleteAuthCookie } from "@/actions/auth.action";
import { BASE_URL } from "@/constants/constants";
import axios from "axios";
import Cookies from "js-cookie";

// Generic function to make GET requests with authentication
export const getData = async (endpoint: string) => {
  const token = Cookies.get("token");

  if (!token) {
    throw new Error("Please Relogin");
  }

  try {
    const { status, data } = await axios.get(`${BASE_URL}${endpoint}`, {
      headers: {
        "x-access-token": token,
      },
      validateStatus: () => true, // To ensure we can handle status codes manually
    });

    if (status === 401) {
      await deleteAuthCookie();
      throw new Error("Unauthorized - Please login again.");
    }

    if (status !== 200) {
      throw new Error(data.message || "An error occurred");
    }

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || `Error fetching data: #${error}`);
    } else {
      throw new Error(`An unknown error occurred: ${error}`);
    }
  }
};

export const fetchData = async <T>(
  endpoint: string,
  payload?: Object
): Promise<T> => {
  const token = Cookies.get("token");

  if (!token) {
    throw new Error("Please relogin");
  }

  try {
    const { status, data } = await axios.post(
      `${BASE_URL}${endpoint}`,
      payload || {},
      { headers: { "x-access-token": token } }
    );

    if (status === 401) {
      await deleteAuthCookie();
      throw new Error("Unauthorized - Please login again.");
    }

    if (status !== 200) {
      throw new Error(data.message || "An error occurred");
    }

    return data;
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : `An unknown error occurred: ${error}`
    );
  }
};
