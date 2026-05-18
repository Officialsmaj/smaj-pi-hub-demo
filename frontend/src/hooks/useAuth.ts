import { AxiosError } from "axios";
import { useCallback, useState, useEffect } from "react";
import { axiosClient } from "../lib/axiosClient";
import type { AuthResult, User } from "../types/pi";

type AuthFeedback = {
  type: "success" | "error";
  message: string;
};

type BackendErrorBody = {
  error?: string;
  message?: string;
};

type SignInResponse = {
  user?: Partial<User> | null;
};

const PI_AUTH_TIMEOUT_MS = 30000;

const authenticateWithTimeout = (scopes: string[]) =>
  Promise.race<AuthResult>([
    window.Pi.authenticate(scopes),
    new Promise<AuthResult>((_, reject) => {
      setTimeout(() => reject(new Error("PI_AUTH_TIMEOUT")), PI_AUTH_TIMEOUT_MS);
    }),
  ]);

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

const toUser = (candidate: Partial<User> | null | undefined, fallback: User): User => ({
  uid: candidate?.uid || fallback.uid,
  username: candidate?.username || fallback.username,
  roles: Array.isArray(candidate?.roles) ? candidate.roles : fallback.roles,
});

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [showSignIn, setShowSignIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [authFeedback, setAuthFeedback] = useState<AuthFeedback | null>(null);

  useEffect(() => {
    if (authFeedback) {
      const timer = setTimeout(() => setAuthFeedback(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [authFeedback]);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axiosClient.get<{ user?: Partial<User> | null }>("/user");
        if (response.data?.user?.uid && response.data.user.username) {
          setUser({
            uid: response.data.user.uid,
            username: response.data.user.username,
            roles: Array.isArray(response.data.user.roles) ? response.data.user.roles : [],
          });
        }
      } catch (err) {
        console.log("No active session found or error checking session:", err);
      } finally {
        setIsLoading(false);
      }
    };
    checkSession();
  }, []);

  const signInUser = useCallback(async (authResult: AuthResult) => {
    const response = await axiosClient.post<SignInResponse>("/signin", { authResult });
    const signedInUser = toUser(response.data?.user, authResult.user);

    setUser(signedInUser);
    setShowSignIn(false);
    setAuthFeedback({ type: "success", message: `Signed in as ${signedInUser.username}.` });
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
      const scopes = ["username"];
      const authResult = await authenticateWithTimeout(scopes);
      await signInUser(authResult);
    } catch (err) {
      console.error("Sign-in process failed:", err);
      if ((err as AxiosError).response) {
        setAuthFeedback({ type: "error", message: toErrorMessage(err) });
      } else if ((err as Error)?.message === "PI_AUTH_TIMEOUT") {
        setAuthFeedback({
          type: "error",
          message: "Pi login timed out. Please close Pi Browser, reopen it, and try Login with Pi again.",
        });
      } else {
        setAuthFeedback({ type: "error", message: "Authentication was cancelled or failed in Pi Browser." });
      }
    } finally {
      setIsLoading(false);
    }
  }, [signInUser]);

  const signOut = useCallback(async () => {
    setIsLoading(true);
    try {
      await axiosClient.post("/user/signout");
      setUser(null);
      setAuthFeedback({ type: "success", message: "Signed out successfully." });
    } catch (err) {
      console.error("Sign-out failed:", err);
      setAuthFeedback({ type: "error", message: "Failed to sign out." });
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
