import axios from "axios";

export const getBaseURL = () => {
  const runtimeURL = typeof window !== "undefined" ? window.__ENV?.backendURL : undefined;

  if (runtimeURL && runtimeURL !== "$$BACKEND_URL$$") {
    return runtimeURL;
  }

  const buildURL = import.meta.env.VITE_BACKEND_URL;
  if (buildURL && buildURL !== "$$BACKEND_URL$$") {
    return buildURL;
  }

  return undefined;
};

export const axiosClient = axios.create({
  baseURL: getBaseURL(),
  timeout: 20_000,
  withCredentials: true,
});
