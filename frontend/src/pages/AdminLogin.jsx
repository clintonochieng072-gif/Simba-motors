import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../utils/api";
import { Button } from "../components/ui/Button";
import { useToast } from "../contexts/ToastContext";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      navigate("/admin/dashboard");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await login(credentials);
      localStorage.setItem("adminToken", response.data.token);
      showSuccess("Login successful! Redirecting to dashboard...");
      // Redirect to admin dashboard
      setTimeout(() => navigate("/admin/dashboard"), 1000);
    } catch (err) {
      setError("Invalid credentials");
      showError("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Admin Login
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email"
                value={credentials.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={credentials.password}
                onChange={handleChange}
              />
            </div>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div>
            <Button
              type="submit"
              loading={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
