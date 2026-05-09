import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useEffect } from "react";
import { useAuthContext } from "../contexts/AuthContext";

type ProtectedRouteProps = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading, requireAuth } = useAuthContext();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      requireAuth();
    }
  }, [isAuthenticated, isLoading, requireAuth]);

  if (isLoading) {
    return (
      <main className="home-page">
        <section className="home-section">
          <h1>Checking secure session...</h1>
          <p>Validating your Pi wallet authentication.</p>
        </section>
      </main>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
