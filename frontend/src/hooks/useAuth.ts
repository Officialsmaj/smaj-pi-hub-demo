import { AxiosError } from "axios";
import { useCallback, useState, useEffect } from "react";
import { axiosClient } from "../lib/axiosClient";
import type { AuthResult, PaymentDTO, User } from "../types/pi";

type AuthFeedback = {
  type: "success" | "error";
  message: string;
};

type BackendErrorBody = {
  error?: string;
  message?: string;
};

const toErrorMessage = (err: unknown) => {
  const axiosErr = err as AxiosError<BackendErrorBody>;

  if (!axiosErr.response) {
    return "Cannot reach backend. Check BACKEND_URL, HTTPS, and CORS settings.";
  }

  const status = axiosErr.response.status;
  const backendMessage = axiosErr.response.data?.message;

  if (status === 401) {
    return "Pi token verification failed (401). If you are in Sandbox, set backend PLATFORM_API_URL to sandbox and verify PI_API_KEY.";
  }

  if (backendMessage) {
    return `Login failed: ${backendMessage}`;
  }

  return `Login failed with status ${status}.`;
};

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [showSignIn, setShowSignIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authFeedback, setAuthFeedback] = useState<AuthFeedback | null>(null);

  useEffect(() => {
    if (authFeedback) {
      const timer = setTimeout(() => setAuthFeedback(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [authFeedback]);

  const onIncompletePaymentFound = useCallback(async (payment: PaymentDTO) => {
    try {
      await axiosClient.post("/payments/incomplete", { payment });
    } catch (err) {
      console.error("Error handling incomplete payment:", err);
    }
  }, []);

  const signInUser = useCallback(async (authResult: AuthResult) => {
    try {
      await axiosClient.post("/user/signin", { authResult });
      setUser(authResult.user);
      setShowSignIn(false);
      setAuthFeedback({ type: "success", message: `Signed in as ${authResult.user.username}.` });
    } catch (err) {
      console.error("Error signing in:", err);
      setAuthFeedback({ type: "error", message: toErrorMessage(err) });
    }
  }, []);

  const signIn = useCallback(async () => {
    setIsLoading(true);
    setAuthFeedback(null);

    if (!window.Pi) {
      setAuthFeedback({ type: "error", message: "Pi SDK not found. Open this app in Pi Browser." });
      setIsLoading(false);
      return;
    }

    try {
      const scopes = ["username", "payments", "roles", "in_app_notifications"];
      const authResult = await window.Pi.authenticate(scopes, onIncompletePaymentFound);
      await signInUser(authResult);
    } catch (err) {
      console.error("Error authenticating:", err);
      setAuthFeedback({ type: "error", message: "Authentication was cancelled or failed in Pi Browser." });
    } finally {
      setIsLoading(false);
    }
  }, [onIncompletePaymentFound, signInUser]);

  const signOut = useCallback(async () => {
    setIsLoading(true);
    try {
      await axiosClient.get("/user/signout");
      setUser(null);
      setAuthFeedback({ type: "success", message: "Signed out successfully." });
    } catch (err) {
      console.error("Error signing out:", err);
      setAuthFeedback({ type: "error", message: "Sign out failed. Please try again." });
    } finally {
      setIsLoading(false);
    }
  }, []);

  const closeSignIn = useCallback(() => {
    setShowSignIn(false);
  }, []);

  return {
    user,
    isAuthenticated: Boolean(user),
    showSignIn,
    signIn,
    signOut,
    closeSignIn,
    requireAuth: () => setShowSignIn(true),
    isLoading,
    authFeedback,
  };
};
