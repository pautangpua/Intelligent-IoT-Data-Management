import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

const authClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const loginUser = async ({ username, password }) => {
  const response = await authClient.post("/login", {
    username,
    password,
  });

  return response.data;
};

export const verifyTwoFactorCode = async ({ email, otp, tempToken }) => {
  const response = await authClient.post("/auth/verify-2fa", {
    email,
    otp,
    tempToken,
  });

  return response.data;
};

export const resendTwoFactorCode = async ({ email, tempToken }) => {
  const response = await authClient.post("/auth/resend-2fa", {
    email,
    tempToken,
  });

  return response.data;
};

export const registerUser = async ({ username, password }) => {
  const response = await authClient.post("/register", {
    username,
    password,
  });

  return response.data;
};

export const saveAuthSession = ({ token, refreshToken, user, remember = false }) => {
  const storage = remember ? localStorage : sessionStorage;
  storage.setItem("iot_auth", "true");

  if (token) {
    storage.setItem("iot_token", token);
  }

  if (refreshToken) storage.setItem("iot_refresh_token", refreshToken);

  if (user) {
    storage.setItem("iot_user", JSON.stringify(user));
  }

  localStorage.setItem("iot_auth_event", JSON.stringify({ type: "login", at: Date.now() }));
};

export const clearAuthSession = () => {
  sessionStorage.removeItem("iot_auth");
  sessionStorage.removeItem("iot_token");
  sessionStorage.removeItem("iot_user");
  sessionStorage.removeItem("iot_refresh_token");
  ["iot_auth", "iot_token", "iot_user", "iot_refresh_token", "isAuthenticated"].forEach((key) => localStorage.removeItem(key));
  localStorage.setItem("iot_auth_event", JSON.stringify({ type: "logout", at: Date.now() }));
};

export const logoutUser = async () => {
  const refreshToken = sessionStorage.getItem("iot_refresh_token") || localStorage.getItem("iot_refresh_token");
  if (refreshToken) await authClient.post("/logout", { refreshToken });
};
