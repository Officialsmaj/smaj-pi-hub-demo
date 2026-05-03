import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import logoImage from "/logo.png";

const navItems = [
  { to: "/home", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/white-paper", label: "White Paper" },
  { to: "/how-it-works", label: "How It Works" },
  { to: "/pricing", label: "Pricing" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
];

const Header = () => {
  const { user, isAuthenticated, signIn, signOut, isLoading } = useAuthContext();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isMobileMenuOpen]);

  return (
    <header className="smaj-header">
      <div className="smaj-header-inner">
        <NavLink to="/home" className="smaj-logo-link" aria-label="SMAJ PI HUB Home">
          <img src={logoImage} alt="SMAJ PI HUB Logo" className="smaj-logo" />
        </NavLink>
        <button
          type="button"
          className="smaj-menu-toggle"
          aria-label="Toggle navigation menu"
          aria-expanded={isMobileMenuOpen}
          onClick={() => setIsMobileMenuOpen((open) => !open)}
        >
          {isMobileMenuOpen ? "Close" : "Menu"}
        </button>
        <nav className={`smaj-nav ${isMobileMenuOpen ? "smaj-nav-open" : ""}`} aria-label="Primary">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        {isMobileMenuOpen ? (
          <button
            type="button"
            aria-label="Close navigation menu"
            className="smaj-nav-overlay"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        ) : null}
        <div className="smaj-auth-section">
          {isAuthenticated && user ? (
            <div className="smaj-user-info">
              <span className="smaj-username">{user.username}</span>
              <button onClick={signOut} className="smaj-signout-btn" disabled={isLoading}>
                Sign Out
              </button>
            </div>
          ) : (
            <button onClick={signIn} className="smaj-login-btn" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Login with Pi"}
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
