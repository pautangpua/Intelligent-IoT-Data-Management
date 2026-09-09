import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated =
    localStorage.getItem("isAuthenticated") === "true" ||
    sessionStorage.getItem("iot_auth") === "true";

  const navigate = useNavigate();
  useEffect(() => {
    const syncLogout = (event) => {
      if (event.key !== "iot_auth_event") return;
      try {
        if (JSON.parse(event.newValue)?.type === "logout") navigate("/", { replace: true });
      } catch { /* Ignore malformed storage events. */ }
    };
    window.addEventListener("storage", syncLogout);
    return () => window.removeEventListener("storage", syncLogout);
  }, [navigate]);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
