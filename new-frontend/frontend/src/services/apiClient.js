const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api"
).replace(/\/$/, "");

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export const apiRequest = async (path, options = {}) => {
  const token = sessionStorage.getItem("iot_token") || localStorage.getItem("iot_token");
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      Accept: "application/json",
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  const payload = await response.json().catch(() => null);
  if (!response.ok) {
    throw new ApiError(
      payload?.message || payload?.error || `Request failed (${response.status})`,
      response.status,
    );
  }
  return payload;
};

export const getDatasetSeries = (datasetName, { signal } = {}) =>
  apiRequest(`/datasets/${encodeURIComponent(datasetName)}/series`, { signal });
