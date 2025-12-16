import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/api/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json?.error || "Login failed. Please check your details and try again.");
        return;
      }

      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });
    } catch (err) {
      console.error("Error during login is:", err);
      setError(
        "Unable to reach the server. Please ensure the backend is running and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};

