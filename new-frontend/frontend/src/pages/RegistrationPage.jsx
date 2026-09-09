import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./RegistrationPage.css";
import { registerUser } from "../services/authClient";

const RegistrationPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setSubmitting(true);
    try {
      await registerUser({ username: formData.email, password: formData.password });
      navigate("/", { state: { message: "Account created. You can now sign in." } });
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Registration failed. This username may already exist.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="auth-badge">Intelligent IoT Platform</div>

        <h1 className="auth-title">Create Account</h1>

        <p className="auth-subtitle">
          Sign up to access the IoT sensor dashboard and analytics platform.
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className="auth-input"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="auth-input"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="auth-input"
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="auth-input"
          />

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" className="auth-primary-btn" disabled={submitting}>
            {submitting ? "Creating account…" : "Sign Up"}
          </button>
        </form>

        <div className="auth-divider">
          <span></span>
          <p>Or continue with</p>
          <span></span>
        </div>

        <div className="auth-social-grid" title="Social authentication is awaiting AFI-14/AFI-16 approval">
          <button type="button" disabled>Google</button>
          <button type="button" disabled>Microsoft</button>
          <button type="button" disabled>Apple</button>
        </div>

        <p className="auth-footer-text">
          Already have an account?{" "}
          <Link to="/" className="auth-footer-link">
            Login
          </Link>
        </p>

        <Link to="/forgot-password" className="auth-link">
          Forgot password?
        </Link>
      </section>
    </main>
  );
};

export default RegistrationPage;
