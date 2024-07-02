import { useState } from "react";
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('https://wisher-1.onrender.com/api/user/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const json = await response.json();
      console.log('Signup response:', json); // Log response

      if (!response.ok) {
        setError(json.error || 'Signup failed. Please try again.');
      } else {
        // Save the user to local storage
        localStorage.setItem('user', JSON.stringify(json));

        // Update the auth context
        dispatch({ type: 'LOGIN', payload: json });
      }
    } catch (error) {
      console.error('Signup error:', error); // Log error
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return { signup, isLoading, error };
};
