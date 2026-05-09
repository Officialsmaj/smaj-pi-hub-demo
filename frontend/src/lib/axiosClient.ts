import axios from "axios";

const DEFAULT_LOCAL_BACKEND_URL = "http://localhost:8000";

export const getBaseURL = () => {
  const runtimeURL = typeof window !== "undefined" ? window.__ENV?.backendURL : undefined;

  if (runtimeURL && runtimeURL !== "$$BACKEND_URL$$") {
    return runtimeURL;
  }

  const buildURL = import.meta.env.VITE_BACKEND_URL;
  if (buildURL && buildURL !== "$$BACKEND_URL$$") {
    return buildURL;
  }

  if (import.meta.env.DEV) {
    return DEFAULT_LOCAL_BACKEND_URL;
  }

  if (typeof window !== "undefined") {
    const host = window.location.hostname;
    if (host === "localhost" || host === "127.0.0.1") {
      return DEFAULT_LOCAL_BACKEND_URL;
    }
  }

  return undefined;
};

export const axiosClient = axios.create({
  baseURL: getBaseURL(),
  timeout: 20_000,
  withCredentials: true,
});
