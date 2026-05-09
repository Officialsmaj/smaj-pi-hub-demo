import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuthContext } from "../contexts/AuthContext";
import { privateHeaderLinks, privatePages } from "../content/privatePages";
import logoImage from "/logo.png";

type PrivateLayoutProps = {
  children: ReactNode;
};

const PrivateLayout = ({ children }: PrivateLayoutProps) => {
  const { signOut, isLoading, user } = useAuthContext();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const roles = user?.roles ?? [];

  const coreLinks = useMemo(() => privatePages.filter((page) => page.section === "core"), []);
  const workspaceLinks = useMemo(
    () =>
      privatePages.filter((page) => {
        if (page.section !== "workspace") {
          return false;
        }
        if (!page.roles) {
          return true;
        }
        return page.roles.some((role) => roles.includes(role));
      }),
    [roles],
  );

  return (
    <div className="private-shell">
      <header className="private-header">
        <div className="private-header-inner">
          <Link to="/app/dashboard" className="private-logo-link" aria-label="SMAJ PI HUB Dashboard">
            <img src={logoImage} alt="SMAJ PI HUB Logo" className="private-logo" />
          </Link>
          <button
            type="button"
            className="private-menu-toggle"
            aria-label="Toggle private navigation"
            onClick={() => setSidebarOpen((open) => !open)}
          >
            {sidebarOpen ? <CloseIcon fontSize="small" /> : <MenuIcon fontSize="small" />}
          </button>
          <nav className="private-header-nav" aria-label="Private header">
            {privateHeaderLinks.map((item) => (
              <NavLink key={item.to} to={item.to}>
                {item.label}
              </NavLink>
            ))}
            <button type="button" className="private-logout" onClick={signOut} disabled={isLoading}>
              <LogoutIcon fontSize="small" />
              Logout
            </button>
          </nav>
        </div>
      </header>

      <div className="private-body">
        <aside className={`private-sidebar ${sidebarOpen ? "private-sidebar-open" : ""}`}>
          <div className="private-sidebar-block">
            <h3>Core Pages</h3>
            {coreLinks.map((page) => (
              <NavLink key={page.path} to={`/app/${page.path}`} onClick={() => setSidebarOpen(false)}>
                {page.title}
              </NavLink>
            ))}
          </div>
          <div className="private-sidebar-block">
            <h3>Role Workspaces</h3>
            {workspaceLinks.length ? (
              workspaceLinks.map((page) => (
                <NavLink key={page.path} to={`/app/${page.path}`} onClick={() => setSidebarOpen(false)}>
                  {page.title}
                </NavLink>
              ))
            ) : (
              <p className="private-side-note">No role workspace active yet.</p>
            )}
          </div>
        </aside>

        {sidebarOpen ? <button type="button" className="private-overlay" onClick={() => setSidebarOpen(false)} /> : null}
        <div className="private-content">{children}</div>
      </div>

      <footer className="private-footer">
        <p>One login, one wallet, all services. Pi wallet authentication with verified identity.</p>
      </footer>
    </div>
  );
};

export default PrivateLayout;
