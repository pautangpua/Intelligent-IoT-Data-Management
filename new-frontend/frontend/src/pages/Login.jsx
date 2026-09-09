import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { loginUser, saveAuthSession } from "../services/authClient";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage("");
    try {
      const result = await loginUser({ username, password });
      saveAuthSession({ token: result.accessToken, refreshToken: result.refreshToken, user: result.user, remember });
      navigate("/home");
    } catch (error) {
      setMessage(error.response?.data?.message || "Unable to sign in. Check your username and password.");
      setMessageType("error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="login-page">
      <section className="login-card">
        <div className="login-logo">
          <span>IoT</span>
        </div>

          <>
            <h1>Welcome Back</h1>

            <p className="login-subtitle">
              Sign in to continue to Intelligent IoT Data Management.
            </p>

            {message && (
              <p
                className={`form-alert ${
                  messageType === "success" ? "success-alert" : "error-alert"
                }`}
              >
                {message}
              </p>
            )}

            <form className="login-form" onSubmit={handleLoginSubmit}>
              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Password</label>

                <div className="password-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <div className="login-options">
                <label className="remember-me">
                  <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
                  Remember me
                </label>

                <Link to="/forgot-password" className="forgot-link">
                  Forgot password?
                </Link>
              </div>

              <button type="submit" className="login-button" disabled={submitting}>
                {submitting ? "Signing in…" : "Login"}
              </button>
            </form>

            <p className="signup-text">
              Don&apos;t have an account? <Link to="/register">Sign up</Link>
            </p>
            <p className="login-subtitle">MFA will be enabled after the AFI-14/AFI-16 backend contract is approved.</p>
          </>
      </section>
    </main>
  );
}

export default Login;
