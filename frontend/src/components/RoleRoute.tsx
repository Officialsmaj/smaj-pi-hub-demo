import type { ReactNode } from "react";
import { useAuthContext } from "../contexts/AuthContext";

type RoleRouteProps = {
  allowedRoles: string[];
  children: ReactNode;
  title: string;
};

const RoleRoute = ({ allowedRoles, children, title }: RoleRouteProps) => {
  const { user } = useAuthContext();
  const roles = user?.roles ?? [];
  const hasAccess = allowedRoles.some((role) => roles.includes(role));

  if (hasAccess) {
    return <>{children}</>;
  }

  return (
    <main className="private-page">
      <section className="private-card">
        <h1>{title}</h1>
        <p>
          This workspace is role-restricted. Complete verification in the Verification Center to unlock access for your
          account role.
        </p>
      </section>
    </main>
  );
};

export default RoleRoute;
